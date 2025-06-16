import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, FileText, RotateCcw, Info } from 'lucide-react'
import { 
  decodeURL,
  analyzeURL,
  extractQueryParams,
  isValidURLEncoding,
  URL_EXAMPLES,
  type URLConversionResult
} from '@/utils/converters/urlConverter'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function URLDecoder() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [queryParams, setQueryParams] = useState<{ [key: string]: string } | null>(null)

  const processInput = () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      setStats(null)
      setAnalysis(null)
      setQueryParams(null)
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Check if input has valid URL encoding
      if (!isValidURLEncoding(input)) {
        setError('Invalid URL encoding format')
        setOutput('')
        setStats(null)
        setAnalysis(null)
        setQueryParams(null)
        return
      }

      const result = decodeURL(input)
      
      if (result.success && result.result !== undefined) {
        setOutput(result.result)
        setStats(result.stats)
        
        // Analyze the decoded result
        const urlAnalysis = analyzeURL(result.result)
        setAnalysis(urlAnalysis)
        
        // Extract query parameters if present
        try {
          const params = extractQueryParams(input)
          if (Object.keys(params).length > 0) {
            setQueryParams(params)
          } else {
            setQueryParams(null)
          }
        } catch {
          setQueryParams(null)
        }
      } else {
        setError(result.error || 'Decoding failed')
        setOutput('')
        setStats(null)
        setAnalysis(null)
        setQueryParams(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setOutput('')
      setStats(null)
      setAnalysis(null)
      setQueryParams(null)
    } finally {
      setIsProcessing(false)
    }
  }

  // Process input when input changes
  useEffect(() => {
    const timeoutId = setTimeout(processInput, 300)
    return () => clearTimeout(timeoutId)
  }, [input])

  const handleCopy = async () => {
    if (!output) return
    
    const success = await copyToClipboard(output)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const loadExample = (key: keyof typeof URL_EXAMPLES.decoder) => {
    setInput(URL_EXAMPLES.decoder[key])
    setError(null)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
    setStats(null)
    setAnalysis(null)
    setQueryParams(null)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.urlDecoder.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.urlDecoder.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.urlDecoder.input')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                disabled={!input.trim() && !output.trim()}
                className="text-sm text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
              >
                {t('tools.urlDecoder.clear')}
              </button>
            </div>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('tools.urlDecoder.inputPlaceholder')}
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />

          {/* Examples */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{t('tools.urlDecoder.examples')}</h3>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(URL_EXAMPLES.decoder).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => loadExample(key as keyof typeof URL_EXAMPLES.decoder)}
                  className="text-left p-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium capitalize">{t(`tools.urlDecoder.example${key.charAt(0).toUpperCase() + key.slice(1)}`)}</div>
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
              {t('tools.urlDecoder.output')}
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
              placeholder={t('tools.urlDecoder.outputPlaceholder')}
            />
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-md">
                <div className="text-center text-red-600 p-4">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">{t('tools.urlDecoder.decodingError')}</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          {stats && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                {t('tools.urlDecoder.statistics')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <div><strong>{t('tools.urlDecoder.originalLength')}:</strong> {stats.originalLength}</div>
                  <div><strong>{t('tools.urlDecoder.decodedLength')}:</strong> {stats.resultLength}</div>
                </div>
                <div>
                  <div><strong>{t('tools.urlDecoder.sizeChange')}:</strong> {stats.changePercentage > 0 ? '+' : ''}{stats.changePercentage.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          )}

          {/* URL Analysis */}
          {analysis && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                {t('tools.urlDecoder.analysis')}
              </h3>
              {analysis.isValid ? (
                <div className="text-sm text-green-700 space-y-1">
                  {analysis.protocol && <div><strong>{t('tools.urlDecoder.protocol')}:</strong> {analysis.protocol}</div>}
                  {analysis.hostname && <div><strong>{t('tools.urlDecoder.hostname')}:</strong> {analysis.hostname}</div>}
                  {analysis.pathname && <div><strong>{t('tools.urlDecoder.pathname')}:</strong> {analysis.pathname}</div>}
                  {analysis.search && <div><strong>{t('tools.urlDecoder.search')}:</strong> {analysis.search}</div>}
                  {analysis.hash && <div><strong>{t('tools.urlDecoder.hash')}:</strong> {analysis.hash}</div>}
                  {analysis.port && <div><strong>{t('tools.urlDecoder.port')}:</strong> {analysis.port}</div>}
                </div>
              ) : (
                <div className="text-sm text-green-700">
                  <strong>{t('tools.urlDecoder.type')}:</strong> {analysis.components.type}
                </div>
              )}
            </div>
          )}

          {/* Query Parameters */}
          {queryParams && Object.keys(queryParams).length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-purple-800 mb-2">
                {t('tools.urlDecoder.queryParameters')}
              </h3>
              <div className="space-y-2 text-sm text-purple-700">
                {Object.entries(queryParams).map(([key, value]) => (
                  <div key={key} className="bg-white p-2 rounded border">
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decoding Guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-800 mb-4 flex items-center">
          <Info className="w-4 h-4 mr-2" />
          {t('tools.urlDecoder.decodingGuide')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-white p-3 rounded border">
            <div className="font-mono text-xs">%20 → Space</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-mono text-xs">%21 → !</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-mono text-xs">%40 → @</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-mono text-xs">%23 → #</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-mono text-xs">%24 → $</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="font-mono text-xs">%25 → %</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          {t('tools.urlDecoder.decodingNote')}
        </div>
      </div>
    </div>
  )
}