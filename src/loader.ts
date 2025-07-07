import type { DataStore, Loader } from "astro/loaders";
import type { RenderedContent } from "astro:content";
import { z } from "astro:content";
import { glob } from "glob";
import { readFile } from "node:fs/promises";

// Metadata extraction
function extractMetadata(lines: string[], fileName: string): { [key: string]: string } {
  let startMetadataIndex = 0;
  let endMetadataIndex = 0;

  const startTag = "<!--M";
  const endTag = "M-->";

  // Find start of metadata
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(startTag)) {
      startMetadataIndex = i;
      break;
    }
  }

  // Find end of metadata
  for (let i = startMetadataIndex; i < lines.length; i++) {
    if (lines[i].startsWith(endTag)) {
      endMetadataIndex = i;
      break;
    }
  }

  // Get lines between start and end tags
  const metadataLines = lines.slice(startMetadataIndex + 1, endMetadataIndex);

  // Parse each line into key-value pair
  const metadata: { [key: string]: string } = {};
  metadataLines.forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim();
      metadata[key.trim()] = value;
    }
  });

  // Metadata Schema Validation
  // Sample Data:
  // <!--M
  // Id:12-week-challenge-intro
  // Tags: Life, Challenge
  // CreatedDate: 02/23/2025
  // LastModifiedDate: 03/22/2025
  // M-->

  // check for id
  if (!metadata.Id) {
    console.warn("Metadata does not contain an Id - file: " + fileName);
  }

  return metadata;
}

// Return markdown image full paths
function extractImages(lines: string[], basePath: string): string[] {
  const images: string[] = [];

  const startImage = "![";
  const endImage = "](";
  const startImagePath = "](./";
  const endImagePath = ")";

  for (const line of lines) {
    if (
      line.includes(startImage) &&
      line.includes(endImage) &&
      line.includes(startImagePath) &&
      line.includes(endImagePath)
    ) {
      const endIndex = line.indexOf(endImage);
      const pathStartIndex = line.indexOf(startImagePath, endIndex) + startImagePath.length;
      const pathEndIndex = line.indexOf(endImagePath, pathStartIndex);
      const imagePath = line.substring(pathStartIndex, pathEndIndex).trim();

      if (imagePath) {
        images.push(`${imagePath}`);
      }
    }
  }

  return images;
}

function replaceRelativePathsWithAssetPath(contents: string): string {
  return contents.replaceAll("](./", "](/content/blog/"); // Should work in 99.999999% of cases.
}

interface ExtractedContent {
  id?: string;
  tags?: string[];
  title?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  order?: number;
  content?: string;
}

async function extractContent(filePath: string): Promise<ExtractedContent> {
  const content = await readFile(filePath, "utf-8");
  const lines = content.split("\n");

  const fileName = filePath.split("/").pop();

  if (fileName === undefined) {
    console.log(`File name could not be determined for path: ${filePath}`);
    return {};
  }

  const firstLine = lines[0];
  if (!firstLine.startsWith("#")) {
    console.warn(`First line of the file does not start with a title: ${fileName}`);
    return {};
  }

  const title = firstLine.substring(1).trim();

  const metadata = extractMetadata(lines, fileName);
  const id = metadata.Id;
  const tags = metadata.Tags ? metadata.Tags.split(",").map((tag) => tag.trim()) : [];
  const createdDate = metadata.CreatedDate ? new Date(metadata.CreatedDate) : undefined;
  const lastModifiedDate = metadata.LastModifiedDate ? new Date(metadata.LastModifiedDate) : undefined;
  const state = metadata.State || "draft";
  const order = metadata.Order ? parseInt(metadata.Order, 10) : undefined;

  if (state !== "published") {
    console.log(`Skipping unpublished post: ${fileName}`);
    return { id: id };
  }

  // remove top-level header from content - kind of hacky
  let replacedContent = content.replace(/^[#].*[\n\r]/, "");
  replacedContent = replaceRelativePathsWithAssetPath(replacedContent);

  return {
    id: id,
    tags: tags,
    title: title,
    createdDate: createdDate,
    lastModifiedDate: lastModifiedDate,
    order: order,
    content: replacedContent,
  };
}

async function syncData(
  store: DataStore,
  files: Promise<string[]>,
  renderMarkdown: (content: string) => Promise<RenderedContent>
) {
  const response = await files;

  store.clear();

  const results = await Promise.all(response.map(async (filePath) => {
    const { id, tags, title, createdDate, lastModifiedDate, order, content } = await extractContent(filePath);

    if (id === undefined || content === undefined) {
      return {
        id: id,
        status: "skipped"
      };
    }

    const rendered = await renderMarkdown(content);

    store.set({
      id: id,
      data: {
        id: id,
        author: "Alex Rumak",
        slug: id,
        title: title,
        createdDate: createdDate,
        lastModifiedDate: lastModifiedDate,
        tags: tags,
        content: content,
        order: order,
      },
      rendered: rendered,
    });

    return {
      id: id,
      status: "synced"
    }
  }));
}

async function resynceData(
  store: DataStore,
  file: string,
  renderMarkdown: (content: string) => Promise<RenderedContent>
) {
  const { id, tags, title, createdDate, lastModifiedDate, order, content } = await extractContent(file);

  if (id === undefined) {
    return;
  }

  if (content === undefined) {
    console.log(`removing post with id: ${id} - content is undefined`);
    store.delete(id);
    return;
  }

  let contentToRender = content || "";

  const rendered = await renderMarkdown(contentToRender);

  store.set({
    id: id,
    data: {
      id: id,
      author: "Alex Rumak",
      slug: id,
      title: title,
      createdDate: createdDate,
      lastModifiedDate: lastModifiedDate,
      tags: tags,
      content: content,
      order: order,
    },
    rendered: rendered,
  });
}

export function blogLoader(): Loader {
  const files = glob("content/blog/**/*.md");

  return {
    name: "blogLoader",
    async load({ renderMarkdown, store, watcher }) {
      await syncData(store, files, renderMarkdown);

      watcher?.on("change", async (changedPath) => {
        if (!changedPath.endsWith(".md")) {
          console.warn(`File changed is not a markdown file: ${changedPath}`);
          return;
        }

        console.log(`File changed: ${changedPath}`);
        await resynceData(store, changedPath, renderMarkdown);
      });
    },
    schema: async () =>
      z.object({
        id: z.string(),
        author: z.string(),
        slug: z.string(),
        title: z.string(),
        tags: z.array(z.string()).optional(),
        createdDate: z.date().optional(),
        lastModifiedDate: z.date().optional(),
        order: z.number(),
      }),
  };
}
