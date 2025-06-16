import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Code, Minimize2, Copy, Check, AlertCircle } from 'lucide-react'
import { formatXml, minifyXml, DEFAULT_XML_OPTIONS, type XmlFormatOptions } from '@/utils/formatters/xml'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function XmlFormatter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [options, setOptions] = useState<XmlFormatOptions>(DEFAULT_XML_OPTIONS)

  const handleFormat = async () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const result = formatXml(input, options)
      
      if (result.success && result.result) {
        setOutput(result.result)
      } else {
        setError(result.error || 'Formatting failed')
        setOutput('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setOutput('')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleMinify = async () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const result = minifyXml(input)
      
      if (result.success && result.result) {
        setOutput(result.result)
      } else {
        setError(result.error || 'Minification failed')
        setOutput('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setOutput('')
    } finally {
      setIsProcessing(false)
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
    setInput(t('tools.xmlFormatter.example'))
    setError(null)
  }

  const updateOptions = (key: keyof XmlFormatOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.xmlFormatter.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.xmlFormatter.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Options Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">{t('tools.xmlFormatter.options')}</h2>
            
            {/* Indent Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.xmlFormatter.indentSize')}: {options.indentSize}
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={options.indentSize}
                onChange={(e) => updateOptions('indentSize', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>8</span>
              </div>
            </div>

            {/* Indent Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.xmlFormatter.indentType')}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="indentType"
                    value="spaces"
                    checked={options.indentType === 'spaces'}
                    onChange={() => updateOptions('indentType', 'spaces')}
                    className="mr-2"
                  />
                  <span className="text-sm">{t('tools.xmlFormatter.spaces')}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="indentType"
                    value="tabs"
                    checked={options.indentType === 'tabs'}
                    onChange={() => updateOptions('indentType', 'tabs')}
                    className="mr-2"
                  />
                  <span className="text-sm">{t('tools.xmlFormatter.tabs')}</span>
                </label>
              </div>
            </div>

            {/* Options checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.removeComments}
                  onChange={(e) => updateOptions('removeComments', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">{t('tools.xmlFormatter.removeComments')}</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.sortAttributes}
                  onChange={(e) => updateOptions('sortAttributes', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">{t('tools.xmlFormatter.sortAttributes')}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Input/Output Panel */}
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                {t('tools.xmlFormatter.inputLabel')}
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
              placeholder={t('tools.xmlFormatter.placeholder')}
              className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
            />
            
            <div className="flex gap-2">
              <button
                onClick={handleFormat}
                disabled={isProcessing}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
              >
                {isProcessing ? (
                  <Code className="w-4 h-4 animate-pulse mr-2" />
                ) : (
                  <Code className="w-4 h-4 mr-2" />
                )}
                {t('tools.xmlFormatter.formatButton')}
              </button>
              
              <button
                onClick={handleMinify}
                disabled={isProcessing}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center justify-center"
              >
                {isProcessing ? (
                  <Minimize2 className="w-4 h-4 animate-pulse mr-2" />
                ) : (
                  <Minimize2 className="w-4 h-4 mr-2" />
                )}
                {t('tools.xmlFormatter.minifyButton')}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                {t('tools.xmlFormatter.outputLabel')}
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
                placeholder="Formatted XML will appear here..."
              />
              
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-md">
                  <div className="text-center text-red-600 p-4">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Formatting Error</p>
                    <p className="text-xs mt-1">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}