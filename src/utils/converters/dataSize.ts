/**
 * Data size conversion utility functions
 */

export interface DataSizeConversionResult {
  success: boolean
  result?: number
  error?: string
}

export type DataSizeUnit = 'bit' | 'byte' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb' | 'kib' | 'mib' | 'gib' | 'tib' | 'pib'

/**
 * Convert data size from one unit to another
 */
export function convertDataSize(
  value: number,
  fromUnit: DataSizeUnit,
  toUnit: DataSizeUnit
): DataSizeConversionResult {
  try {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
      return {
        success: false,
        error: 'Input must be a valid number'
      }
    }

    if (value < 0) {
      return {
        success: false,
        error: 'Data size cannot be negative'
      }
    }

    // Convert to bits first (base unit)
    const toBits = getConversionFactorToBits(fromUnit)
    if (toBits === null) {
      return {
        success: false,
        error: 'Invalid source unit'
      }
    }

    const bits = value * toBits

    // Convert from bits to target unit
    const fromBits = getConversionFactorToBits(toUnit)
    if (fromBits === null) {
      return {
        success: false,
        error: 'Invalid target unit'
      }
    }

    const result = bits / fromBits

    // Round to appropriate decimal places based on magnitude
    const rounded = roundToSignificantDigits(result, 6)

    return {
      success: true,
      result: rounded
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    }
  }
}

/**
 * Get conversion factor to bits for each unit
 */
function getConversionFactorToBits(unit: DataSizeUnit): number | null {
  const factors: Record<DataSizeUnit, number> = {
    bit: 1,
    byte: 8,
    kb: 8 * 1000, // Decimal kilobyte
    mb: 8 * 1000 * 1000, // Decimal megabyte
    gb: 8 * 1000 * 1000 * 1000, // Decimal gigabyte
    tb: 8 * 1000 * 1000 * 1000 * 1000, // Decimal terabyte
    pb: 8 * 1000 * 1000 * 1000 * 1000 * 1000, // Decimal petabyte
    kib: 8 * 1024, // Binary kibibyte
    mib: 8 * 1024 * 1024, // Binary mebibyte
    gib: 8 * 1024 * 1024 * 1024, // Binary gibibyte
    tib: 8 * 1024 * 1024 * 1024 * 1024, // Binary tebibyte
    pib: 8 * 1024 * 1024 * 1024 * 1024 * 1024 // Binary pebibyte
  }

  return factors[unit] || null
}

/**
 * Round number to specified significant digits
 */
function roundToSignificantDigits(num: number, digits: number): number {
  if (num === 0) return 0
  
  const magnitude = Math.floor(Math.log10(Math.abs(num)))
  const factor = Math.pow(10, digits - magnitude - 1)
  
  return Math.round(num * factor) / factor
}

/**
 * Convert a data size value to all supported units
 */
export function convertToAllDataSizeUnits(
  value: number,
  fromUnit: DataSizeUnit
): Record<string, DataSizeConversionResult> {
  const units: Record<string, DataSizeUnit> = {
    'Bit': 'bit',
    'Byte (B)': 'byte',
    'Kilobyte (KB)': 'kb',
    'Megabyte (MB)': 'mb',
    'Gigabyte (GB)': 'gb',
    'Terabyte (TB)': 'tb',
    'Petabyte (PB)': 'pb',
    'Kibibyte (KiB)': 'kib',
    'Mebibyte (MiB)': 'mib',
    'Gibibyte (GiB)': 'gib',
    'Tebibyte (TiB)': 'tib',
    'Pebibyte (PiB)': 'pib'
  }

  const results: Record<string, DataSizeConversionResult> = {}

  Object.entries(units).forEach(([name, unit]) => {
    results[name] = convertDataSize(value, fromUnit, unit)
  })

  return results
}

/**
 * Get human-readable unit names
 */
export function getUnitDisplayName(unit: DataSizeUnit): string {
  const names: Record<DataSizeUnit, string> = {
    bit: 'Bit',
    byte: 'Byte (B)',
    kb: 'Kilobyte (KB)',
    mb: 'Megabyte (MB)',
    gb: 'Gigabyte (GB)',
    tb: 'Terabyte (TB)',
    pb: 'Petabyte (PB)',
    kib: 'Kibibyte (KiB)',
    mib: 'Mebibyte (MiB)',
    gib: 'Gibibyte (GiB)',
    tib: 'Tebibyte (TiB)',
    pib: 'Pebibyte (PiB)'
  }
  return names[unit] || unit
}

/**
 * Get common data size examples
 */
export function getDataSizeExamples(): Array<{
  name: string
  value: number
  unit: DataSizeUnit
  description: string
}> {
  return [
    { name: 'Text Character', value: 1, unit: 'byte', description: 'Single ASCII character' },
    { name: 'Tweet', value: 280, unit: 'byte', description: 'Maximum tweet length' },
    { name: 'Small Photo', value: 2, unit: 'mb', description: 'Compressed JPEG image' },
    { name: 'Song (MP3)', value: 4, unit: 'mb', description: '3-4 minute song' },
    { name: 'eBook', value: 1, unit: 'mb', description: 'Average novel length' },
    { name: 'HD Movie', value: 4, unit: 'gb', description: '2-hour 1080p movie' },
    { name: '4K Movie', value: 25, unit: 'gb', description: '2-hour 4K movie' },
    { name: 'DVD', value: 4.7, unit: 'gb', description: 'Single layer DVD capacity' },
    { name: 'Blu-ray', value: 25, unit: 'gb', description: 'Single layer Blu-ray' },
    { name: 'Modern Game', value: 50, unit: 'gb', description: 'AAA video game' },
    { name: 'SSD Drive', value: 1, unit: 'tb', description: 'Consumer SSD capacity' },
    { name: 'Hard Drive', value: 4, unit: 'tb', description: 'Consumer HDD capacity' }
  ]
}

/**
 * Format data size with appropriate units for display
 */
export function formatDataSize(bytes: number): { value: number; unit: string } {
  const units = [
    { name: 'B', factor: 1 },
    { name: 'KB', factor: 1000 },
    { name: 'MB', factor: 1000 * 1000 },
    { name: 'GB', factor: 1000 * 1000 * 1000 },
    { name: 'TB', factor: 1000 * 1000 * 1000 * 1000 },
    { name: 'PB', factor: 1000 * 1000 * 1000 * 1000 * 1000 }
  ]

  // Find the largest unit that results in a value >= 1
  for (let i = units.length - 1; i >= 0; i--) {
    if (bytes >= units[i].factor) {
      return {
        value: roundToSignificantDigits(bytes / units[i].factor, 3),
        unit: units[i].name
      }
    }
  }

  return { value: bytes, unit: 'B' }
}

/**
 * Validate if value is reasonable for the given unit
 */
export function validateDataSize(value: number, unit: DataSizeUnit): {
  isValid: boolean
  warning?: string
} {
  if (value < 0) {
    return {
      isValid: false,
      warning: 'Data size cannot be negative'
    }
  }

  // Convert to bytes for comparison
  const conversionResult = convertDataSize(value, unit, 'byte')
  if (!conversionResult.success) {
    return {
      isValid: false,
      warning: 'Invalid data size'
    }
  }

  const bytes = conversionResult.result!

  // Check for extremely large values (> 1 exabyte)
  const exabyte = 1000 * 1000 * 1000 * 1000 * 1000 * 1000
  if (bytes > exabyte) {
    return {
      isValid: true,
      warning: 'This is an extremely large data size (> 1 EB)'
    }
  }

  return { isValid: true }
}