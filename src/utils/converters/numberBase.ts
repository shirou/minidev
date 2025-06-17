/**
 * Number base conversion utility functions
 */

export interface NumberBaseConversionResult {
  success: boolean
  result?: string
  error?: string
}

export type NumberBase = 2 | 8 | 10 | 16

/**
 * Convert number from one base to another
 */
export function convertNumberBase(
  input: string,
  fromBase: NumberBase,
  toBase: NumberBase
): NumberBaseConversionResult {
  try {
    if (typeof input !== 'string') {
      return {
        success: false,
        error: 'Input must be a string'
      }
    }

    const trimmedInput = input.trim()
    if (!trimmedInput) {
      return {
        success: false,
        error: 'Input cannot be empty'
      }
    }

    // Remove common prefixes
    let cleanInput = trimmedInput
    if (fromBase === 2 && cleanInput.startsWith('0b')) {
      cleanInput = cleanInput.substring(2)
    } else if (fromBase === 8 && cleanInput.startsWith('0o')) {
      cleanInput = cleanInput.substring(2)
    } else if (fromBase === 16 && (cleanInput.startsWith('0x') || cleanInput.startsWith('0X'))) {
      cleanInput = cleanInput.substring(2)
    }

    // Validate input characters for the given base
    if (!isValidForBase(cleanInput, fromBase)) {
      return {
        success: false,
        error: `Invalid characters for base ${fromBase}`
      }
    }

    // Convert to decimal first, then to target base
    const decimalValue = parseInt(cleanInput, fromBase)
    
    if (isNaN(decimalValue)) {
      return {
        success: false,
        error: 'Invalid number format'
      }
    }

    if (!Number.isFinite(decimalValue)) {
      return {
        success: false,
        error: 'Number is too large'
      }
    }

    const result = decimalValue.toString(toBase).toUpperCase()

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
 * Validate if input string contains only valid characters for the given base
 */
function isValidForBase(input: string, base: NumberBase): boolean {
  const validChars: Record<NumberBase, string> = {
    2: '01',
    8: '01234567',
    10: '0123456789',
    16: '0123456789ABCDEFabcdef'
  }

  const allowedChars = validChars[base]
  return input.split('').every(char => allowedChars.includes(char))
}

/**
 * Convert a decimal number to all common bases
 */
export function convertToAllBases(input: string, fromBase: NumberBase = 10): Record<string, NumberBaseConversionResult> {
  const bases: Record<string, NumberBase> = {
    'Binary (Base 2)': 2,
    'Octal (Base 8)': 8,
    'Decimal (Base 10)': 10,
    'Hexadecimal (Base 16)': 16
  }

  const results: Record<string, NumberBaseConversionResult> = {}

  Object.entries(bases).forEach(([name, toBase]) => {
    if (toBase === fromBase) {
      // If it's the same base, just return the cleaned input
      let cleanInput = input.trim()
      if (fromBase === 2 && cleanInput.startsWith('0b')) {
        cleanInput = cleanInput.substring(2)
      } else if (fromBase === 8 && cleanInput.startsWith('0o')) {
        cleanInput = cleanInput.substring(2)
      } else if (fromBase === 16 && (cleanInput.startsWith('0x') || cleanInput.startsWith('0X'))) {
        cleanInput = cleanInput.substring(2)
      }
      
      results[name] = {
        success: true,
        result: cleanInput.toUpperCase()
      }
    } else {
      results[name] = convertNumberBase(input, fromBase, toBase)
    }
  })

  return results
}

/**
 * Add common prefixes to numbers based on their base
 */
export function addPrefix(value: string, base: NumberBase): string {
  switch (base) {
    case 2:
      return `0b${value}`
    case 8:
      return `0o${value}`
    case 16:
      return `0x${value}`
    default:
      return value
  }
}

/**
 * Get the maximum safe value for JavaScript numbers in different bases
 */
export function getMaxSafeValue(base: NumberBase): string {
  const maxSafeInteger = Number.MAX_SAFE_INTEGER
  return maxSafeInteger.toString(base).toUpperCase()
}

/**
 * Validate if a number is within safe integer range
 */
export function isWithinSafeRange(input: string, fromBase: NumberBase): boolean {
  try {
    const decimalValue = parseInt(input, fromBase)
    return Number.isSafeInteger(decimalValue)
  } catch {
    return false
  }
}