import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Upload, Copy, Check, AlertCircle, File } from 'lucide-react'
import { 
  encodeToBase64, 
  encodeFileToBase64
} from '@/utils/converters/base64'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function Base64Encoder() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEncode = async () => {
    if (!input.trim()) {
      setOutput('')
      setError(null)
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const result = encodeToBase64(input)
      
      if (result.success && result.result !== undefined) {
        setOutput(result.result)
      } else {
        setError(result.error || 'Encoding failed')
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

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsProcessing(true)
    setError(null)

    try {
      const result = await encodeFileToBase64(file)
      
      if (result.success && result.result) {
        setOutput(result.result)
        setInput('') // Clear text input when file is uploaded
      } else {
        setError(result.error || 'File encoding failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError(null)
    setUploadedFile(null)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.base64Encoder.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.base64Encoder.description')}
        </p>
      </div>

      {/* File Upload Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{t('tools.base64Encoder.fileUpload')}</h2>
        
        <div
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleFileSelect}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">{t('tools.base64Encoder.dragDropText')}</p>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
          />
        </div>

        {uploadedFile && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {t('tools.base64Encoder.fileInfo')}
            </h3>
            <div className="flex items-center">
              <File className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <p className="text-sm">{t('tools.base64Encoder.fileName')}: {uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {t('tools.base64Encoder.fileSize')}: {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.base64Encoder.textInput')}
            </label>
            {(input || output) && (
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setUploadedFile(null) // Clear file when typing
            }}
            onBlur={handleEncode}
            placeholder={t('tools.base64Encoder.placeholder')}
            className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />
          
          <button
            onClick={handleEncode}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {t('tools.base64Encoder.encodeButton')}
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('tools.base64Encoder.base64Output')}
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
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none break-all"
              placeholder="Base64 encoded output will appear here..."
            />
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-md">
                <div className="text-center text-red-600 p-4">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Encoding Error</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {output && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-600">
                Output length: {output.length.toLocaleString()} characters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}