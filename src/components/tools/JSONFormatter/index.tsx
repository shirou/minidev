import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, FileText, Minimize2, Maximize2, ArrowUpDown, RotateCcw, Download } from 'lucide-react'
import { 
  formatJSON,
  minifyJSON,
  validateJSON,
  sortJSONKeys,
  tryFixJSON,
  type JSONFormatterResult
} from '@/utils/converters/jsonFormatter'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function JSONFormatter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'format' | 'minify' | 'sort'>('format')
  const [indent, setIndent] = useState(2)
  const [validation, setValidation] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stats, setStats] = useState<any>(null)

  const processJSON = () => {
    if (!input.trim()) {
      setOutput('')
      setValidation(null)
      setStats(null)
      return
    }

    setIsProcessing(true)
    
    try {
      // First validate the JSON
      const validationResult = validateJSON(input)
      setValidation(validationResult)
      
      if (!validationResult.isValid) {
        setOutput('')
        setStats(null)
        setIsProcessing(false)
        return
      }

      let result: JSONFormatterResult
      
      switch (mode) {
        case 'format':
          result = formatJSON(input, indent)
          break
        case 'minify':
          result = minifyJSON(input)
          break
        case 'sort':
          result = sortJSONKeys(input, indent)
          break
        default:
          result = formatJSON(input, indent)
      }

      if (result.success && result.result !== undefined) {
        setOutput(result.result)
        setStats(result.stats)
      } else {
        setOutput('')
        setStats(null)
      }
    } catch (error) {
      console.error('Error processing JSON:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Process JSON when input or settings change
  useEffect(() => {
    const timeoutId = setTimeout(processJSON, 300)
    return () => clearTimeout(timeoutId)
  }, [input, mode, indent])

  const handleCopy = async () => {
    if (!output) return
    
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleFix = () => {
    const fixed = tryFixJSON(input)
    setInput(fixed)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setValidation(null)
    setStats(null)
  }

  const loadExample = () => {
    const example = {
      "name": "Example JSON",
      "version": "1.0.0",
      "description": "This is an example JSON object for testing the formatter",
      "author": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "dependencies": [
        "react",
        "typescript",
        "tailwindcss"
      ],
      "config": {
        "debug": true,
        "maxRetries": 3,
        "timeout": 5000
      }
    }
    setInput(JSON.stringify(example))
  }

  const downloadJSON = () => {
    if (!output) return
    
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `formatted.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.jsonFormatter.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.jsonFormatter.description')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Mode Selection */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              {t('tools.jsonFormatter.mode')}
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as 'format' | 'minify' | 'sort')}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="format">{t('tools.jsonFormatter.format')}</option>
              <option value="minify">{t('tools.jsonFormatter.minify')}</option>
              <option value="sort">{t('tools.jsonFormatter.sort')}</option>
            </select>
          </div>

          {/* Indent Size (only for format and sort modes) */}
          {(mode === 'format' || mode === 'sort') && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                {t('tools.jsonFormatter.indent')}
              </label>
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2}>2 {t('tools.jsonFormatter.spaces')}</option>
                <option value={4}>4 {t('tools.jsonFormatter.spaces')}</option>
                <option value={0}>{t('tools.jsonFormatter.tabs')}</option>
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={loadExample}
              className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <FileText className="w-4 h-4 mr-1" />
              {t('tools.jsonFormatter.example')}
            </button>
            
            <button
              onClick={handleFix}
              disabled={!input.trim()}
              className="flex items-center px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {t('tools.jsonFormatter.tryFix')}
            </button>
            
            <button
              onClick={handleClear}
              disabled={!input.trim() && !output.trim()}
              className="flex items-center px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors disabled:opacity-50"
            >
              {t('tools.jsonFormatter.clear')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.jsonFormatter.input')}
            </label>
            {validation && (
              <div className={`flex items-center text-sm ${validation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                {validation.isValid ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <AlertCircle className="w-4 h-4 mr-1" />
                )}
                {validation.isValid ? t('tools.jsonFormatter.valid') : t('tools.jsonFormatter.invalid')}
              </div>
            )}
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('tools.jsonFormatter.inputPlaceholder')}
            className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />

          {/* Validation Errors */}
          {validation && !validation.isValid && validation.errors && (
            <div className="space-y-2">
              {validation.errors.map((error: any, index: number) => (
                <div key={index} className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                  <div className="font-medium">Line {error.line}, Column {error.column}</div>
                  <div>{error.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.jsonFormatter.output')}
            </label>
            
            <div className="flex items-center space-x-2">
              {output && (
                <>
                  <button
                    onClick={downloadJSON}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {t('tools.jsonFormatter.download')}
                  </button>
                  
                  <button
                    onClick={handleCopy}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 mr-1 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {t('common.copy')}
                  </button>
                </>
              )}
            </div>
          </div>

          <textarea
            value={output}
            readOnly
            className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none"
            placeholder={t('tools.jsonFormatter.outputPlaceholder')}
          />

          {/* Statistics */}
          {stats && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                {t('tools.jsonFormatter.statistics')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <div><strong>{t('tools.jsonFormatter.size')}:</strong> {stats.size} bytes</div>
                  <div><strong>{t('tools.jsonFormatter.lines')}:</strong> {stats.lines}</div>
                  <div><strong>{t('tools.jsonFormatter.characters')}:</strong> {stats.characters.toLocaleString()}</div>
                </div>
                <div>
                  <div><strong>{t('tools.jsonFormatter.objects')}:</strong> {stats.objects}</div>
                  <div><strong>{t('tools.jsonFormatter.arrays')}:</strong> {stats.arrays}</div>
                  <div><strong>{t('tools.jsonFormatter.keys')}:</strong> {stats.keys}</div>
                </div>
              </div>
              {stats.compressionRatio !== undefined && (
                <div className="mt-2 text-sm text-blue-700">
                  <strong>{t('tools.jsonFormatter.compression')}:</strong> {stats.compressionRatio.toFixed(1)}%
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Information Panel */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          {t('tools.jsonFormatter.features')}
        </h3>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center mb-1">
                <Maximize2 className="w-4 h-4 mr-1 text-blue-500" />
                <strong>{t('tools.jsonFormatter.format')}</strong>
              </div>
              <p>{t('tools.jsonFormatter.formatDescription')}</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <Minimize2 className="w-4 h-4 mr-1 text-green-500" />
                <strong>{t('tools.jsonFormatter.minify')}</strong>
              </div>
              <p>{t('tools.jsonFormatter.minifyDescription')}</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <ArrowUpDown className="w-4 h-4 mr-1 text-purple-500" />
                <strong>{t('tools.jsonFormatter.sort')}</strong>
              </div>
              <p>{t('tools.jsonFormatter.sortDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}