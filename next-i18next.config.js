/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa', 'ru', 'ko', 'zh'],
    localeDetection: false
  },
  defaultNS: 'common',
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  fallbackLng: {
    default: ['en'],
    fa: ['en'],
    ru: ['en'],
    ko: ['en'],
    zh: ['en']
  }
}