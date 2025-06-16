import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, Copy, Check, AlertCircle } from 'lucide-react'
import { 
  decodeFromBase64, 
  downloadBase64AsFile,
  getBase64FileInfo,
  isValidBase64
} from '@/utils/converters/base64'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function Base64Decoder() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadFileName, setDownloadFileName] = useState('decoded-file.txt')

  const handleDecode = async () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const result = decodeFromBase64(input)
      
      if (result.success && result.result !== undefined) {
        setOutput(result.result)
      } else {
        setError(result.error || 'Decoding failed')
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

  const handleDownload = () => {
    if (!output || !isValidBase64(input.replace(/\s/g, ''))) return
    
    downloadBase64AsFile(input.replace(/\s/g, ''), downloadFileName)
  }

  const loadExample = () => {
    const exampleBase64 = 'SGVsbG8gV29ybGQhIFRoaXMgaXMgYSBCYXNlNjQgZXhhbXBsZS4='
    setInput(exampleBase64)
    setError(null)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
  }

  const fileInfo = input && isValidBase64(input.replace(/\s/g, '')) ? getBase64FileInfo(input.replace(/\s/g, '')) : null

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.base64Decoder.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.base64Decoder.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.base64Decoder.base64Input')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Load Example
              </button>
              {(input || output) && (
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={handleDecode}
            placeholder={t('tools.base64Decoder.placeholder')}
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none break-all"
          />
          
          <button
            onClick={handleDecode}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {t('tools.base64Decoder.decodeButton')}
          </button>

          {/* File Info */}
          {fileInfo && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Base64 Info
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Input length: {input.replace(/\s/g, '').length.toLocaleString()} characters</p>
                <p>Decoded size: {fileInfo.sizeFormatted}</p>
                <p>Format: Valid Base64</p>
              </div>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.base64Decoder.textOutput')}
            </label>
            
            <div className="flex gap-2">
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
          </div>

          <div className="relative">
            <textarea
              value={output}
              readOnly
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none"
              placeholder="Decoded text will appear here..."
            />
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-md">
                <div className="text-center text-red-600 p-4">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Decoding Error</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Download Section */}
          {output && isValidBase64(input.replace(/\s/g, '')) && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-green-700">
                  {t('tools.base64Decoder.downloadDecoded')}
                </h3>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={downloadFileName}
                  onChange={(e) => setDownloadFileName(e.target.value)}
                  placeholder={t('tools.base64Decoder.downloadFileName')}
                  className="flex-1 px-3 py-2 text-sm border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded-md transition-colors"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}