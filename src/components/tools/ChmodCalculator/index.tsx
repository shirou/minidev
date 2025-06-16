import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertTriangle, Terminal, BookOpen, Settings } from 'lucide-react'
import { 
  calculateChmod,
  permissionsToOctal,
  octalToPermissions,
  getSecurityWarnings,
  getPermissionExplanations,
  PERMISSION_PRESETS,
  type UnixPermissions,
  type Permission,
  type ChmodResult
} from '@/utils/converters/chmodCalculator'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function ChmodCalculator() {
  const { t } = useTranslation()
  const [permissions, setPermissions] = useState<UnixPermissions>({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: true },
    specialBits: { sticky: false, setuid: false, setgid: false }
  })
  const [octalInput, setOctalInput] = useState('755')
  const [symbolicInput, setSymbolicInput] = useState('rwxr-xr-x')
  const [result, setResult] = useState<ChmodResult | null>(null)
  const [copied, setCopied] = useState<{[key: string]: boolean}>({})
  const [activeTab, setActiveTab] = useState<'visual' | 'input'>('visual')

  // Calculate result when permissions change
  useEffect(() => {
    try {
      const newResult = calculateChmod(permissions)
      setResult(newResult)
      setOctalInput(newResult.octal)
      setSymbolicInput(newResult.symbolic)
    } catch (error) {
      console.error('Error calculating chmod:', error)
    }
  }, [permissions])

  // Handle octal input change
  const handleOctalChange = (value: string) => {
    setOctalInput(value)
    if (/^[0-7]{3,4}$/.test(value)) {
      try {
        const newPermissions = octalToPermissions(value)
        setPermissions(newPermissions)
      } catch (error) {
        console.error('Invalid octal:', error)
      }
    }
  }

  // Handle symbolic input change
  const handleSymbolicChange = (value: string) => {
    setSymbolicInput(value)
    if (/^[rwx-]{9}$/.test(value) || /^[rwxstST-]{9,10}$/.test(value)) {
      try {
        const newResult = calculateChmod(value)
        setPermissions(newResult.permissions)
      } catch (error) {
        console.error('Invalid symbolic:', error)
      }
    }
  }

  // Handle permission checkbox change
  const handlePermissionChange = (
    type: 'owner' | 'group' | 'others', 
    permission: keyof Permission, 
    value: boolean
  ) => {
    setPermissions(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [permission]: value
      }
    }))
  }

  // Handle special bits change
  const handleSpecialBitChange = (bit: 'sticky' | 'setuid' | 'setgid', value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      specialBits: {
        ...prev.specialBits!,
        [bit]: value
      }
    }))
  }

  // Load preset permissions
  const loadPreset = (octal: string) => {
    const newPermissions = octalToPermissions(octal)
    setPermissions(newPermissions)
  }

  // Copy to clipboard
  const handleCopy = async (text: string, key: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied({ ...copied, [key]: true })
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [key]: false }))
      }, 2000)
    }
  }

  const warnings = result ? getSecurityWarnings(result.permissions) : []
  const explanations = getPermissionExplanations()

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.chmodCalculator.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.chmodCalculator.description')}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('visual')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'visual'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            {t('tools.chmodCalculator.visualMode')}
          </button>
          <button
            onClick={() => setActiveTab('input')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'input'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Terminal className="w-4 h-4 inline mr-2" />
            {t('tools.chmodCalculator.inputMode')}
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-6">
          {activeTab === 'visual' ? (
            /* Visual Permission Setting */
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">{t('tools.chmodCalculator.permissions')}</h2>
              
              <div className="space-y-6">
                {/* Standard Permissions */}
                {(['owner', 'group', 'others'] as const).map((type) => (
                  <div key={type}>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 capitalize">
                      {t(`tools.chmodCalculator.${type}`)}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {(['read', 'write', 'execute'] as const).map((perm) => (
                        <label key={perm} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={permissions[type][perm]}
                            onChange={(e) => handlePermissionChange(type, perm, e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {t(`tools.chmodCalculator.${perm}`)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Special Bits */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {t('tools.chmodCalculator.specialBits')}
                  </h3>
                  <div className="space-y-2">
                    {(['setuid', 'setgid', 'sticky'] as const).map((bit) => (
                      <label key={bit} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={permissions.specialBits?.[bit] || false}
                          onChange={(e) => handleSpecialBitChange(bit, e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {t(`tools.chmodCalculator.${bit}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Text Input Mode */
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">{t('tools.chmodCalculator.directInput')}</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tools.chmodCalculator.octalInput')}
                </label>
                <input
                  type="text"
                  value={octalInput}
                  onChange={(e) => handleOctalChange(e.target.value)}
                  placeholder="755"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tools.chmodCalculator.symbolicInput')}
                </label>
                <input
                  type="text"
                  value={symbolicInput}
                  onChange={(e) => handleSymbolicChange(e.target.value)}
                  placeholder="rwxr-xr-x"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
            </div>
          )}

          {/* Presets */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{t('tools.chmodCalculator.presets')}</h2>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(PERMISSION_PRESETS).map(([octal, preset]) => (
                <button
                  key={octal}
                  onClick={() => loadPreset(octal)}
                  className="text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-medium">{octal}</span>
                      <span className="ml-2 text-sm font-medium">{preset.name}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Results Display */}
          {result && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">{t('tools.chmodCalculator.results')}</h2>
              
              <div className="space-y-4">
                {/* Octal */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{t('tools.chmodCalculator.octal')}</div>
                    <div className="font-mono text-2xl font-bold">{result.octal}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(result.octal, 'octal')}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    {copied.octal ? (
                      <Check className="w-4 h-4 mr-1 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {t('common.copy')}
                  </button>
                </div>

                {/* Symbolic */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{t('tools.chmodCalculator.symbolic')}</div>
                    <div className="font-mono text-lg font-bold">{result.symbolic}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(result.symbolic, 'symbolic')}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    {copied.symbolic ? (
                      <Check className="w-4 h-4 mr-1 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {t('common.copy')}
                  </button>
                </div>


                {/* Description */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">{t('tools.chmodCalculator.resultDescription')}</div>
                  <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
                    {result.description}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Warnings */}
          {warnings.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="text-sm font-medium text-red-800">{t('tools.chmodCalculator.securityWarnings')}</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index}>• {t(`tools.chmodCalculator.${warning}`)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Permission Explanations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-sm font-medium text-blue-800">{t('tools.chmodCalculator.permissionGuide')}</h3>
            </div>
            <div className="space-y-2 text-sm text-blue-700">
              {Object.entries(explanations).map(([key, explanationKey]) => (
                <div key={key}>
                  <strong className="capitalize">{t(`tools.chmodCalculator.${key}`)}:</strong> {t(`tools.chmodCalculator.${explanationKey}`)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}