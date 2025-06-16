import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, Info, RefreshCw } from 'lucide-react'
import { 
  generateUUIDv1,
  generateUUIDv2,
  generateUUIDv3,
  generateUUIDv4,
  generateUUIDv5,
  generateUUIDv6,
  generateUUIDv7,
  parseUUID,
  isValidUUID,
  NAMESPACE_DNS,
  NAMESPACE_URL,
  NAMESPACE_OID,
  NAMESPACE_X500,
  type UUIDInfo
} from '@/utils/converters/uuid'
import { copyToClipboard } from '@/utils/helpers/clipboard'

interface UUIDResult {
  version: number
  uuid: string
  info: UUIDInfo | null
  error: string | null
}

export default function UUIDGenerator() {
  const { t } = useTranslation()
  const [selectedVersion, setSelectedVersion] = useState<number>(4)
  const [result, setResult] = useState<UUIDResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Settings for name-based UUIDs
  const [namespace, setNamespace] = useState(NAMESPACE_DNS)
  const [name, setName] = useState('')

  const generateUUID = async () => {
    setIsGenerating(true)
    setResult(null)

    try {
      let uuidResult
      
      switch (selectedVersion) {
        case 1:
          uuidResult = generateUUIDv1()
          break
        case 2:
          uuidResult = generateUUIDv2()
          break
        case 3:
          if (!name.trim()) {
            setResult({
              version: 3,
              uuid: '',
              info: null,
              error: 'Name required for UUID v3'
            })
            return
          }
          uuidResult = await generateUUIDv3(namespace, name)
          break
        case 4:
          uuidResult = generateUUIDv4()
          break
        case 5:
          if (!name.trim()) {
            setResult({
              version: 5,
              uuid: '',
              info: null,
              error: 'Name required for UUID v5'
            })
            return
          }
          uuidResult = await generateUUIDv5(namespace, name)
          break
        case 6:
          uuidResult = generateUUIDv6()
          break
        case 7:
          uuidResult = generateUUIDv7()
          break
        default:
          uuidResult = generateUUIDv4()
      }

      if (uuidResult) {
        setResult({
          version: selectedVersion,
          uuid: uuidResult.success ? uuidResult.result! : '',
          info: uuidResult.success ? parseUUID(uuidResult.result!) : null,
          error: uuidResult.error || null
        })
      }
    } catch (error) {
      setResult({
        version: selectedVersion,
        uuid: '',
        info: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Generate initial UUID v4 on component mount
  useEffect(() => {
    generateUUID()
  }, [])

  // Regenerate when version changes
  useEffect(() => {
    generateUUID()
  }, [selectedVersion])

  // Regenerate when name or namespace changes for name-based UUIDs
  useEffect(() => {
    if (needsNameInput && name.trim()) {
      generateUUID()
    }
  }, [name, namespace])

  const handleCopy = async () => {
    if (!result?.uuid) return
    
    const success = await copyToClipboard(result.uuid)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getVersionDescription = (version: number): string => {
    switch (version) {
      case 1: return t('tools.uuidGenerator.v1Description')
      case 2: return t('tools.uuidGenerator.v2Description')
      case 3: return t('tools.uuidGenerator.v3Description')
      case 4: return t('tools.uuidGenerator.v4Description')
      case 5: return t('tools.uuidGenerator.v5Description')
      case 6: return t('tools.uuidGenerator.v6Description')
      case 7: return t('tools.uuidGenerator.v7Description')
      default: return ''
    }
  }

  const predefinedNamespaces = [
    { value: NAMESPACE_DNS, label: 'DNS' },
    { value: NAMESPACE_URL, label: 'URL' },
    { value: NAMESPACE_OID, label: 'OID' },
    { value: NAMESPACE_X500, label: 'X.500' }
  ]

  const versionOptions = [
    { value: 1, label: 'UUID v1', description: t('tools.uuidGenerator.v1Description') },
    { value: 2, label: 'UUID v2', description: t('tools.uuidGenerator.v2Description') },
    { value: 3, label: 'UUID v3', description: t('tools.uuidGenerator.v3Description') },
    { value: 4, label: 'UUID v4', description: t('tools.uuidGenerator.v4Description') },
    { value: 5, label: 'UUID v5', description: t('tools.uuidGenerator.v5Description') },
    { value: 6, label: 'UUID v6', description: t('tools.uuidGenerator.v6Description') },
    { value: 7, label: 'UUID v7', description: t('tools.uuidGenerator.v7Description') }
  ]

  const needsNameInput = selectedVersion === 3 || selectedVersion === 5

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.uuidGenerator.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.uuidGenerator.description')}
        </p>
      </div>

      {/* Version Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{t('tools.uuidGenerator.selectVersion')}</h2>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {t('tools.uuidGenerator.version')}
          </label>
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {versionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
        </div>

        {/* Name-based UUID Settings (v3 and v5) */}
        {needsNameInput && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700">
              {t('tools.uuidGenerator.nameBasedSettings')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t('tools.uuidGenerator.namespace')}
                </label>
                <select
                  value={namespace}
                  onChange={(e) => setNamespace(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {predefinedNamespaces.map(ns => (
                    <option key={ns.value} value={ns.value}>{ns.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t('tools.uuidGenerator.name')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('tools.uuidGenerator.namePlaceholder')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={generateUUID}
          disabled={isGenerating}
          className="mt-6 flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {t('tools.uuidGenerator.generate')}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              UUID v{result.version} {t('tools.uuidGenerator.result')}
            </h2>
            
            {result.uuid && (
              <button
                onClick={handleCopy}
                className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
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

          {result.error ? (
            <div className="flex items-center text-red-600 text-sm p-4 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4 mr-2" />
              {result.error}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="font-mono text-lg bg-gray-50 p-4 rounded border break-all">
                {result.uuid}
              </div>
              
              {result.info && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div><strong>Version:</strong> {result.info.version}</div>
                    <div><strong>Variant:</strong> {result.info.variant}</div>
                  </div>
                  <div className="space-y-2">
                    {result.info.timestamp && (
                      <div><strong>Timestamp:</strong> {result.info.timestamp}</div>
                    )}
                    {result.info.node && (
                      <div><strong>Node:</strong> {result.info.node}</div>
                    )}
                    {result.info.clockSequence !== undefined && (
                      <div><strong>Clock Sequence:</strong> {result.info.clockSequence}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Information Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          {t('tools.uuidGenerator.about')}
        </h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p>{t('tools.uuidGenerator.aboutText')}</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>v1, v6:</strong> {t('tools.uuidGenerator.timeBased')}</li>
            <li><strong>v2:</strong> {t('tools.uuidGenerator.dceSecurity')}</li>
            <li><strong>v3, v5:</strong> {t('tools.uuidGenerator.nameBased')}</li>
            <li><strong>v4:</strong> {t('tools.uuidGenerator.random')}</li>
            <li><strong>v7:</strong> {t('tools.uuidGenerator.unixTimeBased')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}