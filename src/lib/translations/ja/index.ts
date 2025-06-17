import { commonJa } from './common'
import { randomStringJa } from './tools/randomString'
import { jsonYamlJa } from './tools/jsonYaml'
import { unixTimeJa } from './tools/unixTime'
import { xmlFormatterJa } from './tools/xmlFormatter'
import { sqlFormatterJa } from './tools/sqlFormatter'
import { base64Ja } from './tools/base64'
import { uuidJa } from './tools/uuid'
import { jsonFormatterJa } from './tools/jsonFormatter'
import { chmodCalculatorJa } from './tools/chmodCalculator'
import { urlEncoder } from './tools/urlEncoder'
import { urlDecoder } from './tools/urlDecoder'
import { htmlJa } from './tools/html'
import { caseJa } from './tools/case'
import { numberBaseJa } from './tools/numberBase'
import { temperatureJa } from './tools/temperature'
import { dataSizeJa } from './tools/dataSize'
import { loremJa } from './tools/lorem'
import { wordCounterJa } from './tools/wordCounter'
import { stringUtilsJa } from './tools/stringUtils'
import { qrcodeJa } from './tools/qrcode'
import { colorConverterJa } from './tools/colorConverter'

// Deep merge function for Japanese translations
function mergeJa(...translations: Record<string, any>[]): Record<string, any> {
  const result: Record<string, any> = {}
  
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
  base64Ja,
  uuidJa,
  jsonFormatterJa,
  chmodCalculatorJa,
  { tools: { urlEncoder } },
  { tools: { urlDecoder } },
  htmlJa,
  caseJa,
  numberBaseJa,
  temperatureJa,
  dataSizeJa,
  loremJa,
  wordCounterJa,
  stringUtilsJa,
  qrcodeJa,
  colorConverterJa
)