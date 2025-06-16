export interface XmlFormatResult {
  success: boolean
  result?: string
  error?: string
}

export interface XmlFormatOptions {
  indentSize: number
  indentType: 'spaces' | 'tabs'
  removeComments: boolean
  sortAttributes: boolean
}

export function formatXml(xmlString: string, options: XmlFormatOptions): XmlFormatResult {
  try {
    if (!xmlString.trim()) {
      return {
        success: false,
        error: 'XML input is empty'
      }
    }

    // Basic XML validation
    if (!isValidXml(xmlString)) {
      return {
        success: false,
        error: 'Invalid XML syntax'
      }
    }

    let formatted = xmlString
    
    // Remove comments if requested
    if (options.removeComments) {
      formatted = formatted.replace(/<!--[\s\S]*?-->/g, '')
    }
    
    // Basic formatting
    formatted = formatXmlString(formatted, options)
    
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

function isValidXml(xmlString: string): boolean {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, 'text/xml')
    const parseError = doc.querySelector('parsererror')
    return parseError === null
  } catch {
    return false
  }
}

function formatXmlString(xml: string, options: XmlFormatOptions): string {
  const indent = options.indentType === 'tabs' ? '\t' : ' '.repeat(options.indentSize)
  let formatted = ''
  let indentLevel = 0
  
  // Remove existing formatting
  xml = xml.replace(/>\s*</g, '><')
  
  // Split into tokens
  const tokens = xml.split(/(<[^>]*>)/g).filter(token => token.length > 0)
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    
    if (token.match(/^<\w[^>]*[^\/]>$/)) {
      // Opening tag
      formatted += indent.repeat(indentLevel) + token + '\n'
      indentLevel++
    } else if (token.match(/^<\/\w[^>]*>$/)) {
      // Closing tag
      indentLevel--
      formatted += indent.repeat(indentLevel) + token + '\n'
    } else if (token.match(/^<\w[^>]*\/>$/)) {
      // Self-closing tag
      formatted += indent.repeat(indentLevel) + token + '\n'
    } else if (token.match(/^<[!?]/)) {
      // Declaration, comment, or processing instruction
      formatted += indent.repeat(indentLevel) + token + '\n'
    } else if (token.trim()) {
      // Text content
      formatted += indent.repeat(indentLevel) + token.trim() + '\n'
    }
  }
  
  return formatted.trim()
}

export function minifyXml(xmlString: string): XmlFormatResult {
  try {
    if (!xmlString.trim()) {
      return {
        success: false,
        error: 'XML input is empty'
      }
    }

    if (!isValidXml(xmlString)) {
      return {
        success: false,
        error: 'Invalid XML syntax'
      }
    }

    // Remove whitespace between tags, comments, and unnecessary spaces
    let minified = xmlString
      .replace(/>\s+</g, '><')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
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

export const DEFAULT_XML_OPTIONS: XmlFormatOptions = {
  indentSize: 2,
  indentType: 'spaces',
  removeComments: false,
  sortAttributes: false
}