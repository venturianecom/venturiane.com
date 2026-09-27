import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { supportedLanguages } from "./i18n/config";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z
    .object({
      language: z.enum(supportedLanguages),
      translationKey: z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      title: z.string().trim().min(1),
      description: z.string().trim().min(1).max(160),
      author: z.object({
        name: z.string().trim().min(1),
        url: z.url(),
      }),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string().trim().min(1)).default([]),
      draft: z.boolean().default(false),
    })
    .superRefine(({ pubDate, updatedDate }, context) => {
      if (updatedDate && updatedDate < pubDate) {
        context.addIssue({
          code: "custom",
          message: "updatedDate cannot be earlier than pubDate",
          path: ["updatedDate"],
        });
      }
    }),
});

export const collections = { blog };
