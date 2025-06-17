import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw, Type, ArrowUpDown } from 'lucide-react'
import { 
  trimText,
  removeExtraWhitespace,
  replaceText,
  splitText,
  joinLines,
  removeDuplicateLines,
  sortLines,
  addLineNumbers,
  addPrefixSuffix,
  extractColumns,
  getLineStats,
  type StringProcessResult
} from '@/utils/processors/stringUtils'
import { copyToClipboard } from '@/utils/helpers/clipboard'

type OperationType = 
  | 'trim' 
  | 'removeWhitespace' 
  | 'replace' 
  | 'split' 
  | 'join' 
  | 'removeDuplicates' 
  | 'sort' 
  | 'lineNumbers' 
  | 'prefixSuffix' 
  | 'extractColumns'

export default function StringUtilities() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [operation, setOperation] = useState<OperationType>('trim')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<any>(null)

  // Operation-specific settings
  const [trimType, setTrimType] = useState<'both' | 'start' | 'end'>('both')
  const [searchText, setSearchText] = useState('')
  const [replaceWith, setReplaceWith] = useState('')
  const [replaceOptions, setReplaceOptions] = useState({
    caseSensitive: true,
    wholeWordsOnly: false,
    useRegex: false,
    replaceAll: true
  })
  const [splitDelimiter, setSplitDelimiter] = useState(',')
  const [splitOptions, setSplitOptions] = useState({
    useRegex: false,
    removeEmpty: true,
    trimResults: true
  })
  const [joinDelimiter, setJoinDelimiter] = useState(' ')
  const [duplicatesCaseSensitive, setDuplicatesCaseSensitive] = useState(true)
  const [sortOptions, setSortOptions] = useState({
    direction: 'asc' as 'asc' | 'desc',
    caseSensitive: true,
    numeric: false,
    removeEmpty: false
  })
  const [lineNumberOptions, setLineNumberOptions] = useState({
    startFrom: 1,
    padZeros: false,
    separator: '. '
  })
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const [columnDelimiter, setColumnDelimiter] = useState(',')
  const [columnIndices, setColumnIndices] = useState('1,2')

  const handleProcess = () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      setStats(null)
      return
    }

    setError(null)

    try {
      let result: StringProcessResult

      switch (operation) {
        case 'trim':
          result = trimText(input, trimType)
          break
        case 'removeWhitespace':
          result = removeExtraWhitespace(input)
          break
        case 'replace':
          result = replaceText(input, searchText, replaceWith, replaceOptions)
          break
        case 'split':
          result = splitText(input, splitDelimiter, splitOptions)
          break
        case 'join':
          result = joinLines(input, joinDelimiter)
          break
        case 'removeDuplicates':
          result = removeDuplicateLines(input, duplicatesCaseSensitive)
          break
        case 'sort':
          result = sortLines(input, sortOptions)
          break
        case 'lineNumbers':
          result = addLineNumbers(input, lineNumberOptions)
          break
        case 'prefixSuffix':
          result = addPrefixSuffix(input, prefix, suffix)
          break
        case 'extractColumns':
          const indices = columnIndices.split(',').map(i => parseInt(i.trim())).filter(i => !isNaN(i))
          result = extractColumns(input, columnDelimiter, indices)
          break
        default:
          result = { success: false, error: t('tools.stringUtils.errors.invalidOperation') }
      }

      if (result.success && result.result !== undefined) {
        setOutput(result.result)
        setStats(getLineStats(result.result))
      } else {
        setError(result.error || t('tools.stringUtils.errors.processingFailed'))
        setOutput('')
        setStats(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.stringUtils.errors.unknownError'))
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

  const swapInputOutput = () => {
    if (output) {
      setInput(output)
      setOutput('')
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
    setStats(null)
  }

  // Process automatically when input or settings change
  useEffect(() => {
    handleProcess()
  }, [input, operation, trimType, searchText, replaceWith, replaceOptions, splitDelimiter, splitOptions, joinDelimiter, duplicatesCaseSensitive, sortOptions, lineNumberOptions, prefix, suffix, columnDelimiter, columnIndices])

  const operationNames = {
    trim: t('tools.stringUtils.operations.trim'),
    removeWhitespace: t('tools.stringUtils.operations.removeWhitespace'),
    replace: t('tools.stringUtils.operations.replace'),
    split: t('tools.stringUtils.operations.split'),
    join: t('tools.stringUtils.operations.join'),
    removeDuplicates: t('tools.stringUtils.operations.removeDuplicates'),
    sort: t('tools.stringUtils.operations.sort'),
    lineNumbers: t('tools.stringUtils.operations.lineNumbers'),
    prefixSuffix: t('tools.stringUtils.operations.prefixSuffix'),
    extractColumns: t('tools.stringUtils.operations.extractColumns')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.stringUtils.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.stringUtils.description')}
        </p>
      </div>

      {/* Operation Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.stringUtils.operation')}
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as OperationType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(operationNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={swapInputOutput}
              disabled={!output}
              className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              <ArrowUpDown className="w-4 h-4 mr-1" />
              {t('tools.stringUtils.swapIO')}
            </button>

            <button
              onClick={clearAll}
              disabled={!input && !output}
              className="flex items-center px-3 py-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {t('common.clear')}
            </button>
          </div>
        </div>

        {/* Operation-specific controls */}
        {operation === 'trim' && (
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.trimType')}</label>
            <select
              value={trimType}
              onChange={(e) => setTrimType(e.target.value as 'both' | 'start' | 'end')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="both">{t('tools.stringUtils.trimOptions.both')}</option>
              <option value="start">{t('tools.stringUtils.trimOptions.start')}</option>
              <option value="end">{t('tools.stringUtils.trimOptions.end')}</option>
            </select>
          </div>
        )}

        {operation === 'replace' && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.find')}</label>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={t('tools.stringUtils.findPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.replaceWith')}</label>
                <input
                  type="text"
                  value={replaceWith}
                  onChange={(e) => setReplaceWith(e.target.value)}
                  placeholder={t('tools.stringUtils.replacePlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={replaceOptions.caseSensitive}
                  onChange={(e) => setReplaceOptions({...replaceOptions, caseSensitive: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.caseSensitive')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={replaceOptions.wholeWordsOnly}
                  onChange={(e) => setReplaceOptions({...replaceOptions, wholeWordsOnly: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.wholeWordsOnly')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={replaceOptions.useRegex}
                  onChange={(e) => setReplaceOptions({...replaceOptions, useRegex: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.useRegex')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={replaceOptions.replaceAll}
                  onChange={(e) => setReplaceOptions({...replaceOptions, replaceAll: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.replaceAll')}
              </label>
            </div>
          </div>
        )}

        {operation === 'split' && (
          <div className="border-t pt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.delimiter')}</label>
              <input
                type="text"
                value={splitDelimiter}
                onChange={(e) => setSplitDelimiter(e.target.value)}
                placeholder={t('tools.stringUtils.delimiterPlaceholder')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={splitOptions.useRegex}
                  onChange={(e) => setSplitOptions({...splitOptions, useRegex: e.target.checked})}
                  className="mr-2"
                />
                Use regex
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={splitOptions.removeEmpty}
                  onChange={(e) => setSplitOptions({...splitOptions, removeEmpty: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.removeEmpty')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={splitOptions.trimResults}
                  onChange={(e) => setSplitOptions({...splitOptions, trimResults: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.trimResults')}
              </label>
            </div>
          </div>
        )}

        {operation === 'join' && (
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.joinDelimiter')}</label>
            <input
              type="text"
              value={joinDelimiter}
              onChange={(e) => setJoinDelimiter(e.target.value)}
              placeholder={t('tools.stringUtils.joinDelimiterPlaceholder')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {operation === 'removeDuplicates' && (
          <div className="border-t pt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={duplicatesCaseSensitive}
                onChange={(e) => setDuplicatesCaseSensitive(e.target.checked)}
                className="mr-2"
              />
              {t('tools.stringUtils.caseSensitiveComparison')}
            </label>
          </div>
        )}

        {operation === 'sort' && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.direction')}</label>
                <select
                  value={sortOptions.direction}
                  onChange={(e) => setSortOptions({...sortOptions, direction: e.target.value as 'asc' | 'desc'})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="asc">{t('tools.stringUtils.ascending')}</option>
                  <option value="desc">{t('tools.stringUtils.descending')}</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortOptions.caseSensitive}
                  onChange={(e) => setSortOptions({...sortOptions, caseSensitive: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.caseSensitive')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortOptions.numeric}
                  onChange={(e) => setSortOptions({...sortOptions, numeric: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.numericSort')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sortOptions.removeEmpty}
                  onChange={(e) => setSortOptions({...sortOptions, removeEmpty: e.target.checked})}
                  className="mr-2"
                />
                {t('tools.stringUtils.removeEmptyLines')}
              </label>
            </div>
          </div>
        )}

        {operation === 'lineNumbers' && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.startFrom')}</label>
                <input
                  type="number"
                  value={lineNumberOptions.startFrom}
                  onChange={(e) => setLineNumberOptions({...lineNumberOptions, startFrom: parseInt(e.target.value) || 1})}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.separator')}</label>
                <input
                  type="text"
                  value={lineNumberOptions.separator}
                  onChange={(e) => setLineNumberOptions({...lineNumberOptions, separator: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={lineNumberOptions.padZeros}
                    onChange={(e) => setLineNumberOptions({...lineNumberOptions, padZeros: e.target.checked})}
                    className="mr-2"
                  />
                  {t('tools.stringUtils.padWithZeros')}
                </label>
              </div>
            </div>
          </div>
        )}

        {operation === 'prefixSuffix' && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.prefix')}</label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder={t('tools.stringUtils.prefixPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.suffix')}</label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder={t('tools.stringUtils.suffixPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {operation === 'extractColumns' && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.columnDelimiter')}</label>
                <input
                  type="text"
                  value={columnDelimiter}
                  onChange={(e) => setColumnDelimiter(e.target.value)}
                  placeholder={t('tools.stringUtils.columnDelimiterPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.stringUtils.columnNumbers')}</label>
                <input
                  type="text"
                  value={columnIndices}
                  onChange={(e) => setColumnIndices(e.target.value)}
                  placeholder={t('tools.stringUtils.columnNumbersPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('tools.stringUtils.processingError')}</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">{t('tools.stringUtils.inputText')}</label>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('tools.stringUtils.inputPlaceholder')}
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />
          
          {input && (
            <div className="text-xs text-gray-500">
              {t('tools.stringUtils.inputStats', { chars: input.length, lines: input.split('\n').length })}
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">{t('tools.stringUtils.outputText')}</label>
            
            {output && (
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
            )}
          </div>

          <textarea
            value={output}
            readOnly
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none"
            placeholder={t('tools.stringUtils.outputPlaceholder')}
          />

          {stats && (
            <div className="text-xs text-gray-500 space-y-1">
              <div>{t('tools.stringUtils.outputStats', { chars: output.length, lines: stats.totalLines })}</div>
              {stats.emptyLines > 0 && <div>{t('tools.stringUtils.emptyLinesCount', { count: stats.emptyLines })}</div>}
              {stats.longestLine > 0 && <div>{t('tools.stringUtils.longestLine', { length: stats.longestLine })}</div>}
            </div>
          )}
        </div>
      </div>

      {/* No Input State */}
      {!input && (
        <div className="text-center py-12 text-gray-500">
          <Type className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>{t('tools.stringUtils.enterTextPrompt')}</p>
        </div>
      )}
    </div>
  )
}