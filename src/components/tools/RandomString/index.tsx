import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, RefreshCw, Check } from 'lucide-react'
import { 
  generateRandomStrings, 
  PRESETS, 
  type RandomStringOptions, 
  type CharacterSet,
  type Preset 
} from '@/utils/generators/randomString'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function RandomStringGenerator() {
  const { t } = useTranslation()
  const [options, setOptions] = useState<RandomStringOptions>({
    length: 12,
    quantity: 1,
    characterSets: ['alphanumeric'],
    excludeAmbiguous: false,
  })
  
  const [results, setResults] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const generated = generateRandomStrings(options)
      setResults(generated)
    } catch (error) {
      console.error('Generation error:', error)
      // TODO: Show error message to user
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async (text: string, index: number) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const handleCopyAll = async () => {
    const allText = results.join('\n')
    const success = await copyToClipboard(allText)
    if (success) {
      setCopiedIndex(-1) // Special index for "copy all"
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }


  const handlePreset = (preset: Preset) => {
    setOptions(prev => ({ ...prev, ...preset.options }))
  }

  const updateCharacterSets = (set: CharacterSet, checked: boolean) => {
    setOptions(prev => ({
      ...prev,
      characterSets: checked 
        ? [...prev.characterSets, set]
        : prev.characterSets.filter(s => s !== set)
    }))
  }

  // Generate initial strings
  useEffect(() => {
    handleGenerate()
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.randomString.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.randomString.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{t('common.settings')}</h2>
            
            {/* Presets */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.randomString.presets')}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePreset(preset)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {t(`tools.randomString.${preset.name}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Length */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.randomString.lengthLabel')}: {options.length}
              </label>
              <input
                type="range"
                min="1"
                max="1000"
                value={options.length}
                onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>1000</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.randomString.quantityLabel')}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={options.quantity}
                onChange={(e) => setOptions(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Character Sets */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('tools.randomString.characterSets')}
              </label>
              <div className="space-y-2">
                {[
                  { key: 'alphanumeric', label: t('tools.randomString.alphanumeric') },
                  { key: 'lowercase', label: t('tools.randomString.lowercase') },
                  { key: 'uppercase', label: t('tools.randomString.uppercase') },
                  { key: 'numbers', label: t('tools.randomString.numbers') },
                  { key: 'symbols', label: t('tools.randomString.symbols') },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={options.characterSets.includes(key as CharacterSet)}
                      onChange={(e) => updateCharacterSets(key as CharacterSet, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Exclude Ambiguous */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.excludeAmbiguous}
                  onChange={(e) => setOptions(prev => ({ ...prev, excludeAmbiguous: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm">{t('tools.randomString.excludeAmbiguous')}</span>
              </label>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {t('tools.randomString.generateButton')}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {t('tools.randomString.generatedStrings')} ({results.length})
              </h2>
              
              {results.length > 0 && (
                <button
                  onClick={handleCopyAll}
                  className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  {copiedIndex === -1 ? (
                    <Check className="w-4 h-4 mr-1 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 mr-1" />
                  )}
                  {t('tools.randomString.copyAll')}
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md font-mono text-sm"
                  >
                    <span className="flex-1 break-all">{result}</span>
                    <button
                      onClick={() => handleCopy(result, index)}
                      className="ml-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={`Copy string ${index + 1}`}
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <RefreshCw className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Click generate to create random strings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}