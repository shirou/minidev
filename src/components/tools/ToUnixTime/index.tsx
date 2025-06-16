import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Clock, Copy, Check, AlertCircle } from 'lucide-react'
import { 
  convertDateTimeComponentsToUnixTime, 
  convertToUnixTime, 
  getCurrentUnixTime,
  type DateTimeComponents,
  type TimePrecision 
} from '@/utils/converters/unixTime'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function ToUnixTimeConverter() {
  const { t } = useTranslation()
  const [precision, setPrecision] = useState<TimePrecision>('seconds')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})
  
  // Number inputs state - initialized with current time
  const [dateTime, setDateTime] = useState<DateTimeComponents>(() => {
    const now = new Date()
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    }
  })
  
  // Text input state - initialized with current ISO string
  const [textInput, setTextInput] = useState(() => {
    const now = new Date()
    return now.toISOString().slice(0, 19).replace('T', ' ')
  })
  
  // Results - initialized with current time values
  const [unixTimestamp, setUnixTimestamp] = useState<number | null>(() => {
    return getCurrentUnixTime('seconds')
  })
  const [utcTime, setUtcTime] = useState<string>(() => {
    return new Date().toUTCString()
  })
  const [localTime, setLocalTime] = useState<string>(() => {
    return new Date().toLocaleString()
  })
  const [isoFormat, setIsoFormat] = useState<string>(() => {
    return new Date().toISOString()
  })

  const updateDateTime = (field: keyof DateTimeComponents, value: number) => {
    setDateTime(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleCopy = async (text: string, key: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(prev => ({ ...prev, [key]: true }))
      setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000)
    }
  }

  const useCurrentTime = () => {
    const now = new Date()
    setDateTime({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    })
    setTextInput('')
    setError(null)
  }

  const convertFromTextInput = () => {
    if (!textInput.trim()) {
      setUnixTimestamp(null)
      setUtcTime('')
      setLocalTime('')
      setIsoFormat('')
      setError(null)
      return
    }

    const result = convertToUnixTime(textInput)
    
    if (result.success && result.result !== undefined) {
      let timestamp = result.result as number
      
      // Adjust for precision
      switch (precision) {
        case 'milliseconds':
          timestamp = timestamp * 1000
          break
        case 'microseconds':
          timestamp = timestamp * 1000000
          break
      }
      
      setUnixTimestamp(timestamp)
      updateDisplayFormats(result.result as number)
      setError(null)
    } else {
      setError(result.error || 'Conversion failed')
      setUnixTimestamp(null)
      setUtcTime('')
      setLocalTime('')
      setIsoFormat('')
    }
  }

  const convertFromNumberInputs = () => {
    const result = convertDateTimeComponentsToUnixTime(dateTime, precision)
    
    if (result.success && result.result !== undefined) {
      setUnixTimestamp(result.result as number)
      
      // Convert back to seconds for display formats
      const secondsTimestamp = precision === 'seconds' 
        ? result.result as number 
        : precision === 'milliseconds'
        ? Math.floor((result.result as number) / 1000)
        : Math.floor((result.result as number) / 1000000)
      
      updateDisplayFormats(secondsTimestamp)
      setError(null)
    } else {
      setError(result.error || 'Conversion failed')
      setUnixTimestamp(null)
      setUtcTime('')
      setLocalTime('')
      setIsoFormat('')
    }
  }

  const updateDisplayFormats = (secondsTimestamp: number) => {
    const date = new Date(secondsTimestamp * 1000)
    setUtcTime(date.toUTCString())
    setLocalTime(date.toLocaleString())
    setIsoFormat(date.toISOString())
  }

  // Auto-convert when inputs change
  useEffect(() => {
    convertFromNumberInputs()
  }, [dateTime, precision])

  useEffect(() => {
    convertFromTextInput()
  }, [textInput, precision])

  const loadExample = (example: string) => {
    setTextInput(example)
    setError(null)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.toUnixTime.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.toUnixTime.description')}
        </p>
      </div>

      {/* Precision Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('tools.toUnixTime.precision')}
          </label>
          <button
            onClick={useCurrentTime}
            className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md transition-colors"
          >
            <Clock className="w-4 h-4 mr-1" />
            {t('tools.toUnixTime.currentTimeButton')}
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {(['seconds', 'milliseconds', 'microseconds'] as TimePrecision[]).map((p) => (
            <label key={p} className="flex items-center">
              <input
                type="radio"
                name="precision"
                value={p}
                checked={precision === p}
                onChange={() => setPrecision(p)}
                className="mr-2"
              />
              <span className="text-sm">{t(`tools.toUnixTime.precisionOptions.${p}`)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panels */}
        <div className="space-y-6">
          {/* Number Inputs */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{t('tools.toUnixTime.dateTimeInputs')}</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tools.toUnixTime.year')}
                </label>
                <input
                  type="number"
                  value={dateTime.year}
                  onChange={(e) => updateDateTime('year', parseInt(e.target.value) || 1970)}
                  min="1970"
                  max="2100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tools.toUnixTime.month')}
                </label>
                <input
                  type="number"
                  value={dateTime.month}
                  onChange={(e) => updateDateTime('month', parseInt(e.target.value) || 1)}
                  min="1"
                  max="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tools.toUnixTime.day')}
                </label>
                <input
                  type="number"
                  value={dateTime.day}
                  onChange={(e) => updateDateTime('day', parseInt(e.target.value) || 1)}
                  min="1"
                  max="31"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tools.toUnixTime.hour')}
                </label>
                <input
                  type="number"
                  value={dateTime.hour}
                  onChange={(e) => updateDateTime('hour', parseInt(e.target.value) || 0)}
                  min="0"
                  max="23"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tools.toUnixTime.minute')}
                </label>
                <input
                  type="number"
                  value={dateTime.minute}
                  onChange={(e) => updateDateTime('minute', parseInt(e.target.value) || 0)}
                  min="0"
                  max="59"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('tools.toUnixTime.second')}
                </label>
                <input
                  type="number"
                  value={dateTime.second}
                  onChange={(e) => updateDateTime('second', parseInt(e.target.value) || 0)}
                  min="0"
                  max="59"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Text Input */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{t('tools.toUnixTime.textInput')}</h2>
            
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={t('tools.toUnixTime.placeholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {t('tools.toUnixTime.examples')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(t('tools.toUnixTime.exampleFormats', { returnObjects: true }) as string[]).map((example: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className="text-left px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors font-mono"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">{t('tools.toUnixTime.results')}</h2>

          {error ? (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Unix Timestamp */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('tools.toUnixTime.outputLabel')} ({t(`tools.toUnixTime.precisionOptions.${precision}`)})
                  </label>
                  {unixTimestamp !== null && (
                    <button
                      onClick={() => handleCopy(unixTimestamp.toString(), 'unix')}
                      className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copied.unix ? (
                        <Check className="w-3 h-3 mr-1 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {t('common.copy')}
                    </button>
                  )}
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-lg">
                  {unixTimestamp?.toLocaleString() || '-'}
                </div>
              </div>

              {/* UTC Time */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('tools.toUnixTime.utcTime')}
                  </label>
                  {utcTime && (
                    <button
                      onClick={() => handleCopy(utcTime, 'utc')}
                      className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copied.utc ? (
                        <Check className="w-3 h-3 mr-1 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {t('common.copy')}
                    </button>
                  )}
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono">
                  {utcTime || '-'}
                </div>
              </div>

              {/* Local Time */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('tools.toUnixTime.localTime')}
                  </label>
                  {localTime && (
                    <button
                      onClick={() => handleCopy(localTime, 'local')}
                      className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copied.local ? (
                        <Check className="w-3 h-3 mr-1 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {t('common.copy')}
                    </button>
                  )}
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono">
                  {localTime || '-'}
                </div>
              </div>

              {/* ISO Format */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('tools.toUnixTime.isoFormat')}
                  </label>
                  {isoFormat && (
                    <button
                      onClick={() => handleCopy(isoFormat, 'iso')}
                      className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copied.iso ? (
                        <Check className="w-3 h-3 mr-1 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      {t('common.copy')}
                    </button>
                  )}
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono">
                  {isoFormat || '-'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}