import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw, ArrowUpDown } from 'lucide-react'
import { 
  encodeHtml, 
  decodeHtml,
  containsHtmlEntities,
  containsHtmlSpecialChars
} from '@/utils/converters/html'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function HtmlEncoder() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [autoDetect, setAutoDetect] = useState(true)

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    setError(null)

    try {
      const result = mode === 'encode' ? encodeHtml(input) : decodeHtml(input)
      
      if (result.success && result.result !== undefined) {
        setOutput(result.result)
      } else {
        setError(result.error || t('tools.html.errors.conversionFailed'))
        setOutput('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.html.errors.unknownError'))
      setOutput('')
    }
  }

  const handleCopy = async () => {
    if (!output) return
    
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const swapInputOutput = () => {
    if (output) {
      setInput(output)
      setOutput('')
      setMode(mode === 'encode' ? 'decode' : 'encode')
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
  }

  // Auto-detect mode based on input content
  useEffect(() => {
    if (autoDetect && input.trim()) {
      const hasEntities = containsHtmlEntities(input)
      const hasSpecialChars = containsHtmlSpecialChars(input)
      
      if (hasEntities && !hasSpecialChars) {
        setMode('decode')
      } else if (hasSpecialChars && !hasEntities) {
        setMode('encode')
      }
    }
  }, [input, autoDetect])

  // Convert automatically when input or mode changes
  useEffect(() => {
    handleConvert()
  }, [input, mode])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.html.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.html.description')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">{t('tools.html.mode')}:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="encode">{t('tools.html.encode')}</option>
              <option value="decode">{t('tools.html.decode')}</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoDetect"
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="autoDetect" className="text-sm text-gray-700">
              {t('tools.html.autoDetectMode')}
            </label>
          </div>

          <button
            onClick={swapInputOutput}
            disabled={!output}
            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            {t('tools.html.swap')}
          </button>

          <button
            onClick={clearAll}
            disabled={!input && !output}
            className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            {t('common.clear')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {mode === 'encode' ? t('tools.html.plainText') : t('tools.html.htmlEncodedText')}
          </label>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' 
              ? t('tools.html.plainTextPlaceholder')
              : t('tools.html.encodedTextPlaceholder')
            }
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />
          
          {input && (
            <div className="text-xs text-gray-500">
              {t('tools.html.inputLength', { length: input.length.toLocaleString() })}
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? t('tools.html.htmlEncodedText') : t('tools.html.plainText')}
            </label>
            
            {output && (
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
            )}
          </div>

          <div className="relative">
            <textarea
              value={output}
              readOnly
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none"
              placeholder={mode === 'encode' ? t('tools.html.encodedOutputPlaceholder') : t('tools.html.decodedOutputPlaceholder')}
            />
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-md">
                <div className="text-center text-red-600 p-4">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">{t('tools.html.conversionError')}</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {output && (
            <div className="text-xs text-gray-500">
              {t('tools.html.outputLength', { length: output.length.toLocaleString() })}
            </div>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">{t('tools.html.examples')}:</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>{t('tools.html.encode')}:</strong> <code>&lt;script&gt;</code> → <code>&amp;lt;script&amp;gt;</code>
          </div>
          <div>
            <strong>{t('tools.html.decode')}:</strong> <code>&amp;quot;Hello&amp;quot;</code> → <code>"Hello"</code>
          </div>
        </div>
      </div>
    </div>
  )
}