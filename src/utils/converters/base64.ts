export interface Base64ConversionResult {
  success: boolean
  result?: string
  error?: string
}

export function encodeToBase64(input: string): Base64ConversionResult {
  try {
    if (input === '') {
      return {
        success: true,
        result: ''
      }
    }
    
    const encoded = btoa(unescape(encodeURIComponent(input)))
    
    return {
      success: true,
      result: encoded
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export function decodeFromBase64(input: string): Base64ConversionResult {
  try {
    if (input === '') {
      return {
        success: true,
        result: ''
      }
    }
    
    // Remove any whitespace or line breaks
    const cleanInput = input.replace(/\s/g, '')
    
    // Validate base64 format
    if (!isValidBase64(cleanInput)) {
      return {
        success: false,
        error: 'Invalid Base64 format'
      }
    }
    
    const decoded = decodeURIComponent(escape(atob(cleanInput)))
    
    return {
      success: true,
      result: decoded
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid Base64 string'
    }
  }
}

export function isValidBase64(str: string): boolean {
  try {
    // Base64 regex pattern
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
    
    // Check if string matches base64 pattern
    if (!base64Regex.test(str)) {
      return false
    }
    
    // Check length (must be multiple of 4)
    if (str.length % 4 !== 0) {
      return false
    }
    
    // Try to decode to verify it's valid
    atob(str)
    return true
  } catch {
    return false
  }
}

export function encodeFileToBase64(file: File): Promise<Base64ConversionResult> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      try {
        const result = reader.result as string
        // Remove the data URL prefix (e.g., "data:image/png;base64,")
        const base64 = result.split(',')[1] || result
        
        resolve({
          success: true,
          result: base64
        })
      } catch (error) {
        resolve({
          success: false,
          error: error instanceof Error ? error.message : 'Failed to encode file'
        })
      }
    }
    
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read file'
      })
    }
    
    reader.readAsDataURL(file)
  })
}

export function downloadBase64AsFile(base64: string, filename: string, mimeType: string = 'application/octet-stream') {
  try {
    // Convert base64 to blob
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: mimeType })
    
    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to download file'
    }
  }
}

export function getBase64FileInfo(base64: string): {
  size: number
  sizeFormatted: string
} {
  try {
    // Calculate approximate file size
    const padding = (base64.match(/=/g) || []).length
    const sizeInBytes = (base64.length * 3) / 4 - padding
    
    return {
      size: sizeInBytes,
      sizeFormatted: formatFileSize(sizeInBytes)
    }
  } catch {
    return {
      size: 0,
      sizeFormatted: '0 B'
    }
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}