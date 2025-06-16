export interface SqlFormatResult {
  success: boolean
  result?: string
  error?: string
}

export interface SqlFormatOptions {
  indentSize: number
  keywordCase: 'upper' | 'lower' | 'preserve'
  breakBeforeKeywords: boolean
  breakAfterComma: boolean
  maxLineLength: number
}

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER',
  'GROUP', 'BY', 'ORDER', 'HAVING', 'UNION', 'INSERT', 'UPDATE', 'DELETE',
  'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'VIEW', 'DATABASE',
  'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
  'AS', 'ON', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IF', 'DISTINCT',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'TOP', 'LIMIT', 'OFFSET'
]

export function formatSql(sqlString: string, options: SqlFormatOptions): SqlFormatResult {
  try {
    if (!sqlString.trim()) {
      return {
        success: false,
        error: 'SQL input is empty'
      }
    }

    let formatted = sqlString
    
    // Normalize whitespace
    formatted = formatted.replace(/\s+/g, ' ').trim()
    
    // Apply keyword case transformation
    if (options.keywordCase !== 'preserve') {
      formatted = transformKeywordCase(formatted, options.keywordCase)
    }
    
    // Apply formatting rules
    formatted = applyFormatting(formatted, options)
    
    return {
      success: true,
      result: formatted
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

function transformKeywordCase(sql: string, keywordCase: 'upper' | 'lower'): string {
  let result = sql
  
  SQL_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
    result = result.replace(regex, (match) => {
      return keywordCase === 'upper' ? match.toUpperCase() : match.toLowerCase()
    })
  })
  
  return result
}

function applyFormatting(sql: string, options: SqlFormatOptions): string {
  const indent = ' '.repeat(options.indentSize)
  let formatted = sql
  let indentLevel = 0
  
  // Keywords that should start new lines
  const lineBreakKeywords = [
    'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING',
    'UNION', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP'
  ]
  
  // Keywords that increase indent
  const indentKeywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING']
  
  if (options.breakBeforeKeywords) {
    lineBreakKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      formatted = formatted.replace(regex, `\n${keyword}`)
    })
  }
  
  if (options.breakAfterComma) {
    formatted = formatted.replace(/,/g, ',\n')
  }
  
  // Split into lines and apply indentation
  const lines = formatted.split('\n')
  const result: string[] = []
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue
    
    // Check if line starts with a keyword that should reduce indent
    const startsWithKeyword = lineBreakKeywords.some(keyword => 
      trimmedLine.toUpperCase().startsWith(keyword.toUpperCase())
    )
    
    if (startsWithKeyword && indentLevel > 0) {
      indentLevel = Math.max(0, indentLevel - 1)
    }
    
    result.push(indent.repeat(indentLevel) + trimmedLine)
    
    // Check if line contains a keyword that should increase indent
    const containsIndentKeyword = indentKeywords.some(keyword => 
      trimmedLine.toUpperCase().includes(keyword.toUpperCase())
    )
    
    if (containsIndentKeyword) {
      indentLevel++
    }
  }
  
  return result.join('\n')
}

export function minifySql(sqlString: string): SqlFormatResult {
  try {
    if (!sqlString.trim()) {
      return {
        success: false,
        error: 'SQL input is empty'
      }
    }

    // Remove comments and extra whitespace
    let minified = sqlString
      .replace(/--.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
    
    return {
      success: true,
      result: minified
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export const DEFAULT_SQL_OPTIONS: SqlFormatOptions = {
  indentSize: 2,
  keywordCase: 'upper',
  breakBeforeKeywords: true,
  breakAfterComma: true,
  maxLineLength: 80
}