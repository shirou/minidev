import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw, Thermometer, Info } from 'lucide-react'
import { 
  convertToAllTemperatureUnits,
  validateTemperature,
  getUnitSymbol,
  getTemperatureReferences,
  findClosestReference,
  type TemperatureUnit,
  type TemperatureConversionResult
} from '@/utils/converters/temperature'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function TemperatureConverter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius')
  const [conversions, setConversions] = useState<Record<string, TemperatureConversionResult>>({})
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [closestReference, setClosestReference] = useState<any>(null)

  const handleConvert = () => {
    if (!input.trim()) {
      setConversions({})
      setError(null)
      setWarning(null)
      setClosestReference(null)
      return
    }

    const numValue = parseFloat(input)
    if (isNaN(numValue)) {
      setError(t('tools.temperature.errors.invalidNumber'))
      setConversions({})
      setWarning(null)
      setClosestReference(null)
      return
    }

    setError(null)
    setWarning(null)

    try {
      // Validate temperature
      const validation = validateTemperature(numValue, fromUnit)
      if (!validation.isValid) {
        setError(validation.warning || t('tools.temperature.errors.invalidTemperature'))
        setConversions({})
        setClosestReference(null)
        return
      }
      
      if (validation.warning) {
        setWarning(validation.warning)
      }

      const results = convertToAllTemperatureUnits(numValue, fromUnit)
      setConversions(results)

      // Find closest reference (convert input to Celsius first)
      let celsiusValue = numValue
      if (fromUnit !== 'celsius') {
        const celsiusResult = results['Celsius (°C)']
        if (celsiusResult.success && celsiusResult.result !== undefined) {
          celsiusValue = celsiusResult.result
        }
      }
      
      const closest = findClosestReference(celsiusValue)
      setClosestReference(closest)
      
      // Check if any conversion failed
      const failures = Object.entries(results).filter(([_, result]) => !result.success)
      if (failures.length > 0) {
        setError(t('tools.temperature.errors.someConversionsFailed', { failures: failures.map(([name]) => name).join(', ') }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.temperature.errors.unknownError'))
      setConversions({})
      setClosestReference(null)
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
    setClosestReference(null)
  }

  const setReferenceInput = (celsius: number) => {
    setInput(celsius.toString())
    setFromUnit('celsius')
  }

  // Convert automatically when input or fromUnit changes
  useEffect(() => {
    handleConvert()
  }, [input, fromUnit])

  const unitNames: Record<TemperatureUnit, string> = {
    celsius: t('tools.temperature.units.celsius'),
    fahrenheit: t('tools.temperature.units.fahrenheit'),
    kelvin: t('tools.temperature.units.kelvin'),
    rankine: t('tools.temperature.units.rankine')
  }

  const references = getTemperatureReferences()

  // Create translation mapping for references
  const getTranslatedReference = (ref: any) => ({
    name: t(`tools.temperature.references.${ref.name.toLowerCase().replace(/\s+/g, '')}`),
    description: t(`tools.temperature.referenceDescriptions.${ref.name.toLowerCase().replace(/\s+/g, '')}`),
    celsius: ref.celsius
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.temperature.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.temperature.description')}
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.temperature.temperatureValue')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('tools.temperature.placeholder')}
                step="any"
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Thermometer className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.temperature.fromUnit')}
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as TemperatureUnit)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(unitNames).map(([unit, name]) => (
                <option key={unit} value={unit}>
                  {name}
                </option>
              ))}
            </select>
          </div>
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

      {/* Closest Reference */}
      {closestReference && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">{t('tools.temperature.closestReference')}:</h3>
          <p className="text-sm text-blue-800">
            <strong>{closestReference.name}</strong>: {closestReference.celsius}°C
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {closestReference.description} ({t('tools.temperature.difference')}: {closestReference.difference.toFixed(2)}°C)
          </p>
        </div>
      )}

      {/* Conversions Grid */}
      {Object.keys(conversions).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(conversions).map(([unitName, result]) => (
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
                  className="p-3 bg-gray-50 rounded border text-lg font-mono cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => result.result !== undefined && handleCopy(unitName, result.result)}
                >
                  {result.result !== undefined ? result.result.toString() : t('tools.temperature.empty')}
                </div>
              ) : (
                <div className="p-3 bg-red-100 border border-red-200 rounded text-sm text-red-600">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {result.error || t('tools.temperature.errors.conversionFailed')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Temperature References */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('tools.temperature.commonReferences')}:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {references.map((ref, index) => {
            const translatedRef = getTranslatedReference(ref)
            return (
              <button
                key={index}
                onClick={() => setReferenceInput(ref.celsius)}
                className="text-left p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm text-gray-700">{translatedRef.name}</div>
                <div className="text-xs text-gray-600">{ref.celsius}°C</div>
                <div className="text-xs text-gray-500 mt-1">{translatedRef.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* No Input State */}
      {!input && (
        <div className="text-center py-12 text-gray-500">
          <Thermometer className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>{t('tools.temperature.enterTemperaturePrompt')}</p>
        </div>
      )}

      {/* Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('tools.temperature.temperatureScales')}:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>{t('tools.temperature.units.celsius')}</strong>: {t('tools.temperature.scaleInfo.celsius')}</li>
          <li>• <strong>{t('tools.temperature.units.fahrenheit')}</strong>: {t('tools.temperature.scaleInfo.fahrenheit')}</li>
          <li>• <strong>{t('tools.temperature.units.kelvin')}</strong>: {t('tools.temperature.scaleInfo.kelvin')}</li>
          <li>• <strong>{t('tools.temperature.units.rankine')}</strong>: {t('tools.temperature.scaleInfo.rankine')}</li>
        </ul>
      </div>
    </div>
  )
}