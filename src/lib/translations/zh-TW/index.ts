import { commonZhTW } from './common'
import { randomStringZhTW } from './tools/randomString'
import { jsonYamlZhTW } from './tools/jsonYaml'
import { unixTimeZhTW } from './tools/unixTime'
import { xmlFormatterZhTW } from './tools/xmlFormatter'
import { sqlFormatterZhTW } from './tools/sqlFormatter'
import { base64ZhTW } from './tools/base64'
import { uuidZhTW } from './tools/uuid'
import { jsonFormatterZhTW } from './tools/jsonFormatter'
import { chmodCalculatorZhTW } from './tools/chmodCalculator'
import { urlEncoderZhTW } from './tools/urlEncoder'
import { urlDecoderZhTW } from './tools/urlDecoder'
import { htmlZhTW } from './tools/html'
import { caseZhTW } from './tools/case'
import { numberBaseZhTW } from './tools/numberBase'
import { temperatureZhTW } from './tools/temperature'
import { dataSizeZhTW } from './tools/dataSize'
import { loremZhTW } from './tools/lorem'
import { wordCounterZhTW } from './tools/wordCounter'
import { stringUtilsZhTW } from './tools/stringUtils'
import { qrcodeZhTW } from './tools/qrcode'
import { colorConverterZhTW } from './tools/colorConverter'

// Deep merge function for Traditional Chinese translations
function mergeZhTW(...translations: Record<string, any>[]): Record<string, any> {
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

// Combine all Traditional Chinese translations
export const zhTWTranslations = mergeZhTW(
  commonZhTW,
  randomStringZhTW,
  jsonYamlZhTW,
  unixTimeZhTW,
  xmlFormatterZhTW,
  sqlFormatterZhTW,
  base64ZhTW,
  uuidZhTW,
  jsonFormatterZhTW,
  chmodCalculatorZhTW,
  { tools: { urlEncoder: urlEncoderZhTW } },
  { tools: { urlDecoder: urlDecoderZhTW } },
  htmlZhTW,
  caseZhTW,
  numberBaseZhTW,
  temperatureZhTW,
  dataSizeZhTW,
  loremZhTW,
  wordCounterZhTW,
  stringUtilsZhTW,
  qrcodeZhTW,
  colorConverterZhTW
)