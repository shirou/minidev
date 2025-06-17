import { commonId } from './common'
import { randomStringId } from './tools/randomString'
import { jsonYamlId } from './tools/jsonYaml'
import { unixTimeId } from './tools/unixTime'
import { xmlFormatterId } from './tools/xmlFormatter'
import { sqlFormatterId } from './tools/sqlFormatter'
import { base64Id } from './tools/base64'
import { uuidId } from './tools/uuid'
import { jsonFormatterId } from './tools/jsonFormatter'
import { chmodCalculatorId } from './tools/chmodCalculator'
import { urlEncoder } from './tools/urlEncoder'
import { urlDecoder } from './tools/urlDecoder'
import { htmlId } from './tools/html'
import { caseId } from './tools/case'
import { numberBaseId } from './tools/numberBase'
import { temperatureId } from './tools/temperature'
import { dataSizeId } from './tools/dataSize'
import { loremId } from './tools/lorem'
import { wordCounterId } from './tools/wordCounter'
import { stringUtilsId } from './tools/stringUtils'
import { qrcodeId } from './tools/qrcode'
import { colorConverterId } from './tools/colorConverter'

// Deep merge function for Indonesian translations
function mergeId(...translations: Record<string, any>[]): Record<string, any> {
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

// Combine all Indonesian translations
export const idTranslations = mergeId(
  commonId,
  randomStringId,
  jsonYamlId,
  unixTimeId,
  xmlFormatterId,
  sqlFormatterId,
  base64Id,
  uuidId,
  jsonFormatterId,
  chmodCalculatorId,
  { tools: { urlEncoder } },
  { tools: { urlDecoder } },
  htmlId,
  caseId,
  numberBaseId,
  temperatureId,
  dataSizeId,
  loremId,
  wordCounterId,
  stringUtilsId,
  qrcodeId,
  colorConverterId
)