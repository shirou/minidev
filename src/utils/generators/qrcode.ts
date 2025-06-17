/**
 * QR Code generation utility functions
 */

import QRCode from 'qrcode'

export interface QRCodeResult {
  success: boolean
  result?: string // Base64 data URL
  error?: string
}

export type QRCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

export interface QRCodeOptions {
  errorCorrectionLevel: QRCodeErrorCorrectionLevel
  width: number
  margin: number
  color: {
    dark: string
    light: string
  }
}

/**
 * Generate QR Code as data URL
 */
export async function generateQRCode(
  text: string,
  options: Partial<QRCodeOptions> = {}
): Promise<QRCodeResult> {
  try {
    if (!text || text.trim() === '') {
      return {
        success: false,
        error: 'Text cannot be empty'
      }
    }

    const defaultOptions: QRCodeOptions = {
      errorCorrectionLevel: 'M',
      width: 256,
      margin: 4,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }

    const qrOptions = { ...defaultOptions, ...options }

    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: qrOptions.errorCorrectionLevel,
      width: qrOptions.width,
      margin: qrOptions.margin,
      color: qrOptions.color
    })

    return {
      success: true,
      result: dataUrl
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'QR Code generation failed'
    }
  }
}

/**
 * Generate WiFi QR Code
 */
export async function generateWiFiQRCode(
  ssid: string,
  password: string,
  security: 'WPA' | 'WEP' | 'nopass' = 'WPA',
  hidden: boolean = false,
  options: Partial<QRCodeOptions> = {}
): Promise<QRCodeResult> {
  try {
    if (!ssid || ssid.trim() === '') {
      return {
        success: false,
        error: 'SSID cannot be empty'
      }
    }

    if (security !== 'nopass' && (!password || password.trim() === '')) {
      return {
        success: false,
        error: 'Password cannot be empty for secured networks'
      }
    }

    // Escape special characters
    const escapedSSID = ssid.replace(/[\\;,":]/g, '\\$&')
    const escapedPassword = password.replace(/[\\;,":]/g, '\\$&')

    // Create WiFi QR code string format: WIFI:T:WPA;S:mynetwork;P:mypass;H:false;;
    const wifiString = `WIFI:T:${security};S:${escapedSSID};P:${escapedPassword};H:${hidden};;`

    return await generateQRCode(wifiString, options)
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'WiFi QR Code generation failed'
    }
  }
}

/**
 * Generate URL QR Code
 */
export async function generateUrlQRCode(
  url: string,
  options: Partial<QRCodeOptions> = {}
): Promise<QRCodeResult> {
  try {
    if (!url || url.trim() === '') {
      return {
        success: false,
        error: 'URL cannot be empty'
      }
    }

    // Add protocol if missing
    let formattedUrl = url.trim()
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`
    }

    // Basic URL validation
    try {
      new URL(formattedUrl)
    } catch {
      return {
        success: false,
        error: 'Invalid URL format'
      }
    }

    return await generateQRCode(formattedUrl, options)
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'URL QR Code generation failed'
    }
  }
}

/**
 * Generate Email QR Code
 */
export async function generateEmailQRCode(
  email: string,
  subject?: string,
  body?: string,
  options: Partial<QRCodeOptions> = {}
): Promise<QRCodeResult> {
  try {
    if (!email || email.trim() === '') {
      return {
        success: false,
        error: 'Email cannot be empty'
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return {
        success: false,
        error: 'Invalid email format'
      }
    }

    let mailtoString = `mailto:${email.trim()}`
    const params: string[] = []

    if (subject && subject.trim()) {
      params.push(`subject=${encodeURIComponent(subject.trim())}`)
    }

    if (body && body.trim()) {
      params.push(`body=${encodeURIComponent(body.trim())}`)
    }

    if (params.length > 0) {
      mailtoString += `?${params.join('&')}`
    }

    return await generateQRCode(mailtoString, options)
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Email QR Code generation failed'
    }
  }
}

/**
 * Generate Phone QR Code
 */
export async function generatePhoneQRCode(
  phoneNumber: string,
  options: Partial<QRCodeOptions> = {}
): Promise<QRCodeResult> {
  try {
    if (!phoneNumber || phoneNumber.trim() === '') {
      return {
        success: false,
        error: 'Phone number cannot be empty'
      }
    }

    // Clean phone number (remove spaces, dashes, parentheses)
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '')
    
    // Basic phone number validation (allow + for international)
    if (!/^[\+]?[0-9]+$/.test(cleanNumber)) {
      return {
        success: false,
        error: 'Invalid phone number format'
      }
    }

    const telString = `tel:${cleanNumber}`

    return await generateQRCode(telString, options)
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Phone QR Code generation failed'
    }
  }
}

/**
 * Generate SMS QR Code
 */
export async function generateSMSQRCode(
  phoneNumber: string,
  message?: string,
  options: Partial<QRCodeOptions> = {}
): Promise<QRCodeResult> {
  try {
    if (!phoneNumber || phoneNumber.trim() === '') {
      return {
        success: false,
        error: 'Phone number cannot be empty'
      }
    }

    // Clean phone number
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '')
    
    if (!/^[\+]?[0-9]+$/.test(cleanNumber)) {
      return {
        success: false,
        error: 'Invalid phone number format'
      }
    }

    let smsString = `sms:${cleanNumber}`
    
    if (message && message.trim()) {
      smsString += `?body=${encodeURIComponent(message.trim())}`
    }

    return await generateQRCode(smsString, options)
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SMS QR Code generation failed'
    }
  }
}

/**
 * Generate vCard (Contact) QR Code
 */
export async function generateVCardQRCode(
  contact: {
    firstName?: string
    lastName?: string
    organization?: string
    phone?: string
    email?: string
    url?: string
    address?: string
  },
  options: Partial<QRCodeOptions> = {}
): Promise<QRCodeResult> {
  try {
    const { firstName, lastName, organization, phone, email, url, address } = contact

    if (!firstName && !lastName && !organization) {
      return {
        success: false,
        error: 'At least one of first name, last name, or organization is required'
      }
    }

    // Build vCard format
    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n'
    
    if (firstName || lastName) {
      const fullName = `${firstName || ''} ${lastName || ''}`.trim()
      vcard += `FN:${fullName}\n`
      vcard += `N:${lastName || ''};${firstName || ''};;;\n`
    }

    if (organization) {
      vcard += `ORG:${organization}\n`
    }

    if (phone) {
      vcard += `TEL:${phone}\n`
    }

    if (email) {
      vcard += `EMAIL:${email}\n`
    }

    if (url) {
      vcard += `URL:${url}\n`
    }

    if (address) {
      vcard += `ADR:;;${address};;;;\n`
    }

    vcard += 'END:VCARD'

    return await generateQRCode(vcard, options)
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'vCard QR Code generation failed'
    }
  }
}

/**
 * Get QR Code capacity information
 */
export function getQRCodeCapacity(errorCorrectionLevel: QRCodeErrorCorrectionLevel): {
  numeric: number
  alphanumeric: number
  binary: number
} {
  // Approximate capacity for different error correction levels (Version 40 - largest)
  const capacities = {
    L: { numeric: 7089, alphanumeric: 4296, binary: 2953 },
    M: { numeric: 5596, alphanumeric: 3391, binary: 2331 },
    Q: { numeric: 3993, alphanumeric: 2420, binary: 1663 },
    H: { numeric: 3057, alphanumeric: 1852, binary: 1273 }
  }

  return capacities[errorCorrectionLevel]
}

/**
 * Estimate QR Code version needed for text
 */
export function estimateQRCodeVersion(text: string): number {
  const length = text.length
  
  // Rough estimation based on text length
  if (length <= 25) return 1
  if (length <= 47) return 2
  if (length <= 77) return 3
  if (length <= 114) return 4
  if (length <= 154) return 5
  if (length <= 195) return 6
  if (length <= 224) return 7
  if (length <= 279) return 8
  if (length <= 335) return 9
  if (length <= 395) return 10
  
  // For longer texts, use a rough formula
  return Math.min(40, Math.ceil(length / 40))
}