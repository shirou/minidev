import { enTranslations } from './en'
import { jaTranslations } from './ja'
import { idTranslations } from './id'
import { zhTWTranslations } from './zh-TW'
import { zhCNTranslations } from './zh-CN'

// Convert to i18next resource format
export const i18nResources = {
  en: {
    translation: enTranslations
  },
  ja: {
    translation: jaTranslations
  },
  id: {
    translation: idTranslations
  },
  'zh-TW': {
    translation: zhTWTranslations
  },
  'zh-CN': {
    translation: zhCNTranslations
  }
}