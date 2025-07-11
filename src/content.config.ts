import { defineCollection } from "astro:content";
import { blogLoader } from "./loader.ts";

const blogPosts = defineCollection({
  loader: blogLoader(),
});

export const collections = { 
  'blogPosts': blogPosts 
};