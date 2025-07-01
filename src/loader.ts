import type { Loader, LoaderContext } from 'astro/loaders';
import { z } from 'astro:content';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';

// Metadata extraction
function extractMetadata(lines: string[], fileName: string): { [key: string]: string } {
  let startMetadataIndex = 0;
  let endMetadataIndex = 0;

  const startTag = '<!--M';
  const endTag = 'M-->'

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
  metadataLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
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
    console.warn('Metadata does not contain an Id - file: ' + fileName);
  }

  return metadata;
}

export function blogLoader(): Loader {

  const files = glob('./content/blog/**/*.md');

  return {
    name: "blogLoader",
    async load({ renderMarkdown, store }) {
      const response = await files;

      store.clear();

      response.forEach(async (filePath) => {
        const content = await readFile(filePath, 'utf-8');
        const lines = content.split('\n');

        console.log(`Processing file: ${filePath}`);

        const fileName = filePath.split('/').pop();

        if (fileName === undefined)
        {
          console.log(`File name could not be determined for path: ${filePath}`);
          return;
        }

        const firstLine = lines[0];
        if (!firstLine.startsWith('#'))
        {
          console.warn(`First line of the file does not start with a title: ${fileName}`);
          return;
        }

        const title = firstLine.substring(1).trim();

        const metadata = extractMetadata(lines, fileName);
        const id = metadata.Id;
        const tags = metadata.Tags ? metadata.Tags.split(',').map(tag => tag.trim()) : [];
        const createdDate = metadata.CreatedDate ? new Date(metadata.CreatedDate) : undefined;
        const lastModifiedDate = metadata.LastModifiedDate ? new Date(metadata.LastModifiedDate) : undefined;
        const state = metadata.State || 'draft';
        const order = metadata.Order ? parseInt(metadata.Order, 10) : undefined;

        if (state !== 'published') {
          console.log(`Skipping unpublished post: ${fileName}`);
          return;
        }
        
        store.set({
          id: id,
          data: {
            id: id,
            author: 'Alex Rumak',
            slug: id,
            title: title,
            createdDate: createdDate,
            lastModifiedDate: lastModifiedDate,
            tags: tags,
            content: content,
            order: order,
          },
          rendered: await renderMarkdown(content),
        });
      });
    },
    schema: async () => z.object({
      id: z.string(),
      author: z.string(),
      slug: z.string(),
      title: z.string(),
      tags: z.array(z.string()).optional(),
      createdDate: z.date().optional(),
      lastModifiedDate: z.date().optional(),
      order: z.number(),
    })
  };
}