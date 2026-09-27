import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://venturiane.com",
  output: "static",
  trailingSlash: "always",
  i18n: {
    locales: ["nl", "en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
