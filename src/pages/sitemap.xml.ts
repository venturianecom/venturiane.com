import type { APIRoute } from "astro";

import { getPublishedBlogPosts } from "../content/blog";
import {
  defaultLanguage,
  languageRoutes,
  supportedLanguages,
  type Language,
} from "../i18n/config";

export const prerender = true;

const site = new URL("https://venturiane.com");

function absolute(path: string) {
  return new URL(path, site).href;
}

function alternateLinks(paths: Record<Language, string>) {
  return [
    ...supportedLanguages.map(
      (language) =>
        `<xhtml:link rel="alternate" hreflang="${language}" href="${absolute(paths[language])}"/>`,
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(paths[defaultLanguage])}"/>`,
  ].join("");
}

function urlEntry(
  path: string,
  alternatePaths: Record<Language, string>,
  lastModified?: Date,
) {
  const lastmod = lastModified
    ? `<lastmod>${lastModified.toISOString()}</lastmod>`
    : "";
  return `<url><loc>${absolute(path)}</loc>${lastmod}${alternateLinks(alternatePaths)}</url>`;
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedBlogPosts();
  const groupedPosts = new Map<string, typeof posts>();

  for (const post of posts) {
    const translations = groupedPosts.get(post.data.translationKey) ?? [];
    translations.push(post);
    groupedPosts.set(post.data.translationKey, translations);
  }
  const entries = supportedLanguages.map((language) =>
    urlEntry(languageRoutes[language], languageRoutes),
  );
  const companyPaths: Record<Language, string> = {
    nl: "/nl/company-details/",
    en: "/en/company-details/",
  };

  for (const language of supportedLanguages) {
    entries.push(urlEntry(companyPaths[language], companyPaths));
  }

  for (const translations of groupedPosts.values()) {
    const alternatePaths = Object.fromEntries(
      translations.map(({ data }) => [
        data.language,
        `/${data.language}/blog/${data.slug}/`,
      ]),
    ) as Record<Language, string>;

    for (const { data } of translations) {
      entries.push(
        urlEntry(
          alternatePaths[data.language],
          alternatePaths,
          data.updatedDate ?? data.pubDate,
        ),
      );
    }
  }

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
  ].join("");

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
