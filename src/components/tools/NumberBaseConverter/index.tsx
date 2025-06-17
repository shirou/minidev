import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw, Info } from 'lucide-react'
import { 
  convertToAllBases, 
  addPrefix, 
  type NumberBase, 
  type NumberBaseConversionResult,
  isWithinSafeRange 
} from '@/utils/converters/numberBase'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function NumberBaseConverter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState<NumberBase>(10)
  const [conversions, setConversions] = useState<Record<string, NumberBaseConversionResult>>({})
  const [error, setError] = useState<string | null>(null)
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [showPrefixes, setShowPrefixes] = useState(false)

  const handleConvert = () => {
    if (!input.trim()) {
      setConversions({})
      setError(null)
      return
    }

    setError(null)

    try {
      // Check if number is within safe range
      if (!isWithinSafeRange(input, fromBase)) {
        setError(t('tools.numberBase.errors.tooLarge'))
      }

      const results = convertToAllBases(input, fromBase)
      setConversions(results)
      
      // Check if any conversion failed
      const failures = Object.entries(results).filter(([_, result]) => !result.success)
      if (failures.length > 0) {
        setError(t('tools.numberBase.errors.someConversionsFailed', { failures: failures.map(([name]) => name).join(', ') }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.numberBase.errors.unknownError'))
      setConversions({})
    }
  }

  const handleCopy = async (type: string, value: string, base: NumberBase) => {
    if (!value) return
    
    const textToCopy = showPrefixes ? addPrefix(value, base) : value
    const success = await copyToClipboard(textToCopy)
    if (success) {
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
    }
  }

  const clearAll = () => {
    setInput('')
    setConversions({})
    setError(null)
  }

  const setExampleInput = (value: string, base: NumberBase) => {
    setInput(value)
    setFromBase(base)
  }

  // Convert automatically when input or fromBase changes
  useEffect(() => {
    handleConvert()
  }, [input, fromBase])

  const baseNames: Record<NumberBase, string> = {
    2: t('tools.numberBase.bases.binary'),
    8: t('tools.numberBase.bases.octal'), 
    10: t('tools.numberBase.bases.decimal'),
    16: t('tools.numberBase.bases.hexadecimal')
  }

  const baseDescriptions: Record<NumberBase, string> = {
    2: t('tools.numberBase.descriptions.binary'),
    8: t('tools.numberBase.descriptions.octal'),
    10: t('tools.numberBase.descriptions.decimal'),
    16: t('tools.numberBase.descriptions.hexadecimal')
  }

  const examples = [
    { value: '42', base: 10 as NumberBase, description: t('tools.numberBase.examples.decimal') },
    { value: '0xFF', base: 16 as NumberBase, description: t('tools.numberBase.examples.hexWithPrefix') },
    { value: '1010', base: 2 as NumberBase, description: t('tools.numberBase.examples.binary') },
    { value: '0o755', base: 8 as NumberBase, description: t('tools.numberBase.examples.octalWithPrefix') },
    { value: '255', base: 10 as NumberBase, description: t('tools.numberBase.examples.commonDecimal') }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.numberBase.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.numberBase.description')}
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.numberBase.inputNumber')}
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('tools.numberBase.placeholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.numberBase.fromBase')}
            </label>
            <select
              value={fromBase}
              onChange={(e) => setFromBase(parseInt(e.target.value) as NumberBase)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(baseNames).map(([base, name]) => (
                <option key={base} value={base}>
                  {name} ({t('tools.numberBase.baseLabel')} {base}) - {baseDescriptions[parseInt(base) as NumberBase]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPrefixes"
              checked={showPrefixes}
              onChange={(e) => setShowPrefixes(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showPrefixes" className="text-sm text-gray-700">
              {t('tools.numberBase.showPrefixes')}
            </label>
          </div>

          {input && (
            <button
              onClick={clearAll}
              className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {t('common.clear')}
            </button>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">{t('tools.numberBase.tryExamples')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setExampleInput(example.value, example.base)}
              className="text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
            >
              <code className="text-sm text-blue-700">{example.value}</code>
              <div className="text-xs text-gray-600 mt-1">{example.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center text-yellow-800">
            <Info className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('common.notice')}</span>
          </div>
          <p className="text-sm text-yellow-800 mt-1">{error}</p>
        </div>
      )}

      {/* Conversions Grid */}
      {Object.keys(conversions).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(conversions).map(([baseName, result]) => {
            const baseNumber = baseName.includes('2') ? 2 : 
                              baseName.includes('8') ? 8 : 
                              baseName.includes('10') ? 10 : 16
            
            return (
              <div
                key={baseName}
                className={`bg-white border rounded-lg p-4 ${
                  result.success ? 'border-gray-200' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-700">{baseName}</h3>
                  {result.success && result.result && (
                    <button
                      onClick={() => handleCopy(baseName, result.result!, baseNumber as NumberBase)}
                      className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copiedType === baseName ? (
                        <Check className="w-3 h-3 mr-1 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {t('common.copy')}
                    </button>
                  )}
                </div>
                
                {result.success ? (
                  <div className="space-y-2">
                    <div
                      className="p-3 bg-gray-50 rounded border font-mono text-sm break-all cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => result.result && handleCopy(baseName, result.result, baseNumber as NumberBase)}
                    >
                      {showPrefixes && baseNumber !== 10 
                        ? addPrefix(result.result || '', baseNumber as NumberBase)
                        : result.result || '(empty)'
                      }
                    </div>
                    {result.result && (
                      <div className="text-xs text-gray-500">
                        {t('tools.numberBase.lengthDigits', { length: result.result.length })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-red-100 border border-red-200 rounded text-sm text-red-600">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {result.error || t('tools.numberBase.errors.conversionFailed')}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* No Input State */}
      {!input && (
        <div className="text-center py-12 text-gray-500">
          <p>{t('tools.numberBase.enterNumberPrompt')}</p>
        </div>
      )}

      {/* Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('tools.numberBase.information')}:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• {t('tools.numberBase.info.binary')}</li>
          <li>• {t('tools.numberBase.info.octal')}</li>
          <li>• {t('tools.numberBase.info.decimal')}</li>
          <li>• {t('tools.numberBase.info.hexadecimal')}</li>
          <li>• {t('tools.numberBase.info.prefixes')}</li>
        </ul>
      </div>
    </div>
  )
}