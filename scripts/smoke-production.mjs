const origin = process.env.PRODUCTION_ORIGIN ?? "https://venturiane.com";
const checks = [
  {
    path: "/en/",
    contains: ["<title>venturian ecom</title>", "hello@venturiane.com"],
  },
  {
    path: "/nl/",
    contains: ["<title>venturian ecom</title>", "hello@venturiane.com"],
  },
  {
    path: "/en/blog/why-this-website-stays-simple/",
    contains: ["Why this website stays simple", "Tim Twiest"],
  },
  {
    path: "/nl/blog/waarom-deze-website-simpel-blijft/",
    contains: ["Waarom deze website simpel blijft", "Tim Twiest"],
  },
  {
    path: "/en/company-details/",
    contains: ["Company details", "98192531", "NL005314869B56"],
  },
  {
    path: "/nl/company-details/",
    contains: ["Bedrijfsgegevens", "98192531", "NL005314869B56"],
  },
  { path: "/favicon.svg", contains: [">ve</text>"] },
  { path: "/favicon-32x32.png" },
  { path: "/apple-touch-icon.png" },
  { path: "/social-preview.png" },
  { path: "/robots.txt", contains: ["https://venturiane.com/sitemap.xml"] },
  {
    path: "/sitemap.xml",
    contains: ["https://venturiane.com/en/", "https://venturiane.com/nl/"],
  },
];

const wait = (milliseconds) =>
  new Promise((resolveWait) => setTimeout(resolveWait, milliseconds));

for (const check of checks) {
  let lastError;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const separator = check.path.includes("?") ? "&" : "?";
      const response = await fetch(
        `${origin}${check.path}${separator}smoke=${Date.now()}`,
        { redirect: "follow" },
      );
      const body = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      for (const expected of check.contains ?? []) {
        if (!body.includes(expected)) {
          throw new Error(`missing expected content: ${expected}`);
        }
      }

      console.log(`ok ${check.path} (${response.status})`);
      lastError = undefined;
      break;
    } catch (error) {
      lastError = error;
      if (attempt < 6) {
        await wait(attempt * 2_000);
      }
    }
  }

  if (lastError) {
    throw new Error(`Production smoke check failed for ${check.path}`, {
      cause: lastError,
    });
  }
}
