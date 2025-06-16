export interface JSONFormatterResult {
  success: boolean
  result?: string
  error?: string
  stats?: {
    size: number
    originalSize: number
    compressionRatio?: number
    lines: number
    characters: number
    objects: number
    arrays: number
    keys: number
  }
}

export interface JSONValidationError {
  line: number
  column: number
  message: string
}

export interface JSONValidationResult {
  isValid: boolean
  errors: JSONValidationError[]
  parsed?: unknown
}

// Format JSON with proper indentation
export function formatJSON(input: string, indent: number = 2): JSONFormatterResult {
  try {
    if (!input.trim()) {
      return {
        success: true,
        result: '',
        stats: {
          size: 0,
          originalSize: 0,
          lines: 0,
          characters: 0,
          objects: 0,
          arrays: 0,
          keys: 0
        }
      }
    }

    // Parse and format the JSON
    const parsed = JSON.parse(input)
    const formatted = JSON.stringify(parsed, null, indent)
    
    // Calculate statistics
    const stats = calculateJSONStats(formatted, input, parsed)
    
    return {
      success: true,
      result: formatted,
      stats
    }
  } catch (error) {
    return {
      success: false,
      error: getJSONErrorMessage(error, input)
    }
  }
}

// Minify JSON by removing whitespace
export function minifyJSON(input: string): JSONFormatterResult {
  try {
    if (!input.trim()) {
      return {
        success: true,
        result: '',
        stats: {
          size: 0,
          originalSize: 0,
          lines: 0,
          characters: 0,
          objects: 0,
          arrays: 0,
          keys: 0
        }
      }
    }

    const parsed = JSON.parse(input)
    const minified = JSON.stringify(parsed)
    
    // Calculate statistics
    const stats = calculateJSONStats(minified, input, parsed)
    
    return {
      success: true,
      result: minified,
      stats
    }
  } catch (error) {
    return {
      success: false,
      error: getJSONErrorMessage(error, input)
    }
  }
}

// Validate JSON syntax
export function validateJSON(input: string): JSONValidationResult {
  try {
    if (!input.trim()) {
      return {
        isValid: true,
        errors: [],
        parsed: null
      }
    }

    const parsed = JSON.parse(input)
    return {
      isValid: true,
      errors: [],
      parsed
    }
  } catch (error) {
    const errors = parseJSONError(error as Error, input)
    return {
      isValid: false,
      errors,
      parsed: null
    }
  }
}

// Sort JSON keys alphabetically
export function sortJSONKeys(input: string, indent: number = 2): JSONFormatterResult {
  try {
    if (!input.trim()) {
      return {
        success: true,
        result: '',
        stats: {
          size: 0,
          originalSize: 0,
          lines: 0,
          characters: 0,
          objects: 0,
          arrays: 0,
          keys: 0
        }
      }
    }

    const parsed = JSON.parse(input)
    const sorted = sortObjectKeys(parsed)
    const formatted = JSON.stringify(sorted, null, indent)
    
    // Calculate statistics
    const stats = calculateJSONStats(formatted, input, sorted)
    
    return {
      success: true,
      result: formatted,
      stats
    }
  } catch (error) {
    return {
      success: false,
      error: getJSONErrorMessage(error, input)
    }
  }
}

// Recursively sort object keys
function sortObjectKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }
  
  const sortedObj: Record<string, unknown> = {}
  const keys = Object.keys(obj as Record<string, unknown>).sort()
  
  for (const key of keys) {
    sortedObj[key] = sortObjectKeys((obj as Record<string, unknown>)[key])
  }
  
  return sortedObj
}

// Calculate JSON statistics
function calculateJSONStats(result: string, original: string, parsed: unknown) {
  const lines = result.split('\n').length
  const characters = result.length
  const originalSize = new Blob([original]).size
  const newSize = new Blob([result]).size
  const compressionRatio = originalSize > 0 ? ((originalSize - newSize) / originalSize) * 100 : 0
  
  // Count objects, arrays, and keys
  const counts = countJSONElements(parsed)
  
  return {
    size: newSize,
    originalSize,
    compressionRatio: compressionRatio > 0 ? compressionRatio : undefined,
    lines,
    characters,
    ...counts
  }
}

// Count JSON elements recursively
function countJSONElements(obj: unknown): { objects: number, arrays: number, keys: number } {
  let objects = 0
  let arrays = 0
  let keys = 0
  
  function count(value: unknown) {
    if (value === null || typeof value !== 'object') {
      return
    }
    
    if (Array.isArray(value)) {
      arrays++
      value.forEach(count)
    } else {
      objects++
      const objectKeys = Object.keys(value as Record<string, unknown>)
      keys += objectKeys.length
      objectKeys.forEach(key => count((value as Record<string, unknown>)[key]))
    }
  }
  
  count(obj)
  return { objects, arrays, keys }
}

// Get user-friendly error message
function getJSONErrorMessage(error: unknown, input: string): string {
  if (error instanceof SyntaxError) {
    const match = error.message.match(/at position (\d+)/)
    if (match) {
      const position = parseInt(match[1])
      const { line, column } = getLineAndColumn(input, position)
      return `Syntax error at line ${line}, column ${column}: ${error.message}`
    }
  }
  
  return (error as Error)?.message || 'Invalid JSON format'
}

// Parse JSON error to get line and column information
function parseJSONError(error: Error, input: string): JSONValidationError[] {
  const errors: JSONValidationError[] = []
  
  if (error instanceof SyntaxError) {
    const match = error.message.match(/at position (\d+)/)
    if (match) {
      const position = parseInt(match[1])
      const { line, column } = getLineAndColumn(input, position)
      errors.push({
        line,
        column,
        message: error.message
      })
    } else {
      errors.push({
        line: 1,
        column: 1,
        message: error.message
      })
    }
  }
  
  return errors
}

// Convert character position to line and column
function getLineAndColumn(text: string, position: number): { line: number, column: number } {
  const lines = text.substring(0, position).split('\n')
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1
  }
}

// Escape JSON string for display
export function escapeJSONString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

// Remove comments from JSON-like text (non-standard but commonly used)
export function removeJSONComments(input: string): string {
  // Remove single-line comments (// ...)
  let result = input.replace(/\/\/.*$/gm, '')
  
  // Remove multi-line comments (/* ... */)
  result = result.replace(/\/\*[\s\S]*?\*\//g, '')
  
  // Clean up any trailing commas (also non-standard but common)
  result = result.replace(/,(\s*[}\]])/g, '$1')
  
  return result
}

// Try to fix common JSON issues
export function tryFixJSON(input: string): string {
  let fixed = input
  
  // Remove comments
  fixed = removeJSONComments(fixed)
  
  // Add quotes to unquoted keys
  fixed = fixed.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
  
  // Fix single quotes to double quotes
  fixed = fixed.replace(/'/g, '"')
  
  // Remove trailing commas
  fixed = fixed.replace(/,(\s*[}\]])/g, '$1')
  
  return fixed
}

// Pretty print JSON with syntax highlighting info
export function getJSONTokens(input: string): Array<{ type: string, value: string, start: number, end: number }> {
  const tokens: Array<{ type: string, value: string, start: number, end: number }> = []
  let position = 0
  
  const patterns = [
    { type: 'string', regex: /"(?:[^"\\]|\\.)*"/ },
    { type: 'number', regex: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/ },
    { type: 'boolean', regex: /\b(?:true|false)\b/ },
    { type: 'null', regex: /\bnull\b/ },
    { type: 'punctuation', regex: /[{}[\],:]/ },
    { type: 'whitespace', regex: /\s+/ }
  ]
  
  while (position < input.length) {
    let matched = false
    
    for (const pattern of patterns) {
      const regex = new RegExp(pattern.regex.source, 'y')
      regex.lastIndex = position
      const match = regex.exec(input)
      
      if (match) {
        tokens.push({
          type: pattern.type,
          value: match[0],
          start: position,
          end: position + match[0].length
        })
        position += match[0].length
        matched = true
        break
      }
    }
    
    if (!matched) {
      // Skip unknown character
      position++
    }
  }
  
  return tokens
}