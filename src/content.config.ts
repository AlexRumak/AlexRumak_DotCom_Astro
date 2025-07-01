import { defineCollection, z } from "astro:content";
import { blogLoader } from "./loader.ts";

const blog = defineCollection({
  loader: blogLoader(),
});

export const collections = { blog };