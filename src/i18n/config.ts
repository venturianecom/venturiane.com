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
  skipLabel: string;
  navigationLabel: string;
  languageLabel: string;
  articleBackLabel: string;
  articleByLabel: string;
  articleReadingTimeLabel: (minutes: number) => string;
  about: {
    id: string;
    label: string;
  };
  contact: {
    id: string;
    label: string;
    title: string;
    body: string;
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
    companyDetails: string;
  };
  company: {
    title: string;
    description: string;
    eyebrow: string;
    registrationLabel: string;
    vatLabel: string;
    emailLabel: string;
  };
}

export const translations: Record<Language, Translation> = {
  nl: {
    meta: {
      title: "venturian ecom",
      description:
        "Venturian Ecom combineert tech consultancy met eigen e-commerceprojecten. We bouwen, verbeteren en experimenteren zonder omwegen.",
      locale: "nl_NL",
      alternateLocale: "en_US",
    },
    brandLabel: "Venturian Ecom, naar boven",
    skipLabel: "Ga naar de inhoud",
    navigationLabel: "Hoofdnavigatie",
    languageLabel: "Taal kiezen",
    articleBackLabel: "Terug naar Venturian Ecom",
    articleByLabel: "Geschreven door",
    articleReadingTimeLabel: (minutes) => `${minutes} min leestijd`,
    about: {
      id: "over",
      label: "over",
    },
    contact: {
      id: "contact",
      label: "contact",
      title: "Iets bouwen, verbeteren of bespreken?",
      body: "Stuur een mail naar",
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
      companyDetails: "bedrijfsgegevens",
    },
    company: {
      title: "Bedrijfsgegevens",
      description:
        "Bedrijfs- en contactgegevens van Venturian Ecom, waaronder het KVK-nummer en btw-id.",
      eyebrow: "Venturian Ecom",
      registrationLabel: "KVK-nummer",
      vatLabel: "Btw-id",
      emailLabel: "E-mail",
    },
  },
  en: {
    meta: {
      title: "venturian ecom",
      description:
        "Venturian Ecom combines tech consulting with its own e-commerce projects. We build, improve and experiment with a practical approach.",
      locale: "en_US",
      alternateLocale: "nl_NL",
    },
    brandLabel: "Venturian Ecom, back to top",
    skipLabel: "Skip to content",
    navigationLabel: "Main navigation",
    languageLabel: "Choose language",
    articleBackLabel: "Back to Venturian Ecom",
    articleByLabel: "Written by",
    articleReadingTimeLabel: (minutes) => `${minutes} min read`,
    about: {
      id: "about",
      label: "about",
    },
    contact: {
      id: "contact",
      label: "contact",
      title: "Want to build, improve or discuss something?",
      body: "Send an email to",
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
      companyDetails: "company details",
    },
    company: {
      title: "Company details",
      description:
        "Company and contact details for Venturian Ecom, including its Dutch Chamber of Commerce and VAT numbers.",
      eyebrow: "Venturian Ecom",
      registrationLabel: "Dutch Chamber of Commerce",
      vatLabel: "VAT ID",
      emailLabel: "Email",
    },
  },
};

export function isLanguage(value: string): value is Language {
  return supportedLanguages.includes(value as Language);
}
