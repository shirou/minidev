export interface UnixTimeConversionResult {
  success: boolean
  result?: string | number
  error?: string
}

export interface DateTimeComponents {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export type TimePrecision = 'seconds' | 'milliseconds' | 'microseconds'

export function convertToUnixTime(dateInput: string): UnixTimeConversionResult {
  try {
    const date = new Date(dateInput)
    
    if (isNaN(date.getTime())) {
      return {
        success: false,
        error: 'Invalid date format'
      }
    }
    
    const unixTimestamp = Math.floor(date.getTime() / 1000)
    
    return {
      success: true,
      result: unixTimestamp
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export function convertFromUnixTime(unixTimestamp: string | number, precision: TimePrecision = 'seconds'): UnixTimeConversionResult {
  try {
    const timestamp = typeof unixTimestamp === 'string' ? parseFloat(unixTimestamp) : unixTimestamp
    
    if (isNaN(timestamp)) {
      return {
        success: false,
        error: 'Invalid Unix timestamp'
      }
    }
    
    let timestampMs: number
    
    switch (precision) {
      case 'seconds':
        timestampMs = timestamp * 1000
        break
      case 'milliseconds':
        timestampMs = timestamp
        break
      case 'microseconds':
        timestampMs = timestamp / 1000
        break
      default:
        timestampMs = timestamp * 1000
    }
    
    const date = new Date(timestampMs)
    
    if (isNaN(date.getTime())) {
      return {
        success: false,
        error: 'Invalid Unix timestamp'
      }
    }
    
    return {
      success: true,
      result: date.toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export function getCurrentUnixTime(precision: TimePrecision = 'seconds'): number {
  const now = Date.now()
  
  switch (precision) {
    case 'seconds':
      return Math.floor(now / 1000)
    case 'milliseconds':
      return now
    case 'microseconds':
      return now * 1000
    default:
      return Math.floor(now / 1000)
  }
}

export function convertDateTimeComponentsToUnixTime(
  components: DateTimeComponents, 
  precision: TimePrecision = 'seconds'
): UnixTimeConversionResult {
  try {
    const { year, month, day, hour, minute, second } = components
    
    // Validate components
    if (year < 1970 || year > 2100) {
      return { success: false, error: 'Year must be between 1970 and 2100' }
    }
    if (month < 1 || month > 12) {
      return { success: false, error: 'Month must be between 1 and 12' }
    }
    if (day < 1 || day > 31) {
      return { success: false, error: 'Day must be between 1 and 31' }
    }
    if (hour < 0 || hour > 23) {
      return { success: false, error: 'Hour must be between 0 and 23' }
    }
    if (minute < 0 || minute > 59) {
      return { success: false, error: 'Minute must be between 0 and 59' }
    }
    if (second < 0 || second > 59) {
      return { success: false, error: 'Second must be between 0 and 59' }
    }
    
    const date = new Date(year, month - 1, day, hour, minute, second)
    
    if (isNaN(date.getTime())) {
      return { success: false, error: 'Invalid date' }
    }
    
    const timestampMs = date.getTime()
    let result: number
    
    switch (precision) {
      case 'seconds':
        result = Math.floor(timestampMs / 1000)
        break
      case 'milliseconds':
        result = timestampMs
        break
      case 'microseconds':
        result = timestampMs * 1000
        break
      default:
        result = Math.floor(timestampMs / 1000)
    }
    
    return { success: true, result }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export function convertUnixTimeToDateTimeComponents(
  unixTimestamp: number,
  precision: TimePrecision = 'seconds'
): DateTimeComponents | null {
  try {
    let timestampMs: number
    
    switch (precision) {
      case 'seconds':
        timestampMs = unixTimestamp * 1000
        break
      case 'milliseconds':
        timestampMs = unixTimestamp
        break
      case 'microseconds':
        timestampMs = unixTimestamp / 1000
        break
      default:
        timestampMs = unixTimestamp * 1000
    }
    
    const date = new Date(timestampMs)
    
    if (isNaN(date.getTime())) {
      return null
    }
    
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  } catch {
    return null
  }
}

export function formatDateString(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

export function parseMultipleDateFormats(input: string): Date | null {
  // Try various date formats
  const formats = [
    // ISO formats
    input,
    // Add 'T' if missing between date and time
    input.replace(' ', 'T'),
    // Add timezone if missing
    input.includes('T') && !input.includes('Z') && !input.includes('+') && !input.includes('-') 
      ? input + 'Z' 
      : input
  ]
  
  for (const format of formats) {
    const date = new Date(format)
    if (!isNaN(date.getTime())) {
      return date
    }
  }
  
  return null
}