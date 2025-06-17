/**
 * Color conversion utility functions
 */

export interface ColorConversionResult {
  success: boolean
  result?: string | number
  error?: string
}

export interface ParsedColor {
  format: ColorFormat
  color: RGBColor | HSLColor | string
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk' | 'css'

export interface RGBColor {
  r: number
  g: number
  b: number
}

export interface HSLColor {
  h: number
  s: number
  l: number
}

export interface HSVColor {
  h: number
  s: number
  v: number
}

export interface CMYKColor {
  c: number
  m: number
  y: number
  k: number
}

/**
 * Convert HEX color to RGB
 */
export function hexToRgb(hex: string): { success: boolean, result?: RGBColor, error?: string } {
  try {
    const cleanHex = hex.replace('#', '')
    
    if (!/^[0-9A-F]{6}$/i.test(cleanHex) && !/^[0-9A-F]{3}$/i.test(cleanHex)) {
      return {
        success: false,
        error: 'Invalid HEX format. Use #RRGGBB or #RGB format.'
      }
    }

    let fullHex = cleanHex
    if (cleanHex.length === 3) {
      fullHex = cleanHex.split('').map(char => char + char).join('')
    }

    const r = parseInt(fullHex.substring(0, 2), 16)
    const g = parseInt(fullHex.substring(2, 4), 16)
    const b = parseInt(fullHex.substring(4, 6), 16)

    return {
      success: true,
      result: { r, g, b }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HEX to RGB conversion failed'
    }
  }
}

/**
 * Convert RGB color to HEX
 */
export function rgbToHex(r: number, g: number, b: number): ColorConversionResult {
  try {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      return {
        success: false,
        error: 'RGB values must be between 0 and 255'
      }
    }

    const toHex = (value: number) => {
      const hex = Math.round(value).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()

    return {
      success: true,
      result: hex
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'RGB to HEX conversion failed'
    }
  }
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): { success: boolean, result?: HSLColor, error?: string } {
  try {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const diff = max - min
    const sum = max + min

    const l = sum / 2

    let h = 0
    let s = 0

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum

      switch (max) {
        case r:
          h = ((g - b) / diff + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / diff + 2) / 6
          break
        case b:
          h = ((r - g) / diff + 4) / 6
          break
      }
    }

    return {
      success: true,
      result: {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'RGB to HSL conversion failed'
    }
  }
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): { success: boolean, result?: RGBColor, error?: string } {
  try {
    h = h / 360
    s = s / 100
    l = l / 100

    if (s === 0) {
      const gray = Math.round(l * 255)
      return {
        success: true,
        result: { r: gray, g: gray, b: gray }
      }
    }

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    const r = hue2rgb(p, q, h + 1/3)
    const g = hue2rgb(p, q, h)
    const b = hue2rgb(p, q, h - 1/3)

    return {
      success: true,
      result: {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HSL to RGB conversion failed'
    }
  }
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(r: number, g: number, b: number): { success: boolean, result?: HSVColor, error?: string } {
  try {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const diff = max - min

    const v = max
    const s = max === 0 ? 0 : diff / max

    let h = 0
    if (diff !== 0) {
      switch (max) {
        case r:
          h = ((g - b) / diff + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / diff + 2) / 6
          break
        case b:
          h = ((r - g) / diff + 4) / 6
          break
      }
    }

    return {
      success: true,
      result: {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'RGB to HSV conversion failed'
    }
  }
}

/**
 * Convert HSV to RGB
 */
export function hsvToRgb(h: number, s: number, v: number): { success: boolean, result?: RGBColor, error?: string } {
  try {
    h = h / 360
    s = s / 100
    v = v / 100

    const c = v * s
    const x = c * (1 - Math.abs((h * 6) % 2 - 1))
    const m = v - c

    let r = 0, g = 0, b = 0

    if (h >= 0 && h < 1/6) {
      r = c; g = x; b = 0
    } else if (h >= 1/6 && h < 2/6) {
      r = x; g = c; b = 0
    } else if (h >= 2/6 && h < 3/6) {
      r = 0; g = c; b = x
    } else if (h >= 3/6 && h < 4/6) {
      r = 0; g = x; b = c
    } else if (h >= 4/6 && h < 5/6) {
      r = x; g = 0; b = c
    } else if (h >= 5/6 && h < 1) {
      r = c; g = 0; b = x
    }

    return {
      success: true,
      result: {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HSV to RGB conversion failed'
    }
  }
}

/**
 * Convert RGB to CMYK
 */
export function rgbToCmyk(r: number, g: number, b: number): { success: boolean, result?: CMYKColor, error?: string } {
  try {
    r /= 255
    g /= 255
    b /= 255

    const k = 1 - Math.max(r, g, b)
    
    if (k === 1) {
      return {
        success: true,
        result: { c: 0, m: 0, y: 0, k: 100 }
      }
    }

    const c = (1 - r - k) / (1 - k)
    const m = (1 - g - k) / (1 - k)
    const y = (1 - b - k) / (1 - k)

    return {
      success: true,
      result: {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'RGB to CMYK conversion failed'
    }
  }
}

/**
 * Convert CMYK to RGB
 */
export function cmykToRgb(c: number, m: number, y: number, k: number): { success: boolean, result?: RGBColor, error?: string } {
  try {
    c /= 100
    m /= 100
    y /= 100
    k /= 100

    const r = 255 * (1 - c) * (1 - k)
    const g = 255 * (1 - m) * (1 - k)
    const b = 255 * (1 - y) * (1 - k)

    return {
      success: true,
      result: {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CMYK to RGB conversion failed'
    }
  }
}

/**
 * Parse color input from various formats
 */
export function parseColorInput(input: string): { success: boolean, result?: ParsedColor, error?: string } {
  try {
    const cleaned = input.trim()

    // HEX format
    if (cleaned.match(/^#?[0-9A-F]{3}$|^#?[0-9A-F]{6}$/i)) {
      const hexResult = hexToRgb(cleaned)
      if (hexResult.success) {
        return {
          success: true,
          result: { format: 'hex', color: cleaned.startsWith('#') ? cleaned : '#' + cleaned }
        }
      }
    }

    // RGB format
    const rgbMatch = cleaned.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1])
      const g = parseInt(rgbMatch[2])
      const b = parseInt(rgbMatch[3])
      if (r <= 255 && g <= 255 && b <= 255) {
        return {
          success: true,
          result: { format: 'rgb', color: { r, g, b } }
        }
      }
    }

    // HSL format
    const hslMatch = cleaned.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i)
    if (hslMatch) {
      const h = parseInt(hslMatch[1])
      const s = parseInt(hslMatch[2])
      const l = parseInt(hslMatch[3])
      if (h <= 360 && s <= 100 && l <= 100) {
        return {
          success: true,
          result: { format: 'hsl', color: { h, s, l } }
        }
      }
    }

    return {
      success: false,
      error: 'Unknown color format. Supported formats: HEX (#RRGGBB), RGB (rgb(r,g,b)), HSL (hsl(h,s%,l%))'
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Color parsing failed'
    }
  }
}

/**
 * Convert color to all supported formats
 */
export function convertToAllColorFormats(input: string): Record<string, ColorConversionResult> {
  const results: Record<string, ColorConversionResult> = {}
  
  const parsed = parseColorInput(input)
  if (!parsed.success || !parsed.result) {
    return {
      'HEX': { success: false, error: parsed.error || 'Failed to parse color' },
      'RGB': { success: false, error: parsed.error || 'Failed to parse color' },
      'HSL': { success: false, error: parsed.error || 'Failed to parse color' },
      'HSV': { success: false, error: parsed.error || 'Failed to parse color' },
      'CMYK': { success: false, error: parsed.error || 'Failed to parse color' },
      'CSS RGB': { success: false, error: parsed.error || 'Failed to parse color' },
      'CSS HSL': { success: false, error: parsed.error || 'Failed to parse color' }
    }
  }

  let rgb: RGBColor | null = null

  // Convert input to RGB first
  if (parsed.result.format === 'hex') {
    const hexResult = hexToRgb(parsed.result.color as string)
    if (hexResult.success && hexResult.result) {
      rgb = hexResult.result
    }
  } else if (parsed.result.format === 'rgb') {
    rgb = parsed.result.color as RGBColor
  } else if (parsed.result.format === 'hsl') {
    const hslColor = parsed.result.color as HSLColor
    const hslResult = hslToRgb(hslColor.h, hslColor.s, hslColor.l)
    if (hslResult.success && hslResult.result) {
      rgb = hslResult.result
    }
  }

  if (!rgb) {
    const errorMsg = 'Failed to convert to RGB'
    return {
      'HEX': { success: false, error: errorMsg },
      'RGB': { success: false, error: errorMsg },
      'HSL': { success: false, error: errorMsg },
      'HSV': { success: false, error: errorMsg },
      'CMYK': { success: false, error: errorMsg },
      'CSS RGB': { success: false, error: errorMsg },
      'CSS HSL': { success: false, error: errorMsg }
    }
  }

  // Convert to all formats
  results['HEX'] = rgbToHex(rgb.r, rgb.g, rgb.b)
  results['RGB'] = { success: true, result: `${rgb.r}, ${rgb.g}, ${rgb.b}` }
  
  const hslResult = rgbToHsl(rgb.r, rgb.g, rgb.b)
  if (hslResult.success && hslResult.result) {
    results['HSL'] = { success: true, result: `${hslResult.result.h}, ${hslResult.result.s}%, ${hslResult.result.l}%` }
    results['CSS HSL'] = { success: true, result: `hsl(${hslResult.result.h}, ${hslResult.result.s}%, ${hslResult.result.l}%)` }
  } else {
    results['HSL'] = { success: false, error: hslResult.error || 'HSL conversion failed' }
    results['CSS HSL'] = { success: false, error: hslResult.error || 'HSL conversion failed' }
  }

  const hsvResult = rgbToHsv(rgb.r, rgb.g, rgb.b)
  if (hsvResult.success && hsvResult.result) {
    results['HSV'] = { success: true, result: `${hsvResult.result.h}, ${hsvResult.result.s}%, ${hsvResult.result.v}%` }
  } else {
    results['HSV'] = { success: false, error: hsvResult.error || 'HSV conversion failed' }
  }

  const cmykResult = rgbToCmyk(rgb.r, rgb.g, rgb.b)
  if (cmykResult.success && cmykResult.result) {
    results['CMYK'] = { success: true, result: `${cmykResult.result.c}%, ${cmykResult.result.m}%, ${cmykResult.result.y}%, ${cmykResult.result.k}%` }
  } else {
    results['CMYK'] = { success: false, error: cmykResult.error || 'CMYK conversion failed' }
  }

  results['CSS RGB'] = { success: true, result: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }

  return results
}

/**
 * Get color luminance for contrast calculations
 */
export function getColorLuminance(r: number, g: number, b: number): number {
  const gamma = (color: number) => {
    color /= 255
    return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
  }

  return 0.2126 * gamma(r) + 0.7152 * gamma(g) + 0.0722 * gamma(b)
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: RGBColor, color2: RGBColor): number {
  const lum1 = getColorLuminance(color1.r, color1.g, color1.b)
  const lum2 = getColorLuminance(color2.r, color2.g, color2.b)
  
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Get color palette suggestions based on input color
 */
export function getColorPalette(r: number, g: number, b: number): { name: string, color: RGBColor }[] {
  const hslResult = rgbToHsl(r, g, b)
  if (!hslResult.success || !hslResult.result) {
    return []
  }

  const { h, s, l } = hslResult.result
  const palette: { name: string, color: RGBColor }[] = []

  // Complementary
  const compHue = (h + 180) % 360
  const compResult = hslToRgb(compHue, s, l)
  if (compResult.success && compResult.result) {
    palette.push({ name: 'Complementary', color: compResult.result })
  }

  // Analogous colors
  const analog1Result = hslToRgb((h + 30) % 360, s, l)
  const analog2Result = hslToRgb((h - 30 + 360) % 360, s, l)
  if (analog1Result.success && analog1Result.result) {
    palette.push({ name: 'Analogous +30°', color: analog1Result.result })
  }
  if (analog2Result.success && analog2Result.result) {
    palette.push({ name: 'Analogous -30°', color: analog2Result.result })
  }

  // Triadic colors
  const triad1Result = hslToRgb((h + 120) % 360, s, l)
  const triad2Result = hslToRgb((h + 240) % 360, s, l)
  if (triad1Result.success && triad1Result.result) {
    palette.push({ name: 'Triadic +120°', color: triad1Result.result })
  }
  if (triad2Result.success && triad2Result.result) {
    palette.push({ name: 'Triadic +240°', color: triad2Result.result })
  }

  // Lighter and darker variations
  const lighterResult = hslToRgb(h, s, Math.min(100, l + 20))
  const darkerResult = hslToRgb(h, s, Math.max(0, l - 20))
  if (lighterResult.success && lighterResult.result) {
    palette.push({ name: 'Lighter', color: lighterResult.result })
  }
  if (darkerResult.success && darkerResult.result) {
    palette.push({ name: 'Darker', color: darkerResult.result })
  }

  return palette
}