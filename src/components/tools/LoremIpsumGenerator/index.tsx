import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw, FileText, RefreshCw } from 'lucide-react'
import { 
  generateWords,
  generateSentences, 
  generateParagraphs,
  generateBytes,
  getTextStats,
  type LoremIpsumResult
} from '@/utils/generators/loremIpsum'
import { copyToClipboard } from '@/utils/helpers/clipboard'

type GenerationType = 'words' | 'sentences' | 'paragraphs' | 'bytes'

export default function LoremIpsumGenerator() {
  const { t } = useTranslation()
  const [type, setType] = useState<GenerationType>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<any>(null)

  const handleGenerate = () => {
    setError(null)

    try {
      let result: LoremIpsumResult

      switch (type) {
        case 'words':
          result = generateWords(count, startWithLorem)
          break
        case 'sentences':
          result = generateSentences(count, startWithLorem)
          break
        case 'paragraphs':
          result = generateParagraphs(count, startWithLorem)
          break
        case 'bytes':
          result = generateBytes(count, startWithLorem)
          break
        default:
          result = { success: false, error: t('tools.lorem.errors.invalidType') }
      }

      if (result.success && result.result) {
        setOutput(result.result)
        setStats(getTextStats(result.result))
      } else {
        setError(result.error || t('tools.lorem.errors.generationFailed'))
        setOutput('')
        setStats(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.lorem.errors.unknownError'))
      setOutput('')
      setStats(null)
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

  const clearAll = () => {
    setOutput('')
    setStats(null)
    setError(null)
  }

  // Generate automatically when settings change
  useEffect(() => {
    if (count > 0) {
      handleGenerate()
    }
  }, [type, count, startWithLorem])

  const getCountLabel = () => {
    switch (type) {
      case 'words': return t('tools.lorem.labels.words')
      case 'sentences': return t('tools.lorem.labels.sentences')
      case 'paragraphs': return t('tools.lorem.labels.paragraphs')
      case 'bytes': return t('tools.lorem.labels.bytes')
      default: return t('tools.lorem.labels.count')
    }
  }

  const getMaxCount = () => {
    switch (type) {
      case 'words': return 10000
      case 'sentences': return 1000
      case 'paragraphs': return 100
      case 'bytes': return 1000000
      default: return 100
    }
  }

  const presets = [
    { type: 'paragraphs' as GenerationType, count: 1, label: t('tools.lorem.presets.oneParagraph') },
    { type: 'paragraphs' as GenerationType, count: 3, label: t('tools.lorem.presets.threeParagraphs') },
    { type: 'paragraphs' as GenerationType, count: 5, label: t('tools.lorem.presets.fiveParagraphs') },
    { type: 'sentences' as GenerationType, count: 10, label: t('tools.lorem.presets.tenSentences') },
    { type: 'words' as GenerationType, count: 50, label: t('tools.lorem.presets.fiftyWords') },
    { type: 'words' as GenerationType, count: 100, label: t('tools.lorem.presets.hundredWords') },
    { type: 'bytes' as GenerationType, count: 1000, label: t('tools.lorem.presets.oneKB') },
    { type: 'bytes' as GenerationType, count: 5000, label: t('tools.lorem.presets.fiveKB') }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.lorem.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.lorem.description')}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.lorem.generationType')}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as GenerationType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="paragraphs">{t('tools.lorem.types.paragraphs')}</option>
              <option value="sentences">{t('tools.lorem.types.sentences')}</option>
              <option value="words">{t('tools.lorem.types.words')}</option>
              <option value="bytes">{t('tools.lorem.types.bytes')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getCountLabel()}
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(getMaxCount(), parseInt(e.target.value) || 1)))}
              min="1"
              max={getMaxCount()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('common.generate')}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="startWithLorem"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="startWithLorem" className="text-sm text-gray-700">
              {t('tools.lorem.startWithLorem')}
            </label>
          </div>

          {output && (
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

      {/* Presets */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">{t('tools.lorem.quickPresets')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                setType(preset.type)
                setCount(preset.count)
              }}
              className="p-2 bg-white border border-blue-200 rounded text-sm hover:bg-blue-50 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('tools.lorem.generationError')}</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t('tools.lorem.generatedText')}</h2>
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              {t('common.copy')}
            </button>
          </div>

          <div 
            className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleCopy}
          >
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {output}
            </div>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('tools.lorem.textStatistics')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-600">{t('tools.lorem.stats.characters')}</div>
                  <div className="text-lg">{stats.characters.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">{t('tools.lorem.stats.charactersNoSpaces')}</div>
                  <div className="text-lg">{stats.charactersNoSpaces.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">{t('tools.lorem.stats.words')}</div>
                  <div className="text-lg">{stats.words.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">{t('tools.lorem.stats.sentences')}</div>
                  <div className="text-lg">{stats.sentences.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">{t('tools.lorem.stats.paragraphs')}</div>
                  <div className="text-lg">{stats.paragraphs.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">{t('tools.lorem.stats.bytes')}</div>
                  <div className="text-lg">{stats.bytes.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Output State */}
      {!output && !error && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>{t('tools.lorem.configurePrompt')}</p>
        </div>
      )}

      {/* Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('tools.lorem.aboutTitle')}</h3>
        <p className="text-sm text-gray-600">
          {t('tools.lorem.aboutDescription')}
        </p>
      </div>
    </div>
  )
}