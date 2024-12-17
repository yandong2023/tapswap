import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa', 'ru', 'ko', 'zh'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'cookie', 'navigator'],
      caches: ['cookie'],
    },
  })

export default i18n
