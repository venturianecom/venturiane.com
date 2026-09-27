import { getCollection } from "astro:content";

import { assertBlogIntegrity } from "./integrity";

export async function getPublishedBlogPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  assertBlogIntegrity(posts);
  return posts;
}
