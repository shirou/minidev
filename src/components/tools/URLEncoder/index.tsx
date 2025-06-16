import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, FileText, RotateCcw, Info } from 'lucide-react'
import { 
  encodeURL,
  analyzeURL,
  getEncodingStats,
  getEncodingExplanation,
  URL_EXAMPLES,
  type URLConversionResult
} from '@/utils/converters/urlConverter'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function URLEncoder() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [options, setOptions] = useState({
    encodeSpaceAsPlus: false,
    encodeAllCharacters: false
  })

  const processInput = () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      setStats(null)
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const result = encodeURL(input, options)
      
      if (result.success && result.result !== undefined) {
        setOutput(result.result)
        setStats(result.stats)
        
        // Get additional encoding stats
        const encodingStats = getEncodingStats(result.result)
        setStats((prev: any) => ({ ...prev, ...encodingStats }))
      } else {
        setError(result.error || 'Encoding failed')
        setOutput('')
        setStats(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setOutput('')
      setStats(null)
    } finally {
      setIsProcessing(false)
    }
  }

  // Process input when input or options change
  useEffect(() => {
    const timeoutId = setTimeout(processInput, 300)
    return () => clearTimeout(timeoutId)
  }, [input, options])

  const handleCopy = async () => {
    if (!output) return
    
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const loadExample = (key: keyof typeof URL_EXAMPLES.encoder) => {
    setInput(URL_EXAMPLES.encoder[key])
    setError(null)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
    setStats(null)
  }

  const explanations = getEncodingExplanation()

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.urlEncoder.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.urlEncoder.description')}
        </p>
      </div>

      {/* Options */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">{t('tools.urlEncoder.options')}</h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={options.encodeSpaceAsPlus}
              onChange={(e) => setOptions((prev: any) => ({ ...prev, encodeSpaceAsPlus: e.target.checked }))}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{t('tools.urlEncoder.encodeSpaceAsPlus')}</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={options.encodeAllCharacters}
              onChange={(e) => setOptions((prev: any) => ({ ...prev, encodeAllCharacters: e.target.checked }))}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{t('tools.urlEncoder.encodeAllCharacters')}</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.urlEncoder.input')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                disabled={!input.trim() && !output.trim()}
                className="text-sm text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
              >
                {t('tools.urlEncoder.clear')}
              </button>
            </div>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('tools.urlEncoder.inputPlaceholder')}
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />

          {/* Examples */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{t('tools.urlEncoder.examples')}</h3>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(URL_EXAMPLES.encoder).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => loadExample(key as keyof typeof URL_EXAMPLES.encoder)}
                  className="text-left p-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium capitalize">{t(`tools.urlEncoder.example${key.charAt(0).toUpperCase() + key.slice(1)}`)}</div>
                  <div className="text-gray-600 font-mono text-xs truncate">{example}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.urlEncoder.output')}
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
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none break-all"
              placeholder={t('tools.urlEncoder.outputPlaceholder')}
            />
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-md">
                <div className="text-center text-red-600 p-4">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">{t('tools.urlEncoder.encodingError')}</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          {stats && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                {t('tools.urlEncoder.statistics')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <div><strong>{t('tools.urlEncoder.originalLength')}:</strong> {stats.originalLength}</div>
                  <div><strong>{t('tools.urlEncoder.encodedLength')}:</strong> {stats.resultLength}</div>
                </div>
                <div>
                  <div><strong>{t('tools.urlEncoder.sizeChange')}:</strong> {stats.changePercentage > 0 ? '+' : ''}{stats.changePercentage.toFixed(1)}%</div>
                  {stats.specialCharacters && stats.specialCharacters.length > 0 && (
                    <div><strong>{t('tools.urlEncoder.specialChars')}:</strong> {stats.specialCharacters.join(', ')}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Encoding Guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-800 mb-4 flex items-center">
          <Info className="w-4 h-4 mr-2" />
          {t('tools.urlEncoder.encodingGuide')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
          {Object.entries(explanations).slice(0, 6).map(([key, explanation]) => (
            <div key={key} className="bg-white p-3 rounded border">
              <div className="font-mono text-xs">{explanation}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          {t('tools.urlEncoder.encodingNote')}
        </div>
      </div>
    </div>
  )
}