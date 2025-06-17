import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, FileText, Clock, BarChart3, RotateCcw, Upload } from 'lucide-react'
import { 
  analyzeText, 
  getReadabilityScore,
  formatTime,
  type TextStats
} from '@/utils/analyzers/textStats'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function WordCounter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [stats, setStats] = useState<TextStats | null>(null)
  const [readability, setReadability] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = () => {
    const textStats = analyzeText(input)
    setStats(textStats)
    setReadability(getReadabilityScore(textStats))
  }

  const handleCopy = async () => {
    if (!stats) return
    
    const summary = `${t('tools.wordCounter.textStatistics')}:
${t('tools.wordCounter.characters')}: ${stats.characters.toLocaleString()}
${t('tools.wordCounter.charactersNoSpaces')}: ${stats.charactersNoSpaces.toLocaleString()}
${t('tools.wordCounter.words')}: ${stats.words.toLocaleString()}
${t('tools.wordCounter.sentences')}: ${stats.sentences.toLocaleString()}
${t('tools.wordCounter.paragraphs')}: ${stats.paragraphs.toLocaleString()}
${t('tools.wordCounter.readingTime')}: ${formatTime(stats.readingTime)}
${t('tools.wordCounter.speakingTime')}: ${formatTime(stats.speakingTime)}`
    
    const success = await copyToClipboard(summary)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    } else {
      alert(t('tools.wordCounter.fileTypeError'))
    }
  }

  const clearAll = () => {
    setInput('')
    setStats(null)
    setReadability(null)
  }

  // Analyze automatically when input changes
  useEffect(() => {
    handleAnalyze()
  }, [input])

  const statCards = stats ? [
    {
      icon: FileText,
      label: t('tools.wordCounter.characters'),
      value: stats.characters.toLocaleString(),
      subValue: t('tools.wordCounter.withoutSpaces', { count: stats.charactersNoSpaces })
    },
    {
      icon: FileText,
      label: t('tools.wordCounter.words'),
      value: stats.words.toLocaleString(),
      subValue: stats.longestWord ? t('tools.wordCounter.longest', { word: stats.longestWord }) : ''
    },
    {
      icon: FileText,
      label: t('tools.wordCounter.sentences'),
      value: stats.sentences.toLocaleString(),
      subValue: stats.averageWordsPerSentence > 0 ? t('tools.wordCounter.wordsPerSentence', { avg: stats.averageWordsPerSentence.toFixed(1) }) : ''
    },
    {
      icon: FileText,
      label: t('tools.wordCounter.paragraphs'),
      value: stats.paragraphs.toLocaleString(),
      subValue: stats.averageSentencesPerParagraph > 0 ? t('tools.wordCounter.sentencesPerParagraph', { avg: stats.averageSentencesPerParagraph.toFixed(1) }) : ''
    },
    {
      icon: FileText,
      label: t('tools.wordCounter.lines'),
      value: stats.lines.toLocaleString(),
      subValue: t('tools.wordCounter.bytes', { count: stats.bytes })
    },
    {
      icon: Clock,
      label: t('tools.wordCounter.readingTime'),
      value: formatTime(stats.readingTime),
      subValue: t('tools.wordCounter.readingSpeed')
    },
    {
      icon: Clock,
      label: t('tools.wordCounter.speakingTime'),
      value: formatTime(stats.speakingTime),
      subValue: t('tools.wordCounter.speakingSpeed')
    },
    {
      icon: BarChart3,
      label: t('tools.wordCounter.readability'),
      value: readability ? readability.level : 'N/A',
      subValue: readability ? t('tools.wordCounter.scoreValue', { score: readability.score.toFixed(0) }) : ''
    }
  ] : []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.wordCounter.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.wordCounter.description')}
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('tools.wordCounter.textInput')}
          </label>
          
          <div className="flex items-center space-x-2">
            <label className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              <span className="text-sm">{t('tools.wordCounter.uploadFile')}</span>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".txt,.md,text/*"
                className="hidden"
              />
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
        </div>
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('tools.wordCounter.placeholder')}
          className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
        />
      </div>

      {/* Statistics Grid */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <card.icon className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-700">{card.label}</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              {card.subValue && (
                <div className="text-xs text-gray-500 mt-1">{card.subValue}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Detailed Analysis */}
      {stats && stats.words > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Frequent Words */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">{t('tools.wordCounter.mostFrequentWords')}</h3>
            {stats.mostFrequentWords.length > 0 ? (
              <div className="space-y-2">
                {stats.mostFrequentWords.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{item.word}</span>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{
                            width: `${(item.count / stats.mostFrequentWords[0].count) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">{t('tools.wordCounter.noSignificantWords')}</p>
            )}
          </div>

          {/* Readability Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">{t('tools.wordCounter.readabilityAnalysis')}</h3>
            {readability && (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{t('tools.wordCounter.readingLevel')}</span>
                    <span className="text-sm font-bold text-blue-600">{readability.level}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${readability.score}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t('tools.wordCounter.scoreOutOf100', { score: readability.score.toFixed(0) })}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{readability.description}</p>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>• {t('tools.wordCounter.averageWordsPerSentenceValue', { avg: stats.averageWordsPerSentence.toFixed(1) })}</div>
                    <div>• {t('tools.wordCounter.averageSentencesPerParagraphValue', { avg: stats.averageSentencesPerParagraph.toFixed(1) })}</div>
                    {stats.shortestWord && (
                      <div>• {t('tools.wordCounter.shortestWordValue', { word: stats.shortestWord })}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Export Statistics */}
      {stats && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">{t('tools.wordCounter.exportStatistics')}</h3>
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm">{t('tools.wordCounter.copySummary')}</span>
            </button>
          </div>
        </div>
      )}

      {/* No Input State */}
      {!input && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>{t('tools.wordCounter.enterTextPrompt')}</p>
        </div>
      )}

      {/* Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">{t('tools.wordCounter.howItWorks')}</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>{t('tools.wordCounter.realTimeAnalysisLabel')}</strong> {t('tools.wordCounter.realTimeDescription')}</li>
          <li>• <strong>{t('tools.wordCounter.readingTimeLabel')}</strong> {t('tools.wordCounter.readingTimeDescription')}</li>
          <li>• <strong>{t('tools.wordCounter.speakingTimeLabel')}</strong> {t('tools.wordCounter.speakingTimeDescription')}</li>
          <li>• <strong>{t('tools.wordCounter.readabilityScoreLabel')}</strong> {t('tools.wordCounter.readabilityScoreDescription')}</li>
          <li>• <strong>{t('tools.wordCounter.wordFrequencyLabel')}</strong> {t('tools.wordCounter.wordFrequencyDescription')}</li>
        </ul>
      </div>
    </div>
  )
}