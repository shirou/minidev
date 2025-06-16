export interface URLConversionResult {
  success: boolean
  result?: string
  error?: string
  stats?: {
    originalLength: number
    resultLength: number
    changePercentage: number
  }
}

export interface URLAnalysis {
  protocol?: string
  hostname?: string
  pathname?: string
  search?: string
  hash?: string
  port?: string
  isValid: boolean
  components: {
    [key: string]: string
  }
}

export interface URLEncoderOptions {
  encodeSpaceAsPlus: boolean
  encodeAllCharacters: boolean
}

export interface EncodingStats {
  originalLength: number
  resultLength: number
  changePercentage: number
  totalCharacters?: number
  encodedCharacters?: number
  encodingPercentage?: number
  specialCharacters?: string[]
}

// URL encode text
export function encodeURL(input: string, options: Partial<URLEncoderOptions> = {}): URLConversionResult {
  try {
    if (input === '') {
      return {
        success: true,
        result: '',
        stats: {
          originalLength: 0,
          resultLength: 0,
          changePercentage: 0
        }
      }
    }

    let encoded: string

    if (options.encodeAllCharacters) {
      // Encode all characters except unreserved ones (A-Z, a-z, 0-9, -, ., _, ~)
      encoded = input.replace(/[^A-Za-z0-9\-._~]/g, (char) => {
        return char.split('').map(c => '%' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join('')
      })
    } else {
      // Standard URL component encoding
      encoded = encodeURIComponent(input)
    }

    // Optional: replace %20 with + for form data
    if (options.encodeSpaceAsPlus) {
      encoded = encoded.replace(/%20/g, '+')
    }

    const stats = {
      originalLength: input.length,
      resultLength: encoded.length,
      changePercentage: input.length > 0 ? ((encoded.length - input.length) / input.length) * 100 : 0
    }

    return {
      success: true,
      result: encoded,
      stats
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown encoding error'
    }
  }
}

// URL decode text
export function decodeURL(input: string): URLConversionResult {
  try {
    if (input === '') {
      return {
        success: true,
        result: '',
        stats: {
          originalLength: 0,
          resultLength: 0,
          changePercentage: 0
        }
      }
    }

    // Replace + with %20 first (for form data compatibility)
    let toDecode = input.replace(/\+/g, '%20')
    
    // Decode URL components
    const decoded = decodeURIComponent(toDecode)

    const stats = {
      originalLength: input.length,
      resultLength: decoded.length,
      changePercentage: input.length > 0 ? ((decoded.length - input.length) / input.length) * 100 : 0
    }

    return {
      success: true,
      result: decoded,
      stats
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid URL encoding'
    }
  }
}

// Analyze URL structure
export function analyzeURL(input: string): URLAnalysis {
  const components: { [key: string]: string } = {}
  
  try {
    // Try to parse as URL
    const url = new URL(input)
    
    components.protocol = url.protocol
    components.hostname = url.hostname
    components.pathname = url.pathname
    components.search = url.search
    components.hash = url.hash
    if (url.port) components.port = url.port
    
    return {
      protocol: url.protocol,
      hostname: url.hostname,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      port: url.port || undefined,
      isValid: true,
      components
    }
  } catch {
    // If not a valid URL, try to analyze as URL component
    const hasEncoding = /%[0-9A-Fa-f]{2}/.test(input)
    const hasQueryParams = input.includes('?') || input.includes('&')
    const hasFragment = input.includes('#')
    
    if (hasQueryParams) {
      components.type = 'Query parameters'
    } else if (hasFragment) {
      components.type = 'URL fragment'
    } else if (hasEncoding) {
      components.type = 'URL encoded text'
    } else {
      components.type = 'Plain text'
    }
    
    return {
      isValid: false,
      components
    }
  }
}

// Extract query parameters from URL
export function extractQueryParams(input: string): { [key: string]: string } {
  const params: { [key: string]: string } = {}
  
  try {
    let searchParams: URLSearchParams
    
    if (input.includes('://')) {
      // Full URL
      const url = new URL(input)
      searchParams = url.searchParams
    } else if (input.startsWith('?')) {
      // Query string only
      searchParams = new URLSearchParams(input)
    } else {
      // Try as query string without ?
      searchParams = new URLSearchParams('?' + input)
    }
    
    searchParams.forEach((value, key) => {
      params[key] = value
    })
  } catch {
    // Manual parsing for malformed query strings
    const parts = input.split(/[?&]/).filter(part => part.includes('='))
    
    parts.forEach(part => {
      const [key, ...valueParts] = part.split('=')
      if (key) {
        params[key] = valueParts.join('=')
      }
    })
  }
  
  return params
}

// Validate URL encoding
export function isValidURLEncoding(input: string): boolean {
  // Check for valid percent encoding
  const percentPattern = /%[0-9A-Fa-f]{2}/g
  const matches = input.match(percentPattern)
  
  if (matches) {
    // All percent signs should be followed by valid hex
    const percentCount = (input.match(/%/g) || []).length
    return percentCount === matches.length
  }
  
  return true // No percent encoding is valid
}

// Get encoding statistics
export function getEncodingStats(input: string): {
  totalCharacters: number
  encodedCharacters: number
  encodingPercentage: number
  specialCharacters: string[]
} {
  const totalCharacters = input.length
  const encodedMatches = input.match(/%[0-9A-Fa-f]{2}/g) || []
  const encodedCharacters = encodedMatches.length
  const encodingPercentage = totalCharacters > 0 ? (encodedCharacters / totalCharacters) * 100 : 0
  
  // Find special characters that would need encoding
  const specialChars = input.match(/[^A-Za-z0-9\-._~]/g) || []
  const uniqueSpecialChars = [...new Set(specialChars)]
  
  return {
    totalCharacters,
    encodedCharacters,
    encodingPercentage,
    specialCharacters: uniqueSpecialChars
  }
}

// Common URL encoding examples
export const URL_EXAMPLES = {
  encoder: {
    simple: 'Hello World!',
    email: 'user@example.com',
    query: 'search term with spaces',
    special: 'Price: $25.99 (50% off)',
    unicode: '日本語テキスト',
    symbols: '!@#$%^&*()+=[]{}|;:,.<>?'
  },
  decoder: {
    simple: 'Hello%20World%21',
    email: 'user%40example.com',
    query: 'search%20term%20with%20spaces',
    special: 'Price%3A%20%2425.99%20%2850%25%20off%29',
    unicode: '%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88',
    symbols: '%21%40%23%24%25%5E%26%2A%28%29%2B%3D%5B%5D%7B%7D%7C%3B%3A%2C.%3C%3E%3F'
  }
}

// Get encoding explanation
export function getEncodingExplanation(): { [key: string]: string } {
  return {
    space: 'Space character → %20 or +',
    exclamation: 'Exclamation mark (!) → %21',
    at: 'At symbol (@) → %40',
    hash: 'Hash symbol (#) → %23',
    dollar: 'Dollar sign ($) → %24',
    percent: 'Percent sign (%) → %25',
    ampersand: 'Ampersand (&) → %26',
    plus: 'Plus sign (+) → %2B',
    comma: 'Comma (,) → %2C',
    slash: 'Forward slash (/) → %2F',
    colon: 'Colon (:) → %3A',
    semicolon: 'Semicolon (;) → %3B',
    equals: 'Equals sign (=) → %3D',
    question: 'Question mark (?) → %3F'
  }
}