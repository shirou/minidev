export interface Tool {
  id: string
  name: string
  description: string
  category: string
  path: string
}

export const TOOL_CATEGORIES = {
  GENERATOR: 'Generator',
  CONVERTER: 'Converter', 
  FORMATTER: 'Formatter',
  ENCODER_DECODER: 'Encoder/Decoder',
  TEXT_TOOLS: 'Text Tools',
} as const

export const TOOLS: Tool[] = [
  {
    id: 'random-string',
    name: 'Random String Generator',
    description: 'Generate random strings with custom options',
    category: TOOL_CATEGORIES.GENERATOR,
    path: '/tools/random-string',
  },
  {
    id: 'json-to-yaml',
    name: 'JSON to YAML',
    description: 'Convert JSON format to YAML format',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/json-to-yaml',
  },
  {
    id: 'yaml-to-json',
    name: 'YAML to JSON',
    description: 'Convert YAML format to JSON format',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/yaml-to-json',
  },
  {
    id: 'to-unix-time',
    name: 'To Unix Time',
    description: 'Convert datetime to Unix timestamp',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/to-unix-time',
  },
  {
    id: 'from-unix-time',
    name: 'From Unix Time',
    description: 'Convert Unix timestamp to datetime',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/from-unix-time',
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and beautify XML code',
    category: TOOL_CATEGORIES.FORMATTER,
    path: '/tools/xml-formatter',
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL code',
    category: TOOL_CATEGORIES.FORMATTER,
    path: '/tools/sql-formatter',
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    description: 'Encode text and files to Base64',
    category: TOOL_CATEGORIES.ENCODER_DECODER,
    path: '/tools/base64-encoder',
  },
  {
    id: 'base64-decoder',
    name: 'Base64 Decoder',
    description: 'Decode Base64 strings to text and files',
    category: TOOL_CATEGORIES.ENCODER_DECODER,
    path: '/tools/base64-decoder',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUIDs of all versions (v1-v7)',
    category: TOOL_CATEGORIES.GENERATOR,
    path: '/tools/uuid-generator',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify, validate, and sort JSON data',
    category: TOOL_CATEGORIES.FORMATTER,
    path: '/tools/json-formatter',
  },
  {
    id: 'chmod-calculator',
    name: 'Chmod Calculator',
    description: 'Calculate Unix file permissions with visual interface',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/chmod-calculator',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    description: 'Encode text for safe use in URLs',
    category: TOOL_CATEGORIES.ENCODER_DECODER,
    path: '/tools/url-encoder',
  },
  {
    id: 'url-decoder',
    name: 'URL Decoder',
    description: 'Decode percent-encoded URLs to readable text',
    category: TOOL_CATEGORIES.ENCODER_DECODER,
    path: '/tools/url-decoder',
  },
  {
    id: 'html-encoder',
    name: 'HTML Encoder/Decoder',
    description: 'Encode and decode HTML special characters and entities',
    category: TOOL_CATEGORIES.ENCODER_DECODER,
    path: '/tools/html-encoder',
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between different naming conventions and case styles',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/case-converter',
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/number-base-converter',
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/temperature-converter',
  },
  {
    id: 'data-size-converter',
    name: 'Data Size Converter',
    description: 'Convert between bytes, kilobytes, megabytes, gigabytes, and more',
    category: TOOL_CATEGORIES.CONVERTER,
    path: '/tools/data-size-converter',
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design and development projects',
    category: TOOL_CATEGORIES.GENERATOR,
    path: '/tools/lorem-ipsum-generator',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Analyze text statistics including word count, character count, and readability',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    path: '/tools/word-counter',
  },
  {
    id: 'string-utilities',
    name: 'String Utilities',
    description: 'Process and manipulate text with various string operations',
    category: TOOL_CATEGORIES.TEXT_TOOLS,
    path: '/tools/string-utilities',
  },
  {
    id: 'wifi-qrcode-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for WiFi, URLs, contacts, and more',
    category: TOOL_CATEGORIES.GENERATOR,
    path: '/tools/wifi-qrcode-generator',
  },
]

export const getToolsByCategory = (category: string) => 
  TOOLS.filter(tool => tool.category === category)

export const getToolById = (id: string) => 
  TOOLS.find(tool => tool.id === id)