import { commonZhCN } from './common'
import { randomStringZhCN } from './tools/randomString'
import { jsonYamlZhCN } from './tools/jsonYaml'
import { unixTimeZhCN } from './tools/unixTime'
import { xmlFormatterZhCN } from './tools/xmlFormatter'
import { sqlFormatterZhCN } from './tools/sqlFormatter'
import { base64ZhCN } from './tools/base64'
import { uuidZhCN } from './tools/uuid'
import { jsonFormatterZhCN } from './tools/jsonFormatter'
import { chmodCalculatorZhCN } from './tools/chmodCalculator'
import { urlEncoder } from './tools/urlEncoder'
import { urlDecoder } from './tools/urlDecoder'
import { htmlZhCN } from './tools/html'
import { caseZhCN } from './tools/case'
import { numberBaseZhCN } from './tools/numberBase'
import { temperatureZhCN } from './tools/temperature'
import { dataSizeZhCN } from './tools/dataSize'
import { loremZhCN } from './tools/lorem'
import { wordCounterZhCN } from './tools/wordCounter'
import { stringUtilsZhCN } from './tools/stringUtils'
import { qrcodeZhCN } from './tools/qrcode'

// Deep merge function for Simplified Chinese translations
function mergeZhCN(...translations: Record<string, any>[]): Record<string, any> {
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

// Combine all Simplified Chinese translations
export const zhCNTranslations = mergeZhCN(
  commonZhCN,
  randomStringZhCN,
  jsonYamlZhCN,
  unixTimeZhCN,
  xmlFormatterZhCN,
  sqlFormatterZhCN,
  base64ZhCN,
  uuidZhCN,
  jsonFormatterZhCN,
  chmodCalculatorZhCN,
  { tools: { urlEncoder } },
  { tools: { urlDecoder } },
  htmlZhCN,
  caseZhCN,
  numberBaseZhCN,
  temperatureZhCN,
  dataSizeZhCN,
  loremZhCN,
  wordCounterZhCN,
  stringUtilsZhCN,
  qrcodeZhCN
)