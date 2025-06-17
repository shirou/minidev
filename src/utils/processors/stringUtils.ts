/**
 * String processing utility functions
 */

export interface StringProcessResult {
  success: boolean
  result?: string
  error?: string
}

/**
 * Trim whitespace from text
 */
export function trimText(text: string, type: 'both' | 'start' | 'end' = 'both'): StringProcessResult {
  try {
    let result: string
    
    switch (type) {
      case 'start':
        result = text.trimStart()
        break
      case 'end':
        result = text.trimEnd()
        break
      case 'both':
      default:
        result = text.trim()
        break
    }
    
    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Trim failed'
    }
  }
}

/**
 * Remove extra whitespace (multiple spaces, tabs, newlines)
 */
export function removeExtraWhitespace(text: string): StringProcessResult {
  try {
    const result = text.replace(/\s+/g, ' ').trim()
    
    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Whitespace removal failed'
    }
  }
}

/**
 * Replace text with find and replace
 */
export function replaceText(
  text: string, 
  searchText: string, 
  replaceWith: string, 
  options: {
    caseSensitive?: boolean
    wholeWordsOnly?: boolean
    useRegex?: boolean
    replaceAll?: boolean
  } = {}
): StringProcessResult {
  try {
    const { caseSensitive = true, wholeWordsOnly = false, useRegex = false, replaceAll = true } = options
    
    if (!searchText) {
      return {
        success: false,
        error: 'Search text cannot be empty'
      }
    }
    
    let result: string
    
    if (useRegex) {
      try {
        const flags = caseSensitive ? (replaceAll ? 'g' : '') : (replaceAll ? 'gi' : 'i')
        const regex = new RegExp(searchText, flags)
        result = text.replace(regex, replaceWith)
      } catch (regexError) {
        return {
          success: false,
          error: 'Invalid regular expression'
        }
      }
    } else {
      let searchPattern = escapeRegExp(searchText)
      
      if (wholeWordsOnly) {
        searchPattern = `\\b${searchPattern}\\b`
      }
      
      const flags = caseSensitive ? (replaceAll ? 'g' : '') : (replaceAll ? 'gi' : 'i')
      const regex = new RegExp(searchPattern, flags)
      result = text.replace(regex, replaceWith)
    }
    
    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Replace failed'
    }
  }
}

/**
 * Split text by delimiter
 */
export function splitText(
  text: string, 
  delimiter: string, 
  options: {
    useRegex?: boolean
    removeEmpty?: boolean
    trimResults?: boolean
  } = {}
): StringProcessResult {
  try {
    const { useRegex = false, removeEmpty = false, trimResults = false } = options
    
    if (!delimiter) {
      return {
        success: false,
        error: 'Delimiter cannot be empty'
      }
    }
    
    let parts: string[]
    
    if (useRegex) {
      try {
        const regex = new RegExp(delimiter)
        parts = text.split(regex)
      } catch (regexError) {
        return {
          success: false,
          error: 'Invalid regular expression'
        }
      }
    } else {
      parts = text.split(delimiter)
    }
    
    if (trimResults) {
      parts = parts.map(part => part.trim())
    }
    
    if (removeEmpty) {
      parts = parts.filter(part => part.length > 0)
    }
    
    return {
      success: true,
      result: parts.join('\n')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Split failed'
    }
  }
}

/**
 * Join lines with delimiter
 */
export function joinLines(text: string, delimiter: string = ' '): StringProcessResult {
  try {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
    const result = lines.join(delimiter)
    
    return {
      success: true,
      result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Join failed'
    }
  }
}

/**
 * Remove duplicate lines
 */
export function removeDuplicateLines(text: string, caseSensitive: boolean = true): StringProcessResult {
  try {
    const lines = text.split('\n')
    const seen = new Set<string>()
    const uniqueLines: string[] = []
    
    lines.forEach(line => {
      const key = caseSensitive ? line : line.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        uniqueLines.push(line)
      }
    })
    
    return {
      success: true,
      result: uniqueLines.join('\n')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Duplicate removal failed'
    }
  }
}

/**
 * Sort lines
 */
export function sortLines(
  text: string, 
  options: {
    direction?: 'asc' | 'desc'
    caseSensitive?: boolean
    numeric?: boolean
    removeEmpty?: boolean
  } = {}
): StringProcessResult {
  try {
    const { direction = 'asc', caseSensitive = true, numeric = false, removeEmpty = false } = options
    
    let lines = text.split('\n')
    
    if (removeEmpty) {
      lines = lines.filter(line => line.trim().length > 0)
    }
    
    lines.sort((a, b) => {
      let comparison = 0
      
      if (numeric) {
        const numA = parseFloat(a)
        const numB = parseFloat(b)
        
        if (!isNaN(numA) && !isNaN(numB)) {
          comparison = numA - numB
        } else {
          // Fall back to string comparison for non-numeric values
          comparison = caseSensitive ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase())
        }
      } else {
        comparison = caseSensitive ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase())
      }
      
      return direction === 'desc' ? -comparison : comparison
    })
    
    return {
      success: true,
      result: lines.join('\n')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sort failed'
    }
  }
}

/**
 * Add line numbers
 */
export function addLineNumbers(
  text: string, 
  options: {
    startFrom?: number
    padZeros?: boolean
    separator?: string
  } = {}
): StringProcessResult {
  try {
    const { startFrom = 1, padZeros = false, separator = '. ' } = options
    
    const lines = text.split('\n')
    const maxLineNumber = startFrom + lines.length - 1
    const padding = padZeros ? maxLineNumber.toString().length : 0
    
    const numberedLines = lines.map((line, index) => {
      const lineNumber = startFrom + index
      const paddedNumber = padZeros ? lineNumber.toString().padStart(padding, '0') : lineNumber.toString()
      return `${paddedNumber}${separator}${line}`
    })
    
    return {
      success: true,
      result: numberedLines.join('\n')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Line numbering failed'
    }
  }
}

/**
 * Prefix/suffix each line
 */
export function addPrefixSuffix(
  text: string, 
  prefix: string = '', 
  suffix: string = ''
): StringProcessResult {
  try {
    const lines = text.split('\n')
    const modifiedLines = lines.map(line => `${prefix}${line}${suffix}`)
    
    return {
      success: true,
      result: modifiedLines.join('\n')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Prefix/suffix addition failed'
    }
  }
}

/**
 * Extract specific columns (by delimiter)
 */
export function extractColumns(
  text: string, 
  delimiter: string, 
  columnIndices: number[]
): StringProcessResult {
  try {
    if (!delimiter) {
      return {
        success: false,
        error: 'Delimiter cannot be empty'
      }
    }
    
    if (columnIndices.length === 0) {
      return {
        success: false,
        error: 'At least one column index must be specified'
      }
    }
    
    const lines = text.split('\n')
    const extractedLines: string[] = []
    
    lines.forEach(line => {
      const columns = line.split(delimiter)
      const extractedColumns: string[] = []
      
      columnIndices.forEach(index => {
        // Convert to 0-based index
        const columnIndex = index - 1
        if (columnIndex >= 0 && columnIndex < columns.length) {
          extractedColumns.push(columns[columnIndex])
        } else {
          extractedColumns.push('') // Empty for missing columns
        }
      })
      
      extractedLines.push(extractedColumns.join(delimiter))
    })
    
    return {
      success: true,
      result: extractedLines.join('\n')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Column extraction failed'
    }
  }
}

/**
 * Escape special characters in string for use in regular expression
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Get line statistics
 */
export function getLineStats(text: string): {
  totalLines: number
  emptyLines: number
  nonEmptyLines: number
  longestLine: number
  shortestLine: number
  averageLineLength: number
} {
  const lines = text.split('\n')
  const nonEmptyLines = lines.filter(line => line.trim().length > 0)
  const lineLengths = lines.map(line => line.length)
  
  return {
    totalLines: lines.length,
    emptyLines: lines.length - nonEmptyLines.length,
    nonEmptyLines: nonEmptyLines.length,
    longestLine: lineLengths.length > 0 ? Math.max(...lineLengths) : 0,
    shortestLine: lineLengths.length > 0 ? Math.min(...lineLengths) : 0,
    averageLineLength: lineLengths.length > 0 ? lineLengths.reduce((a, b) => a + b, 0) / lineLengths.length : 0
  }
}