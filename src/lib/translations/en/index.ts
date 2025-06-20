import { commonEn } from './common'
import { randomStringEn } from './tools/randomString'
import { jsonYamlEn } from './tools/jsonYaml'
import { unixTimeEn } from './tools/unixTime'
import { xmlFormatterEn } from './tools/xmlFormatter'
import { sqlFormatterEn } from './tools/sqlFormatter'
import { base64En } from './tools/base64'
import { uuidEn } from './tools/uuid'
import { jsonFormatterEn } from './tools/jsonFormatter'
import { chmodCalculatorEn } from './tools/chmodCalculator'
import { urlEncoder } from './tools/urlEncoder'
import { urlDecoder } from './tools/urlDecoder'
import { htmlEn } from './tools/html'
import { caseEn } from './tools/case'
import { numberBaseEn } from './tools/numberBase'
import { temperatureEn } from './tools/temperature'
import { dataSizeEn } from './tools/dataSize'
import { loremEn } from './tools/lorem'
import { wordCounterEn } from './tools/wordCounter'
import { stringUtilsEn } from './tools/stringUtils'
import { qrcodeEn } from './tools/qrcode'
import { colorConverterEn } from './tools/colorConverter'

// Deep merge function for English translations
function mergeEn(...translations: Record<string, any>[]): Record<string, any> {
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

// Combine all English translations
export const enTranslations = mergeEn(
  commonEn,
  randomStringEn,
  jsonYamlEn,
  unixTimeEn,
  xmlFormatterEn,
  sqlFormatterEn,
  base64En,
  uuidEn,
  jsonFormatterEn,
  chmodCalculatorEn,
  { tools: { urlEncoder } },
  { tools: { urlDecoder } },
  htmlEn,
  caseEn,
  numberBaseEn,
  temperatureEn,
  dataSizeEn,
  loremEn,
  wordCounterEn,
  stringUtilsEn,
  qrcodeEn,
  colorConverterEn
)