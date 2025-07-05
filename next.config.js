/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lovable.dev"],
  },
  i18n: {
    locales: [
      "en",
      "es",
      "fr",
      "de",
      "it",
      "pt",
      "zh",
      "ja",
      "ko",
      "ar",
      "hi",
      "ru",
      "th",
      "vi",
      "tr",
    ],
    defaultLocale: "en",
    localeDetection: false,
  },
  // Enable static exports if needed
  // output: 'export',
  // trailingSlash: true,
};

module.exports = nextConfig;
