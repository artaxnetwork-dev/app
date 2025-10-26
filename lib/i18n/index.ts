import { en } from '@/lib/i18n/en'
import { fr } from '@/lib/i18n/fr'
import { es } from '@/lib/i18n/es'
import { uk } from '@/lib/i18n/uk'
import { ru } from '@/lib/i18n/ru'

export type Locale = 'en' | 'fr' | 'es' | 'uk' | 'ru'

export const translations = {
  en,
  fr,
  es,
  uk,
  ru,
}

export const defaultLocale: Locale = 'en'

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale]
}

export function setDocumentLanguage(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}
