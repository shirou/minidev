/**
 * Temperature conversion utility functions
 */

export interface TemperatureConversionResult {
  success: boolean
  result?: number
  error?: string
}

export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine'

/**
 * Convert temperature from one unit to another
 */
export function convertTemperature(
  value: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): TemperatureConversionResult {
  try {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      return {
        success: false,
        error: 'Input must be a valid number'
      }
    }

    // First convert to Celsius as the base unit
    let celsius: number

    switch (fromUnit) {
      case 'celsius':
        celsius = value
        break
      case 'fahrenheit':
        celsius = (value - 32) * (5 / 9)
        break
      case 'kelvin':
        celsius = value - 273.15
        break
      case 'rankine':
        celsius = (value - 491.67) * (5 / 9)
        break
      default:
        return {
          success: false,
          error: 'Invalid source unit'
        }
    }

    // Then convert from Celsius to target unit
    let result: number

    switch (toUnit) {
      case 'celsius':
        result = celsius
        break
      case 'fahrenheit':
        result = celsius * (9 / 5) + 32
        break
      case 'kelvin':
        result = celsius + 273.15
        break
      case 'rankine':
        result = celsius * (9 / 5) + 491.67
        break
      default:
        return {
          success: false,
          error: 'Invalid target unit'
        }
    }

    return {
      success: true,
      result: Math.round(result * 100) / 100 // Round to 2 decimal places
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Convert a temperature value to all supported units
 */
export function convertToAllTemperatureUnits(
  value: number,
  fromUnit: TemperatureUnit
): Record<string, TemperatureConversionResult> {
  const units: Record<string, TemperatureUnit> = {
    'Celsius (°C)': 'celsius',
    'Fahrenheit (°F)': 'fahrenheit',
    'Kelvin (K)': 'kelvin',
    'Rankine (°R)': 'rankine'
  }

  const results: Record<string, TemperatureConversionResult> = {}

  Object.entries(units).forEach(([name, unit]) => {
    results[name] = convertTemperature(value, fromUnit, unit)
  })

  return results
}

/**
 * Validate temperature value based on physical limits
 */
export function validateTemperature(value: number, unit: TemperatureUnit): {
  isValid: boolean
  warning?: string
} {
  const absoluteZero = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0,
    rankine: 0
  }

  const sunSurface = {
    celsius: 5778,
    fahrenheit: 10440,
    kelvin: 6051,
    rankine: 10892
  }

  if (value < absoluteZero[unit]) {
    return {
      isValid: false,
      warning: `Temperature cannot be below absolute zero (${absoluteZero[unit]}° ${getUnitSymbol(unit)})`
    }
  }

  if (value > sunSurface[unit]) {
    return {
      isValid: true,
      warning: `This temperature is higher than the Sun's surface (${sunSurface[unit]}° ${getUnitSymbol(unit)})`
    }
  }

  return { isValid: true }
}

/**
 * Get the symbol for a temperature unit
 */
export function getUnitSymbol(unit: TemperatureUnit): string {
  const symbols = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K',
    rankine: '°R'
  }
  return symbols[unit]
}

/**
 * Get common temperature references
 */
export function getTemperatureReferences(): Array<{
  name: string
  celsius: number
  description: string
}> {
  return [
    { name: 'Absolute Zero', celsius: -273.15, description: 'Coldest possible temperature' },
    { name: 'Liquid Nitrogen', celsius: -195.8, description: 'Boiling point' },
    { name: 'Dry Ice', celsius: -78.5, description: 'Sublimation point' },
    { name: 'Water Freezing', celsius: 0, description: 'Freezing point of water' },
    { name: 'Room Temperature', celsius: 20, description: 'Typical indoor temperature' },
    { name: 'Human Body', celsius: 37, description: 'Normal body temperature' },
    { name: 'Water Boiling', celsius: 100, description: 'Boiling point of water at sea level' },
    { name: 'Paper Ignition', celsius: 233, description: 'Auto-ignition temperature' },
    { name: 'Lead Melting', celsius: 327, description: 'Melting point of lead' },
    { name: 'Sun Surface', celsius: 5778, description: 'Temperature of the Sun\'s surface' }
  ]
}

/**
 * Find the closest temperature reference
 */
export function findClosestReference(celsius: number): {
  name: string
  celsius: number
  description: string
  difference: number
} | null {
  const references = getTemperatureReferences()
  let closest = references[0]
  let smallestDiff = Math.abs(celsius - closest.celsius)

  for (const ref of references) {
    const diff = Math.abs(celsius - ref.celsius)
    if (diff < smallestDiff) {
      smallestDiff = diff
      closest = ref
    }
  }

  return {
    ...closest,
    difference: smallestDiff
  }
}