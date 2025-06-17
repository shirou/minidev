/**
 * Case conversion utility functions
 */

export interface CaseConversionResult {
  success: boolean
  result?: string
  error?: string
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      })
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to PascalCase
 */
export function toPascalCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
        return word.toUpperCase()
      })
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to snake_case
 */
export function toSnakeCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_')
      .replace(/^_+|_+$/g, '')

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-')
      .replace(/^-+|-+$/g, '')

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to CONSTANT_CASE
 */
export function toConstantCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toUpperCase())
      .join('_')
      .replace(/^_+|_+$/g, '')

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to dot.case
 */
export function toDotCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('.')
      .replace(/^\.+|\.+$/g, '')

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to lowercase
 */
export function toLowerCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    return {
      success: true,
      result: text.toLowerCase()
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to UPPERCASE
 */
export function toUpperCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    return {
      success: true,
      result: text.toUpperCase()
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to Title Case
 */
export function toTitleCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase())

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert string to Sentence case
 */
export function toSentenceCase(text: string): CaseConversionResult {
  try {
    if (typeof text !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Get all case conversions for a given text
 */
export function getAllCaseConversions(text: string): Record<string, CaseConversionResult> {
  return {
    camelCase: toCamelCase(text),
    PascalCase: toPascalCase(text),
    snake_case: toSnakeCase(text),
    'kebab-case': toKebabCase(text),
    CONSTANT_CASE: toConstantCase(text),
    'dot.case': toDotCase(text),
    lowercase: toLowerCase(text),
    UPPERCASE: toUpperCase(text),
    'Title Case': toTitleCase(text),
    'Sentence case': toSentenceCase(text)
  }
}