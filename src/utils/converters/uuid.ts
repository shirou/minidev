export interface UUIDGenerationResult {
  success: boolean
  result?: string
  error?: string
}

export interface UUIDInfo {
  version: number
  variant: string
  timestamp?: string
  node?: string
  clockSequence?: number
}

// Helper function to generate random bytes
function randomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length))
}

// Helper function to convert bytes to hex string
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// Helper function to get MAC address (simulated for browser)
function getMACAddress(): string {
  // Generate a random MAC address for browser environment
  const mac = randomBytes(6)
  mac[0] |= 0x02 // Set local bit
  mac[0] &= 0xfe // Clear universal bit
  return bytesToHex(mac)
}

// Helper function to get current timestamp in UUID v1 format
function getUUIDv1Timestamp(): { timestamp: bigint, clockSeq: number } {
  // UUID v1 timestamp: 100-nanosecond intervals since Oct 15, 1582
  const uuidEpoch = BigInt(Date.UTC(1582, 9, 15)) * 10000n
  const now = BigInt(Date.now()) * 10000n + uuidEpoch
  const clockSeq = Math.floor(Math.random() * 0x4000)
  return { timestamp: now, clockSeq }
}

// Generate UUID v1 (Time-based)
export function generateUUIDv1(): UUIDGenerationResult {
  try {
    const { timestamp, clockSeq } = getUUIDv1Timestamp()
    const mac = getMACAddress()
    
    // Split timestamp into parts
    const timeLow = Number(timestamp & 0xffffffffn)
    const timeMid = Number((timestamp >> 32n) & 0xffffn)
    const timeHigh = Number((timestamp >> 48n) & 0xfffn) | 0x1000 // Version 1
    
    const uuid = [
      timeLow.toString(16).padStart(8, '0'),
      timeMid.toString(16).padStart(4, '0'),
      timeHigh.toString(16).padStart(4, '0'),
      ((clockSeq >> 8) | 0x80).toString(16).padStart(2, '0') + (clockSeq & 0xff).toString(16).padStart(2, '0'),
      mac
    ].join('-')
    
    return { success: true, result: uuid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate UUID v1'
    }
  }
}

// Generate UUID v2 (DCE Security) - Simplified implementation
export function generateUUIDv2(): UUIDGenerationResult {
  try {
    // UUID v2 is rarely used and complex to implement properly
    // This is a simplified version based on v1 with domain/id replacement
    const { timestamp, clockSeq } = getUUIDv1Timestamp()
    const mac = getMACAddress()
    const localDomain = 0 // POSIX UID domain
    const localId = Math.floor(Math.random() * 0xffffffff)
    
    const timeLow = localId // Replace time_low with local ID
    const timeMid = Number((timestamp >> 32n) & 0xffffn)
    const timeHigh = Number((timestamp >> 48n) & 0xfffn) | 0x2000 // Version 2
    
    const uuid = [
      timeLow.toString(16).padStart(8, '0'),
      timeMid.toString(16).padStart(4, '0'),
      timeHigh.toString(16).padStart(4, '0'),
      ((clockSeq >> 8) | 0x80).toString(16).padStart(2, '0') + localDomain.toString(16).padStart(2, '0'),
      mac
    ].join('-')
    
    return { success: true, result: uuid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate UUID v2'
    }
  }
}

// Generate UUID v3 (Name-based using MD5)
export async function generateUUIDv3(namespace: string, name: string): Promise<UUIDGenerationResult> {
  try {
    // Convert namespace UUID to bytes
    const nsBytes = hexToBytes(namespace.replace(/-/g, ''))
    const nameBytes = new TextEncoder().encode(name)
    
    // Concatenate namespace and name
    const data = new Uint8Array(nsBytes.length + nameBytes.length)
    data.set(nsBytes)
    data.set(nameBytes, nsBytes.length)
    
    // Generate MD5 hash
    const hashBuffer = await crypto.subtle.digest('MD5', data)
    const hash = new Uint8Array(hashBuffer)
    
    // Set version (4 bits) and variant (2 bits)
    hash[6] = (hash[6] & 0x0f) | 0x30 // Version 3
    hash[8] = (hash[8] & 0x3f) | 0x80 // Variant 10
    
    const uuid = [
      bytesToHex(hash.slice(0, 4)),
      bytesToHex(hash.slice(4, 6)),
      bytesToHex(hash.slice(6, 8)),
      bytesToHex(hash.slice(8, 10)),
      bytesToHex(hash.slice(10, 16))
    ].join('-')
    
    return { success: true, result: uuid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate UUID v3'
    }
  }
}

// Generate UUID v4 (Random)
export function generateUUIDv4(): UUIDGenerationResult {
  try {
    // Use built-in crypto.randomUUID if available
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return { success: true, result: crypto.randomUUID() }
    }
    
    // Fallback implementation
    const bytes = randomBytes(16)
    
    // Set version (4 bits) and variant (2 bits)
    bytes[6] = (bytes[6] & 0x0f) | 0x40 // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80 // Variant 10
    
    const uuid = [
      bytesToHex(bytes.slice(0, 4)),
      bytesToHex(bytes.slice(4, 6)),
      bytesToHex(bytes.slice(6, 8)),
      bytesToHex(bytes.slice(8, 10)),
      bytesToHex(bytes.slice(10, 16))
    ].join('-')
    
    return { success: true, result: uuid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate UUID v4'
    }
  }
}

// Generate UUID v5 (Name-based using SHA-1)
export async function generateUUIDv5(namespace: string, name: string): Promise<UUIDGenerationResult> {
  try {
    // Convert namespace UUID to bytes
    const nsBytes = hexToBytes(namespace.replace(/-/g, ''))
    const nameBytes = new TextEncoder().encode(name)
    
    // Concatenate namespace and name
    const data = new Uint8Array(nsBytes.length + nameBytes.length)
    data.set(nsBytes)
    data.set(nameBytes, nsBytes.length)
    
    // Generate SHA-1 hash
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hash = new Uint8Array(hashBuffer)
    
    // Set version (4 bits) and variant (2 bits)
    hash[6] = (hash[6] & 0x0f) | 0x50 // Version 5
    hash[8] = (hash[8] & 0x3f) | 0x80 // Variant 10
    
    const uuid = [
      bytesToHex(hash.slice(0, 4)),
      bytesToHex(hash.slice(4, 6)),
      bytesToHex(hash.slice(6, 8)),
      bytesToHex(hash.slice(8, 10)),
      bytesToHex(hash.slice(10, 16))
    ].join('-')
    
    return { success: true, result: uuid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate UUID v5'
    }
  }
}

// Generate UUID v6 (Reordered Time-based)
export function generateUUIDv6(): UUIDGenerationResult {
  try {
    const { timestamp, clockSeq } = getUUIDv1Timestamp()
    const mac = getMACAddress()
    
    // Reorder timestamp for better database performance
    const timeHigh = Number((timestamp >> 28n) & 0xffffffffn)
    const timeMid = Number((timestamp >> 12n) & 0xffffn)
    const timeLow = Number(timestamp & 0xfffn) | 0x6000 // Version 6
    
    const uuid = [
      timeHigh.toString(16).padStart(8, '0'),
      timeMid.toString(16).padStart(4, '0'),
      timeLow.toString(16).padStart(4, '0'),
      ((clockSeq >> 8) | 0x80).toString(16).padStart(2, '0') + (clockSeq & 0xff).toString(16).padStart(2, '0'),
      mac
    ].join('-')
    
    return { success: true, result: uuid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate UUID v6'
    }
  }
}

// Generate UUID v7 (Unix Epoch Time-based)
export function generateUUIDv7(): UUIDGenerationResult {
  try {
    const timestamp = Date.now()
    const randomA = Math.floor(Math.random() * 0x1000) // 12 bits
    const randomB = randomBytes(8)
    
    // Set version and variant
    const versionAndRandom = (0x7000 | randomA) // Version 7 + 12 random bits
    randomB[0] = (randomB[0] & 0x3f) | 0x80 // Variant 10
    
    const uuid = [
      Math.floor(timestamp / 1000).toString(16).padStart(8, '0'),
      (timestamp & 0xfff).toString(16).padStart(4, '0'),
      versionAndRandom.toString(16).padStart(4, '0'),
      bytesToHex(randomB.slice(0, 2)),
      bytesToHex(randomB.slice(2, 8))
    ].join('-')
    
    return { success: true, result: uuid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate UUID v7'
    }
  }
}

// Helper function to convert hex string to bytes
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
  }
  return bytes
}

// Parse UUID and extract information
export function parseUUID(uuid: string): UUIDInfo {
  const cleanUuid = uuid.replace(/-/g, '')
  
  if (cleanUuid.length !== 32) {
    throw new Error('Invalid UUID format')
  }
  
  const version = parseInt(cleanUuid.charAt(12), 16)
  const variant = parseInt(cleanUuid.charAt(16), 16)
  
  let variantStr = 'Unknown'
  if ((variant & 0x8) === 0) variantStr = 'NCS'
  else if ((variant & 0xc) === 0x8) variantStr = 'RFC 4122'
  else if ((variant & 0xe) === 0xc) variantStr = 'Microsoft'
  else variantStr = 'Future'
  
  const info: UUIDInfo = {
    version,
    variant: variantStr
  }
  
  // Add version-specific information
  if (version === 1 || version === 6) {
    const timeLow = parseInt(cleanUuid.substr(0, 8), 16)
    const timeMid = parseInt(cleanUuid.substr(8, 4), 16)
    const timeHigh = parseInt(cleanUuid.substr(12, 4), 16) & 0x0fff
    
    let timestamp: bigint
    if (version === 1) {
      timestamp = BigInt(timeHigh) << 48n | BigInt(timeMid) << 32n | BigInt(timeLow)
    } else {
      // v6 reordered
      const timeHighV6 = parseInt(cleanUuid.substr(0, 8), 16)
      const timeMidV6 = parseInt(cleanUuid.substr(8, 4), 16)
      const timeLowV6 = parseInt(cleanUuid.substr(12, 4), 16) & 0x0fff
      timestamp = BigInt(timeHighV6) << 28n | BigInt(timeMidV6) << 12n | BigInt(timeLowV6)
    }
    
    const uuidEpoch = BigInt(Date.UTC(1582, 9, 15)) * 10000n
    const jsTimestamp = (timestamp - uuidEpoch) / 10000n
    info.timestamp = new Date(Number(jsTimestamp)).toISOString()
    info.node = cleanUuid.substr(20, 12)
    info.clockSequence = parseInt(cleanUuid.substr(16, 4), 16) & 0x3fff
  } else if (version === 7) {
    const timestampHex = cleanUuid.substr(0, 12)
    const timestamp = parseInt(timestampHex.substr(0, 8), 16) * 1000 + parseInt(timestampHex.substr(8, 4), 16)
    info.timestamp = new Date(timestamp).toISOString()
  }
  
  return info
}

// Validate UUID format
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Common namespace UUIDs
export const NAMESPACE_DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
export const NAMESPACE_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8'
export const NAMESPACE_OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8'
export const NAMESPACE_X500 = '6ba7b814-9dad-11d1-80b4-00c04fd430c8'