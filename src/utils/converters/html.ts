/**
 * HTML エンコード/デコード ユーティリティ関数
 */

export interface HtmlConversionResult {
  success: boolean
  result?: string
  error?: string
}

/**
 * HTML特殊文字をエンティティにエンコードする
 */
export function encodeHtml(text: string): HtmlConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const htmlEntities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    }

    const encoded = text.replace(/[&<>"'`=\/]/g, (match) => htmlEntities[match])

    return {
      success: true,
      result: encoded
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Encoding failed'
    }
  }
}

/**
 * HTMLエンティティを通常の文字にデコードする
 */
export function decodeHtml(text: string): HtmlConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    // 名前付きエンティティのマッピング
    const namedEntities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&apos;': "'",
      '&#x27;': "'",
      '&#x2F;': '/',
      '&#x60;': '`',
      '&#x3D;': '=',
      '&nbsp;': ' ',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™'
    }

    let decoded = text

    // 名前付きエンティティをデコード
    Object.entries(namedEntities).forEach(([entity, char]) => {
      decoded = decoded.replace(new RegExp(entity, 'g'), char)
    })

    // 数値文字参照をデコード (&#123; または &#x1A; 形式)
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      try {
        const charCode = parseInt(dec, 10)
        if (charCode >= 0 && charCode <= 0x10FFFF) {
          return String.fromCharCode(charCode)
        }
        return match // 無効な文字コードの場合はそのまま
      } catch {
        return match
      }
    })

    // 16進数文字参照をデコード
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      try {
        const charCode = parseInt(hex, 16)
        if (charCode >= 0 && charCode <= 0x10FFFF) {
          return String.fromCharCode(charCode)
        }
        return match // 無効な文字コードの場合はそのまま
      } catch {
        return match
      }
    })

    return {
      success: true,
      result: decoded
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Decoding failed'
    }
  }
}

/**
 * テキストにHTMLエンティティが含まれているかチェック
 */
export function containsHtmlEntities(text: string): boolean {
  return /&[a-zA-Z0-9#]+;/.test(text)
}

/**
 * テキストにHTML特殊文字が含まれているかチェック
 */
export function containsHtmlSpecialChars(text: string): boolean {
  return /[&<>"'`=\/]/.test(text)
}