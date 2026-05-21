import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ["tr", "en", "ar", "es", "fr", "zh", "de"],
  defaultLocale: "tr",
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // favicon.ico ve statik dosyaları hariç tut
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|js|css|woff|woff2|ttf|eot)$).*)'
  ]
};
