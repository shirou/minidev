import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Copy, Check, AlertCircle } from 'lucide-react'
import { convertYamlToJson } from '@/utils/converters/yamlJson'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function YamlToJsonConverter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [prettify, setPrettify] = useState(true)

  const handleConvert = async () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    setIsConverting(true)
    setError(null)

    try {
      const result = convertYamlToJson(input, prettify)
      
      if (result.success && result.result) {
        setOutput(result.result)
      } else {
        setError(result.error || 'Conversion failed')
        setOutput('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setOutput('')
    } finally {
      setIsConverting(false)
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

  const loadExample = () => {
    setInput(t('tools.yamlToJson.example'))
    setError(null)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.yamlToJson.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.yamlToJson.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.yamlToJson.inputLabel')}
            </label>
            <button
              onClick={loadExample}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Load Example
            </button>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={handleConvert}
            placeholder={t('tools.yamlToJson.placeholder')}
            className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={prettify}
                onChange={(e) => {
                  setPrettify(e.target.checked)
                  if (output) handleConvert()
                }}
                className="mr-2"
              />
              <span className="text-sm">{t('tools.yamlToJson.prettifyLabel')}</span>
            </label>
            
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {isConverting ? (
                <ArrowRight className="w-4 h-4 animate-pulse mr-2" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              {t('tools.yamlToJson.convertButton')}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.yamlToJson.outputLabel')}
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
              className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none"
              placeholder="JSON output will appear here..."
            />
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-md">
                <div className="text-center text-red-600 p-4">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Conversion Error</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}