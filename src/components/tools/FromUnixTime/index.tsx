import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Clock, Copy, Check, AlertCircle } from 'lucide-react'
import { 
  convertFromUnixTime, 
  getCurrentUnixTime,
  type TimePrecision 
} from '@/utils/converters/unixTime'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function FromUnixTimeConverter() {
  const { t } = useTranslation()
  const [precision, setPrecision] = useState<TimePrecision>('seconds')
  const [input, setInput] = useState(() => {
    // Initialize with current Unix timestamp in seconds
    return Math.floor(Date.now() / 1000).toString()
  })
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})
  
  // Results - initialized with current time values
  const [utcTime, setUtcTime] = useState<string>(() => {
    return new Date().toUTCString()
  })
  const [localTime, setLocalTime] = useState<string>(() => {
    return new Date().toLocaleString()
  })
  const [isoFormat, setIsoFormat] = useState<string>(() => {
    return new Date().toISOString()
  })

  const handleCopy = async (text: string, key: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(prev => ({ ...prev, [key]: true }))
      setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000)
    }
  }

  const useCurrentTime = () => {
    const currentTimestamp = getCurrentUnixTime(precision)
    setInput(currentTimestamp.toString())
    setError(null)
  }

  const handleConvert = () => {
    if (!input.trim()) {
      setUtcTime('')
      setLocalTime('')
      setIsoFormat('')
      setError(null)
      return
    }

    const timestamp = parseFloat(input)
    
    if (isNaN(timestamp)) {
      setError('Invalid Unix timestamp')
      setUtcTime('')
      setLocalTime('')
      setIsoFormat('')
      return
    }

    const result = convertFromUnixTime(timestamp, precision)
    
    if (result.success && result.result) {
      const date = new Date(result.result as string)
      setUtcTime(date.toUTCString())
      setLocalTime(date.toLocaleString())
      setIsoFormat(date.toISOString())
      setError(null)
    } else {
      setError(result.error || 'Conversion failed')
      setUtcTime('')
      setLocalTime('')
      setIsoFormat('')
    }
  }

  // Auto-convert when input or precision changes
  useEffect(() => {
    handleConvert()
  }, [input, precision])

  // Get current timestamp based on precision for display
  const getCurrentTimestampForDisplay = () => {
    return getCurrentUnixTime(precision).toLocaleString()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.fromUnixTime.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.fromUnixTime.description')}
        </p>
      </div>

      {/* Precision Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('tools.fromUnixTime.precision')}
          </label>
          <button
            onClick={useCurrentTime}
            className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md transition-colors"
          >
            <Clock className="w-4 h-4 mr-1" />
            {t('tools.fromUnixTime.currentTimeButton')}
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
              <span className="text-sm">{t(`tools.fromUnixTime.precisionOptions.${p}`)}</span>
            </label>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Current timestamp ({t(`tools.fromUnixTime.precisionOptions.${precision}`)}): {getCurrentTimestampForDisplay()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">{t('tools.fromUnixTime.timestampInput')}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.fromUnixTime.inputLabel')} ({t(`tools.fromUnixTime.precisionOptions.${precision}`)})
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('tools.fromUnixTime.placeholder')}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setInput('0')}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-mono"
              >
                0 (Unix Epoch)
              </button>
              <button
                onClick={() => setInput('1000000000')}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-mono"
              >
                1000000000
              </button>
              <button
                onClick={() => setInput('1234567890')}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-mono"
              >
                1234567890
              </button>
              <button
                onClick={() => setInput('1700000000')}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-mono"
              >
                1700000000
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">{t('tools.fromUnixTime.results')}</h2>

          {error ? (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* UTC Time */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('tools.fromUnixTime.utcTime')}
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
                    {t('tools.fromUnixTime.localTime')}
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
                    {t('tools.fromUnixTime.isoFormat')}
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

              {/* Relative Time Info */}
              {utcTime && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-600">
                    {(() => {
                      const timestamp = parseFloat(input)
                      if (isNaN(timestamp)) return ''
                      
                      let timestampMs: number
                      switch (precision) {
                        case 'seconds':
                          timestampMs = timestamp * 1000
                          break
                        case 'milliseconds':
                          timestampMs = timestamp
                          break
                        case 'microseconds':
                          timestampMs = timestamp / 1000
                          break
                        default:
                          timestampMs = timestamp * 1000
                      }
                      
                      const date = new Date(timestampMs)
                      const now = new Date()
                      const diffMs = now.getTime() - date.getTime()
                      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
                      
                      if (diffDays === 0) {
                        return 'Today'
                      } else if (diffDays === 1) {
                        return 'Yesterday'
                      } else if (diffDays === -1) {
                        return 'Tomorrow'
                      } else if (diffDays > 0) {
                        return `${diffDays} days ago`
                      } else {
                        return `In ${Math.abs(diffDays)} days`
                      }
                    })()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}