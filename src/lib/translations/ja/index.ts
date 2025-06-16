import { commonJa } from './common'
import { randomStringJa } from './tools/randomString'
import { jsonYamlJa } from './tools/jsonYaml'
import { unixTimeJa } from './tools/unixTime'
import { xmlFormatterJa } from './tools/xmlFormatter'
import { sqlFormatterJa } from './tools/sqlFormatter'
import { base64Ja } from './tools/base64'

// Deep merge function for Japanese translations
function mergeJa(...translations: any[]): any {
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

// Combine all Japanese translations
export const jaTranslations = mergeJa(
  commonJa,
  randomStringJa,
  jsonYamlJa,
  unixTimeJa,
  xmlFormatterJa,
  sqlFormatterJa,
  base64Ja
)