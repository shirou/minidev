import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, Download, Eye, EyeOff, Wifi, QrCode, RotateCcw } from 'lucide-react'
import { 
  generateWiFiQRCode,
  generateUrlQRCode,
  generateEmailQRCode,
  generatePhoneQRCode,
  generateSMSQRCode,
  generateVCardQRCode,
  generateQRCode,
  type QRCodeOptions,
  type QRCodeErrorCorrectionLevel
} from '@/utils/generators/qrcode'
import { copyToClipboard } from '@/utils/helpers/clipboard'

type QRType = 'wifi' | 'url' | 'email' | 'phone' | 'sms' | 'contact' | 'text'

export default function WiFiQRCodeGenerator() {
  const { t } = useTranslation()
  const [qrType, setQrType] = useState<QRType>('wifi')
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // WiFi fields
  const [wifiSSID, setWifiSSID] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiSecurity, setWifiSecurity] = useState<'WPA' | 'WEP' | 'nopass'>('WPA')
  const [wifiHidden, setWifiHidden] = useState(false)

  // URL fields
  const [url, setUrl] = useState('')

  // Email fields
  const [email, setEmail] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')

  // Phone/SMS fields
  const [phoneNumber, setPhoneNumber] = useState('')
  const [smsMessage, setSmsMessage] = useState('')

  // Contact fields
  const [contactFirstName, setContactFirstName] = useState('')
  const [contactLastName, setContactLastName] = useState('')
  const [contactOrganization, setContactOrganization] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactUrl, setContactUrl] = useState('')
  const [contactAddress, setContactAddress] = useState('')

  // Text field
  const [text, setText] = useState('')

  // QR Code options
  const [qrOptions, setQrOptions] = useState<Partial<QRCodeOptions>>({
    errorCorrectionLevel: 'M' as QRCodeErrorCorrectionLevel,
    width: 256,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      let result

      switch (qrType) {
        case 'wifi':
          result = await generateWiFiQRCode(wifiSSID, wifiPassword, wifiSecurity, wifiHidden, qrOptions)
          break
        case 'url':
          result = await generateUrlQRCode(url, qrOptions)
          break
        case 'email':
          result = await generateEmailQRCode(email, emailSubject, emailBody, qrOptions)
          break
        case 'phone':
          result = await generatePhoneQRCode(phoneNumber, qrOptions)
          break
        case 'sms':
          result = await generateSMSQRCode(phoneNumber, smsMessage, qrOptions)
          break
        case 'contact':
          result = await generateVCardQRCode({
            firstName: contactFirstName,
            lastName: contactLastName,
            organization: contactOrganization,
            phone: contactPhone,
            email: contactEmail,
            url: contactUrl,
            address: contactAddress
          }, qrOptions)
          break
        case 'text':
          result = await generateQRCode(text, qrOptions)
          break
        default:
          result = { success: false, error: t('tools.qrcode.errors.invalidType') }
      }

      if (result.success && result.result) {
        setQrImage(result.result)
      } else {
        setError(result.error || t('tools.qrcode.errors.generationFailed'))
        setQrImage(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.qrcode.errors.unknownError'))
      setQrImage(null)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    if (!qrImage) return
    
    try {
      // Create a blob from the data URL and copy it to clipboard
      const response = await fetch(qrImage)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback: copy the data URL as text
      const success = await copyToClipboard(qrImage)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const handleDownload = () => {
    if (!qrImage) return

    const link = document.createElement('a')
    link.href = qrImage
    link.download = `qrcode-${qrType}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearAll = () => {
    setWifiSSID('')
    setWifiPassword('')
    setUrl('')
    setEmail('')
    setEmailSubject('')
    setEmailBody('')
    setPhoneNumber('')
    setSmsMessage('')
    setContactFirstName('')
    setContactLastName('')
    setContactOrganization('')
    setContactPhone('')
    setContactEmail('')
    setContactUrl('')
    setContactAddress('')
    setText('')
    setQrImage(null)
    setError(null)
  }

  // Auto-generate when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (canGenerate()) {
        handleGenerate()
      }
    }, 500) // Debounce

    return () => clearTimeout(timer)
  }, [qrType, wifiSSID, wifiPassword, wifiSecurity, wifiHidden, url, email, emailSubject, emailBody, phoneNumber, smsMessage, contactFirstName, contactLastName, contactOrganization, contactPhone, contactEmail, contactUrl, contactAddress, text, qrOptions])

  const canGenerate = () => {
    switch (qrType) {
      case 'wifi':
        return wifiSSID.trim() !== '' && (wifiSecurity === 'nopass' || wifiPassword.trim() !== '')
      case 'url':
        return url.trim() !== ''
      case 'email':
        return email.trim() !== ''
      case 'phone':
      case 'sms':
        return phoneNumber.trim() !== ''
      case 'contact':
        return contactFirstName.trim() !== '' || contactLastName.trim() !== '' || contactOrganization.trim() !== ''
      case 'text':
        return text.trim() !== ''
      default:
        return false
    }
  }

  const qrTypeNames = {
    wifi: t('tools.qrcode.types.wifi'),
    url: t('tools.qrcode.types.url'),
    email: t('tools.qrcode.types.email'),
    phone: t('tools.qrcode.types.phone'),
    sms: t('tools.qrcode.types.sms'),
    contact: t('tools.qrcode.types.contact'),
    text: t('tools.qrcode.types.text')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.qrcode.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.qrcode.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-6">
          {/* QR Type Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">{t('tools.qrcode.qrCodeType')}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(qrTypeNames).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setQrType(key as QRType)}
                  className={`p-2 text-sm rounded-md border transition-colors ${
                    qrType === key
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Type-specific inputs */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              {qrType === 'wifi' && <Wifi className="w-5 h-5 mr-2" />}
              {qrType !== 'wifi' && <QrCode className="w-5 h-5 mr-2" />}
              {qrTypeNames[qrType]} {t('tools.qrcode.settings')}
            </h3>

            {qrType === 'wifi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.wifi.networkName')} *
                  </label>
                  <input
                    type="text"
                    value={wifiSSID}
                    onChange={(e) => setWifiSSID(e.target.value)}
                    placeholder={t('tools.qrcode.wifi.networkPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.qrcode.wifi.securityType')}</label>
                  <select
                    value={wifiSecurity}
                    onChange={(e) => setWifiSecurity(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="WPA">{t('tools.qrcode.wifi.wpa')}</option>
                    <option value="WEP">{t('tools.qrcode.wifi.wep')}</option>
                    <option value="nopass">{t('tools.qrcode.wifi.noPassword')}</option>
                  </select>
                </div>

                {wifiSecurity !== 'nopass' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tools.qrcode.wifi.password')} *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        placeholder={t('tools.qrcode.wifi.passwordPlaceholder')}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="wifiHidden"
                    checked={wifiHidden}
                    onChange={(e) => setWifiHidden(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="wifiHidden" className="ml-2 text-sm text-gray-700">
                    {t('tools.qrcode.wifi.hiddenNetwork')}
                  </label>
                </div>
              </div>
            )}

            {qrType === 'url' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tools.qrcode.url.websiteUrl')} *
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('tools.qrcode.url.placeholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {qrType === 'email' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.email.address')} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('tools.qrcode.email.addressPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.qrcode.email.subject')}</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder={t('tools.qrcode.email.subjectPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('tools.qrcode.email.message')}</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder={t('tools.qrcode.email.messagePlaceholder')}
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            )}

            {(qrType === 'phone' || qrType === 'sms') && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.phone.phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={t('tools.qrcode.phone.placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {qrType === 'sms' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tools.qrcode.sms.message')}
                    </label>
                    <textarea
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      placeholder={t('tools.qrcode.sms.messagePlaceholder')}
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                )}
              </div>
            )}

            {qrType === 'contact' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tools.qrcode.contact.firstName')}
                    </label>
                    <input
                      type="text"
                      value={contactFirstName}
                      onChange={(e) => setContactFirstName(e.target.value)}
                      placeholder={t('tools.qrcode.contact.firstNamePlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tools.qrcode.contact.lastName')}
                    </label>
                    <input
                      type="text"
                      value={contactLastName}
                      onChange={(e) => setContactLastName(e.target.value)}
                      placeholder={t('tools.qrcode.contact.lastNamePlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.contact.organization')}
                  </label>
                  <input
                    type="text"
                    value={contactOrganization}
                    onChange={(e) => setContactOrganization(e.target.value)}
                    placeholder={t('tools.qrcode.contact.organizationPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tools.qrcode.contact.phone')}
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder={t('tools.qrcode.contact.phonePlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('tools.qrcode.contact.email')}
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder={t('tools.qrcode.contact.emailPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.contact.website')}
                  </label>
                  <input
                    type="url"
                    value={contactUrl}
                    onChange={(e) => setContactUrl(e.target.value)}
                    placeholder={t('tools.qrcode.contact.websitePlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.contact.address')}
                  </label>
                  <textarea
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                    placeholder={t('tools.qrcode.contact.addressPlaceholder')}
                    className="w-full h-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            )}

            {qrType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tools.qrcode.text.content')} *
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('tools.qrcode.text.placeholder')}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {t('tools.qrcode.text.charactersCount', { count: text.length })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <button
                onClick={clearAll}
                className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                {t('tools.qrcode.clearAll')}
              </button>
            </div>
          </div>

          {/* QR Code Options */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t('tools.qrcode.options.title')}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.options.errorCorrection')}
                  </label>
                  <select
                    value={qrOptions.errorCorrectionLevel}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      errorCorrectionLevel: e.target.value as QRCodeErrorCorrectionLevel
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="L">{t('tools.qrcode.options.low')}</option>
                    <option value="M">{t('tools.qrcode.options.medium')}</option>
                    <option value="Q">{t('tools.qrcode.options.quartile')}</option>
                    <option value="H">{t('tools.qrcode.options.high')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.options.size')}
                  </label>
                  <input
                    type="number"
                    value={qrOptions.width}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      width: parseInt(e.target.value) || 256
                    })}
                    min="64"
                    max="1024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.options.margin')}
                  </label>
                  <input
                    type="number"
                    value={qrOptions.margin}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      margin: parseInt(e.target.value) || 4
                    })}
                    min="0"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.options.darkColor')}
                  </label>
                  <input
                    type="color"
                    value={qrOptions.color?.dark}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      color: { ...qrOptions.color!, dark: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('tools.qrcode.options.lightColor')}
                  </label>
                  <input
                    type="color"
                    value={qrOptions.color?.light}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      color: { ...qrOptions.color!, light: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          {/* QR Code Display */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('tools.qrcode.output.title')}</h3>
              {qrImage && (
                <div className="flex space-x-2">
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
                  <button
                    onClick={handleDownload}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {t('common.download')}
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">{t('tools.qrcode.output.generationError')}</span>
                </div>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-center min-h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              {isGenerating ? (
                <div className="text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p>{t('tools.qrcode.output.generating')}</p>
                </div>
              ) : qrImage ? (
                <img
                  src={qrImage}
                  alt={t('tools.qrcode.output.altText')}
                  className="max-w-full max-h-full"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <div className="text-center text-gray-500">
                  <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>{t('tools.qrcode.output.fillFields')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">{t('tools.qrcode.howToUse.title')}</h3>
            {qrType === 'wifi' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('tools.qrcode.howToUse.wifi.step1')}</li>
                <li>{t('tools.qrcode.howToUse.wifi.step2')}</li>
                <li>{t('tools.qrcode.howToUse.wifi.step3')}</li>
                <li>{t('tools.qrcode.howToUse.wifi.step4')}</li>
              </ul>
            )}
            {qrType === 'url' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('tools.qrcode.howToUse.url.step1')}</li>
                <li>{t('tools.qrcode.howToUse.url.step2')}</li>
                <li>{t('tools.qrcode.howToUse.url.step3')}</li>
              </ul>
            )}
            {qrType === 'email' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('tools.qrcode.howToUse.email.step1')}</li>
                <li>{t('tools.qrcode.howToUse.email.step2')}</li>
                <li>{t('tools.qrcode.howToUse.email.step3')}</li>
              </ul>
            )}
            {(qrType === 'phone' || qrType === 'sms') && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('tools.qrcode.howToUse.phone.step1')}</li>
                <li>{qrType === 'sms' ? t('tools.qrcode.howToUse.sms.step2') : t('tools.qrcode.howToUse.phone.step2')}</li>
                <li>{t('tools.qrcode.howToUse.phone.step3')}</li>
              </ul>
            )}
            {qrType === 'contact' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('tools.qrcode.howToUse.contact.step1')}</li>
                <li>{t('tools.qrcode.howToUse.contact.step2')}</li>
                <li>{t('tools.qrcode.howToUse.contact.step3')}</li>
              </ul>
            )}
            {qrType === 'text' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>{t('tools.qrcode.howToUse.text.step1')}</li>
                <li>{t('tools.qrcode.howToUse.text.step2')}</li>
                <li>{t('tools.qrcode.howToUse.text.step3')}</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}