export const supportedLanguages = ["nl", "en"] as const;

export type Language = (typeof supportedLanguages)[number];

export const defaultLanguage: Language = "en";
export const languageStorageKey = "venturian-language";

export const languageRoutes: Record<Language, string> = {
  nl: "/nl/",
  en: "/en/",
};

export const languageNames: Record<Language, string> = {
  nl: "Nederlands",
  en: "English",
};

interface Translation {
  meta: {
    title: string;
    description: string;
    locale: string;
    alternateLocale: string;
  };
  brandLabel: string;
  navigationLabel: string;
  languageLabel: string;
  articleBackLabel: string;
  about: {
    id: string;
    label: string;
  };
  notes: {
    id: string;
    label: string;
    emptyTitle: string;
    emptyBody: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
  };
  footer: {
    made: string;
    heartLabel: string;
    by: string;
  };
}

export const translations: Record<Language, Translation> = {
  nl: {
    meta: {
      title: "Venturian Ecom | Tech consultancy en e-commerce",
      description:
        "Venturian Ecom combineert tech consultancy met eigen e-commerceprojecten. We bouwen, verbeteren en experimenteren zonder omwegen.",
      locale: "nl_NL",
      alternateLocale: "en_US",
    },
    brandLabel: "Venturian Ecom, naar boven",
    navigationLabel: "Hoofdnavigatie",
    languageLabel: "Taal kiezen",
    articleBackLabel: "Terug naar Venturian Ecom",
    about: {
      id: "over",
      label: "over",
    },
    notes: {
      id: "notities",
      label: "notities",
      emptyTitle: "Hier verschijnen later korte stukken.",
      emptyBody: "Over techniek, e-commerce en wat onderweg wel of niet werkt.",
    },
    hero: {
      eyebrow: "tech consultancy · e-commerce",
      title: "Techniek, handel en het werk ertussen.",
      body: "combineert technische consultancy met eigen e-commerceprojecten. We bouwen, verbeteren en experimenteren. Praktisch en zonder omwegen.",
    },
    footer: {
      made: "Gemaakt met",
      heartLabel: "liefde",
      by: "door",
    },
  },
  en: {
    meta: {
      title: "Venturian Ecom | Tech consulting and e-commerce",
      description:
        "Venturian Ecom combines tech consulting with its own e-commerce projects. We build, improve and experiment with a practical approach.",
      locale: "en_US",
      alternateLocale: "nl_NL",
    },
    brandLabel: "Venturian Ecom, back to top",
    navigationLabel: "Main navigation",
    languageLabel: "Choose language",
    articleBackLabel: "Back to Venturian Ecom",
    about: {
      id: "about",
      label: "about",
    },
    notes: {
      id: "notes",
      label: "notes",
      emptyTitle: "Short pieces will appear here later.",
      emptyBody:
        "About technology, e-commerce and what does or does not work along the way.",
    },
    hero: {
      eyebrow: "tech consultancy · e-commerce",
      title: "Technology, commerce and the work in between.",
      body: "combines technical consultancy with our own e-commerce projects. We build, improve and experiment. Practical and direct.",
    },
    footer: {
      made: "Made with",
      heartLabel: "love",
      by: "by",
    },
  },
};

export function isLanguage(value: string): value is Language {
  return supportedLanguages.includes(value as Language);
}
