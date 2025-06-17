import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw, HardDrive, Info } from 'lucide-react'
import { 
  convertToAllDataSizeUnits,
  validateDataSize,
  getUnitDisplayName,
  getDataSizeExamples,
  formatDataSize,
  type DataSizeUnit,
  type DataSizeConversionResult
} from '@/utils/converters/dataSize'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function DataSizeConverter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [fromUnit, setFromUnit] = useState<DataSizeUnit>('mb')
  const [conversions, setConversions] = useState<Record<string, DataSizeConversionResult>>({})
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [showBinary, setShowBinary] = useState(true)

  const handleConvert = () => {
    if (!input.trim()) {
      setConversions({})
      setError(null)
      setWarning(null)
      return
    }

    const numValue = parseFloat(input)
    if (isNaN(numValue)) {
      setError(t('tools.dataSize.errors.invalidNumber'))
      setConversions({})
      setWarning(null)
      return
    }

    setError(null)
    setWarning(null)

    try {
      // Validate data size
      const validation = validateDataSize(numValue, fromUnit)
      if (!validation.isValid) {
        setError(validation.warning || t('tools.dataSize.errors.invalidDataSize'))
        setConversions({})
        return
      }
      
      if (validation.warning) {
        setWarning(validation.warning)
      }

      const results = convertToAllDataSizeUnits(numValue, fromUnit)
      setConversions(results)
      
      // Check if any conversion failed
      const failures = Object.entries(results).filter(([_, result]) => !result.success)
      if (failures.length > 0) {
        setError(t('tools.dataSize.errors.someConversionsFailed', { failures: failures.map(([name]) => name).join(', ') }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.dataSize.errors.unknownError'))
      setConversions({})
    }
  }

  const handleCopy = async (type: string, value: number) => {
    const text = value.toString()
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
    }
  }

  const clearAll = () => {
    setInput('')
    setConversions({})
    setError(null)
    setWarning(null)
  }

  const setExampleInput = (value: number, unit: DataSizeUnit) => {
    setInput(value.toString())
    setFromUnit(unit)
  }

  // Convert automatically when input or fromUnit changes
  useEffect(() => {
    handleConvert()
  }, [input, fromUnit])

  const unitOptions: Array<{ value: DataSizeUnit; label: string; group: string }> = [
    { value: 'bit', label: t('tools.dataSize.units.bit'), group: t('tools.dataSize.groups.basic') },
    { value: 'byte', label: t('tools.dataSize.units.byte'), group: t('tools.dataSize.groups.basic') },
    { value: 'kb', label: t('tools.dataSize.units.kb'), group: t('tools.dataSize.groups.decimal') },
    { value: 'mb', label: t('tools.dataSize.units.mb'), group: t('tools.dataSize.groups.decimal') },
    { value: 'gb', label: t('tools.dataSize.units.gb'), group: t('tools.dataSize.groups.decimal') },
    { value: 'tb', label: t('tools.dataSize.units.tb'), group: t('tools.dataSize.groups.decimal') },
    { value: 'pb', label: t('tools.dataSize.units.pb'), group: t('tools.dataSize.groups.decimal') },
    { value: 'kib', label: t('tools.dataSize.units.kib'), group: t('tools.dataSize.groups.binary') },
    { value: 'mib', label: t('tools.dataSize.units.mib'), group: t('tools.dataSize.groups.binary') },
    { value: 'gib', label: t('tools.dataSize.units.gib'), group: t('tools.dataSize.groups.binary') },
    { value: 'tib', label: t('tools.dataSize.units.tib'), group: t('tools.dataSize.groups.binary') },
    { value: 'pib', label: t('tools.dataSize.units.pib'), group: t('tools.dataSize.groups.binary') }
  ]

  const examples = getDataSizeExamples()

  // Create translation mapping for examples
  const getTranslatedExample = (example: any) => ({
    name: t(`tools.dataSize.examples.${example.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`),
    description: t(`tools.dataSize.exampleDescriptions.${example.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`),
    value: example.value,
    unit: example.unit
  })

  // Filter conversions based on showBinary setting
  const filteredConversions = Object.entries(conversions).filter(([name]) => {
    const isBinary = name.includes('ibibyte') || name.includes('iB)')
    return showBinary || !isBinary
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.dataSize.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.dataSize.description')}
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.dataSize.dataSizeValue')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('tools.dataSize.placeholder')}
                step="any"
                min="0"
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <HardDrive className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.dataSize.fromUnit')}
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as DataSizeUnit)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[t('tools.dataSize.groups.basic'), t('tools.dataSize.groups.decimal'), t('tools.dataSize.groups.binary')].map(group => (
                <optgroup key={group} label={group}>
                  {unitOptions
                    .filter(option => option.group === group)
                    .map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  }
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showBinary"
              checked={showBinary}
              onChange={(e) => setShowBinary(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showBinary" className="text-sm text-gray-700">
              {t('tools.dataSize.showBinaryUnits')}
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

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('common.error')}</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      {/* Warning Display */}
      {warning && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center text-yellow-800">
            <Info className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('common.notice')}</span>
          </div>
          <p className="text-sm text-yellow-800 mt-1">{warning}</p>
        </div>
      )}

      {/* Conversions Grid */}
      {filteredConversions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConversions.map(([unitName, result]) => (
            <div
              key={unitName}
              className={`bg-white border rounded-lg p-4 ${
                result.success ? 'border-gray-200' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">{unitName}</h3>
                {result.success && result.result !== undefined && (
                  <button
                    onClick={() => handleCopy(unitName, result.result!)}
                    className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copiedType === unitName ? (
                      <Check className="w-3 h-3 mr-1 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3 mr-1" />
                    )}
                    {t('common.copy')}
                  </button>
                )}
              </div>
              
              {result.success ? (
                <div
                  className="p-3 bg-gray-50 rounded border font-mono text-sm cursor-pointer hover:bg-gray-100 transition-colors break-all"
                  onClick={() => result.result !== undefined && handleCopy(unitName, result.result)}
                >
                  {result.result !== undefined 
                    ? (result.result < 1e-6 
                        ? result.result.toExponential(3)
                        : result.result.toLocaleString())
                    : t('tools.dataSize.empty')
                  }
                </div>
              ) : (
                <div className="p-3 bg-red-100 border border-red-200 rounded text-sm text-red-600">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {result.error || t('tools.dataSize.errors.conversionFailed')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Common Examples */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">{t('tools.dataSize.commonExamples')}:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {examples.map((example, index) => {
            const translatedExample = getTranslatedExample(example)
            return (
              <button
                key={index}
                onClick={() => setExampleInput(example.value, example.unit)}
                className="text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium text-sm text-blue-700">{translatedExample.name}</div>
                <div className="text-xs text-blue-600">
                  {example.value} {getUnitDisplayName(example.unit)}
                </div>
                <div className="text-xs text-gray-600 mt-1">{translatedExample.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* No Input State */}
      {!input && (
        <div className="text-center py-12 text-gray-500">
          <HardDrive className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>{t('tools.dataSize.enterDataSizePrompt')}</p>
        </div>
      )}

      {/* Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('tools.dataSize.understandingUnits')}:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-700 mb-1">{t('tools.dataSize.decimalUnits')}:</h4>
            <ul className="space-y-1">
              <li>• {t('tools.dataSize.unitInfo.kb')}</li>
              <li>• {t('tools.dataSize.unitInfo.mb')}</li>
              <li>• {t('tools.dataSize.unitInfo.gb')}</li>
              <li>• {t('tools.dataSize.unitInfo.tb')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">{t('tools.dataSize.binaryUnits')}:</h4>
            <ul className="space-y-1">
              <li>• {t('tools.dataSize.unitInfo.kib')}</li>
              <li>• {t('tools.dataSize.unitInfo.mib')}</li>
              <li>• {t('tools.dataSize.unitInfo.gib')}</li>
              <li>• {t('tools.dataSize.unitInfo.tib')}</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <strong>{t('tools.dataSize.note')}:</strong> {t('tools.dataSize.noteContent')}
        </p>
      </div>
    </div>
  )
}