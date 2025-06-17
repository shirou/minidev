import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw } from 'lucide-react'
import { getAllCaseConversions, type CaseConversionResult } from '@/utils/converters/case'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function CaseConverter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [conversions, setConversions] = useState<Record<string, CaseConversionResult>>({})
  const [error, setError] = useState<string | null>(null)
  const [copiedCase, setCopiedCase] = useState<string | null>(null)

  const handleConvert = () => {
    if (!input.trim()) {
      setConversions({})
      setError(null)
      return
    }

    setError(null)

    try {
      const results = getAllCaseConversions(input)
      setConversions(results)
      
      // Check if any conversion failed
      const failures = Object.entries(results).filter(([_, result]) => !result.success)
      if (failures.length > 0) {
        setError(t('tools.case.someConversionsFailed', { failures: failures.map(([name]) => name).join(', ') }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.case.unknownError'))
      setConversions({})
    }
  }

  const handleCopy = async (caseType: string, text: string) => {
    if (!text) return
    
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedCase(caseType)
      setTimeout(() => setCopiedCase(null), 2000)
    }
  }

  const clearAll = () => {
    setInput('')
    setConversions({})
    setError(null)
  }

  // Convert automatically when input changes
  useEffect(() => {
    handleConvert()
  }, [input])

  const caseExamples = [
    { input: 'hello world', description: t('tools.case.examples.spaceSeparated') },
    { input: 'HelloWorld', description: t('tools.case.examples.pascalCase') },
    { input: 'helloWorld', description: t('tools.case.examples.camelCase') },
    { input: 'hello_world', description: t('tools.case.examples.snakeCase') },
    { input: 'hello-world', description: t('tools.case.examples.kebabCase') },
    { input: 'HELLO_WORLD', description: t('tools.case.examples.constantCase') }
  ]

  const setExampleInput = (example: string) => {
    setInput(example)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.case.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.case.description')}
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('tools.case.inputText')}
          </label>
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
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('tools.case.placeholder')}
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
        />
        
        {input && (
          <div className="mt-2 text-xs text-gray-500">
            {t('tools.case.inputLength', { length: input.length })}
          </div>
        )}
      </div>

      {/* Examples */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">{t('tools.case.tryExamples')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {caseExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setExampleInput(example.input)}
              className="text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
            >
              <code className="text-sm text-blue-700">{example.input}</code>
              <div className="text-xs text-gray-600 mt-1">{example.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('tools.case.conversionError')}</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      {/* Conversions Grid */}
      {Object.keys(conversions).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(conversions).map(([caseType, result]) => (
            <div
              key={caseType}
              className={`bg-white border rounded-lg p-4 ${
                result.success ? 'border-gray-200' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">{caseType}</h3>
                {result.success && result.result && (
                  <button
                    onClick={() => handleCopy(caseType, result.result!)}
                    className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copiedCase === caseType ? (
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
                  className="p-3 bg-gray-50 rounded border font-mono text-sm break-all cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => result.result && handleCopy(caseType, result.result)}
                >
                  {result.result || t('tools.case.empty')}
                </div>
              ) : (
                <div className="p-3 bg-red-100 border border-red-200 rounded text-sm text-red-600">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {result.error || t('tools.case.conversionFailed')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Input State */}
      {!input && (
        <div className="text-center py-12 text-gray-500">
          <p>{t('tools.case.enterTextPrompt')}</p>
        </div>
      )}
    </div>
  )
}