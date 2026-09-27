import { supportedLanguages, type Language } from "../i18n/config";

export interface BlogIdentity {
  id: string;
  data: {
    language: Language;
    translationKey: string;
    slug: string;
  };
}

export function assertBlogIntegrity(posts: readonly BlogIdentity[]) {
  const routes = new Map<string, string>();
  const translations = new Map<string, Map<Language, string>>();

  for (const post of posts) {
    const route = `${post.data.language}/${post.data.slug}`;
    const existingRoute = routes.get(route);

    if (existingRoute) {
      throw new Error(
        `Blog route /${route}/ is used by both ${existingRoute} and ${post.id}.`,
      );
    }

    routes.set(route, post.id);

    const group =
      translations.get(post.data.translationKey) ?? new Map<Language, string>();
    const existingTranslation = group.get(post.data.language);

    if (existingTranslation) {
      throw new Error(
        `Translation ${post.data.translationKey} has multiple ${post.data.language} posts: ${existingTranslation} and ${post.id}.`,
      );
    }

    group.set(post.data.language, post.id);
    translations.set(post.data.translationKey, group);
  }

  for (const [translationKey, group] of translations) {
    const missingLanguages = supportedLanguages.filter(
      (language) => !group.has(language),
    );

    if (missingLanguages.length > 0) {
      throw new Error(
        `Translation ${translationKey} is missing: ${missingLanguages.join(", ")}.`,
      );
    }
  }
}
