import { NextRequest, NextResponse } from "next/server";

// List of supported locales
const locales = [
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
];
const defaultLocale = "en";

// Get the preferred locale from the Accept-Language header
function getLocale(request: NextRequest): string {
  // Check if there's a locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return pathname.split("/")[1];
  }

  // Check for locale in cookie
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim())
      .find((lang) => {
        const langCode = lang.split("-")[0];
        return locales.includes(langCode);
      });

    if (preferredLocale) {
      const langCode = preferredLocale.split("-")[0];
      return langCode;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // For default locale (English), don't add prefix
    if (locale === defaultLocale) {
      return NextResponse.next();
    }

    // For other locales, redirect to include the locale prefix
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Set locale cookie
    response.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });

    return response;
  }

  // If pathname has locale, extract it and set cookie
  const currentLocale = pathname.split("/")[1];
  if (locales.includes(currentLocale)) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", currentLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|static).*)",
  ],
};
