import { commonEn } from './common'
import { randomStringEn } from './tools/randomString'
import { jsonYamlEn } from './tools/jsonYaml'
import { unixTimeEn } from './tools/unixTime'
import { xmlFormatterEn } from './tools/xmlFormatter'
import { sqlFormatterEn } from './tools/sqlFormatter'
import { base64En } from './tools/base64'

// Deep merge function for English translations
function mergeEn(...translations: any[]): any {
  const result: any = {}
  
  for (const translation of translations) {
    for (const key in translation) {
      if (translation[key] && typeof translation[key] === 'object' && !Array.isArray(translation[key])) {
        result[key] = { ...(result[key] || {}), ...translation[key] }
      } else {
        result[key] = translation[key]
      }
    }
  }
  
  return result
}

// Combine all English translations
export const enTranslations = mergeEn(
  commonEn,
  randomStringEn,
  jsonYamlEn,
  unixTimeEn,
  xmlFormatterEn,
  sqlFormatterEn,
  base64En
)