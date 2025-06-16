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
]

export const getToolsByCategory = (category: string) => 
  TOOLS.filter(tool => tool.category === category)

export const getToolById = (id: string) => 
  TOOLS.find(tool => tool.id === id)