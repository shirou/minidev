import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, AlertCircle, RotateCcw, Palette, Eye, Info } from 'lucide-react'
import { 
  convertToAllColorFormats,
  parseColorInput,
  getColorPalette,
  getContrastRatio,
  hexToRgb,
  hslToRgb,
  rgbToHex,
  type ColorConversionResult,
  type RGBColor
} from '@/utils/converters/color'
import { copyToClipboard } from '@/utils/helpers/clipboard'

export default function ColorConverter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [conversions, setConversions] = useState<Record<string, ColorConversionResult>>({})
  const [error, setError] = useState<string | null>(null)
  const [copiedType, setCopiedType] = useState<string | null>(null)
  const [currentColor, setCurrentColor] = useState<RGBColor | null>(null)
  const [colorPalette, setColorPalette] = useState<{ name: string, color: RGBColor }[]>([])
  const [showPalette, setShowPalette] = useState(false)

  const handleConvert = () => {
    if (!input.trim()) {
      setConversions({})
      setError(null)
      setCurrentColor(null)
      setColorPalette([])
      return
    }

    setError(null)

    try {
      const results = convertToAllColorFormats(input.trim())
      setConversions(results)

      // Extract RGB color for preview and palette
      const parsed = parseColorInput(input.trim())
      if (parsed.success && parsed.result) {
        let rgb: RGBColor | null = null

        if (parsed.result.format === 'hex') {
          const hexResult = hexToRgb(parsed.result.color as string)
          if (hexResult.success && hexResult.result) {
            rgb = hexResult.result
          }
        } else if (parsed.result.format === 'rgb') {
          rgb = parsed.result.color as RGBColor
        } else if (parsed.result.format === 'hsl') {
          // Convert HSL to RGB for preview
          const hslColor = parsed.result.color as { h: number, s: number, l: number }
          const hslToRgbResult = hslToRgb(hslColor.h, hslColor.s, hslColor.l)
          if (hslToRgbResult.success && hslToRgbResult.result) {
            rgb = hslToRgbResult.result
          }
        }

        if (rgb) {
          setCurrentColor(rgb)
          setColorPalette(getColorPalette(rgb.r, rgb.g, rgb.b))
        }
      }

      // Check if any conversion failed
      const failures = Object.entries(results).filter(([, result]) => !result.success)
      if (failures.length > 0) {
        setError(t('tools.colorConverter.errors.someConversionsFailed', { failures: failures.map(([name]) => name).join(', ') }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('tools.colorConverter.errors.unknownError'))
      setConversions({})
      setCurrentColor(null)
      setColorPalette([])
    }
  }

  const handleCopy = async (type: string, value: string) => {
    const success = await copyToClipboard(value)
    if (success) {
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
    }
  }

  const clearAll = () => {
    setInput('')
    setConversions({})
    setError(null)
    setCurrentColor(null)
    setColorPalette([])
  }

  const setColorFromPalette = (color: RGBColor) => {
    const hexResult = rgbToHex(color.r, color.g, color.b)
    if (hexResult.success && hexResult.result) {
      setInput(hexResult.result.toString())
    }
  }

  // Convert automatically when input changes
  useEffect(() => {
    handleConvert()
  }, [input]) // eslint-disable-line react-hooks/exhaustive-deps

  // Common color presets
  const colorPresets = [
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Cyan', value: '#00FFFF' },
    { name: 'Magenta', value: '#FF00FF' },
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Purple', value: '#800080' },
    { name: 'Brown', value: '#A52A2A' }
  ]

  // Calculate contrast ratios with black and white
  const contrastInfo = currentColor ? {
    withWhite: getContrastRatio(currentColor, { r: 255, g: 255, b: 255 }),
    withBlack: getContrastRatio(currentColor, { r: 0, g: 0, b: 0 })
  } : null

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('tools.colorConverter.title')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('tools.colorConverter.description')}
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tools.colorConverter.colorInput')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('tools.colorConverter.placeholder')}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Palette className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t('tools.colorConverter.supportedFormats')}
            </p>
          </div>
          
          {/* Color Preview */}
          {currentColor && (
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tools.colorConverter.preview')}
              </label>
              <div
                className="flex-1 border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors"
                style={{ backgroundColor: `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})` }}
                onClick={() => currentColor && handleCopy('Preview', `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`)}
                title={t('tools.colorConverter.clickToCopy')}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {input && (
            <button
              onClick={clearAll}
              className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {t('common.clear')}
            </button>
          )}
          
          {colorPalette.length > 0 && (
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Eye className="w-4 h-4 mr-1" />
              {showPalette ? t('tools.colorConverter.hidePalette') : t('tools.colorConverter.showPalette')}
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">{t('common.error')}</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      {/* Contrast Information */}
      {contrastInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
            <Info className="w-4 h-4 mr-1" />
            {t('tools.colorConverter.contrastRatios')}:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between p-2 bg-white rounded border">
              <span className="text-gray-700">vs White:</span>
              <span className={`font-mono ${contrastInfo.withWhite >= 4.5 ? 'text-green-600' : contrastInfo.withWhite >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                {contrastInfo.withWhite.toFixed(2)}:1
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-black text-white rounded border">
              <span>vs Black:</span>
              <span className={`font-mono ${contrastInfo.withBlack >= 4.5 ? 'text-green-400' : contrastInfo.withBlack >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                {contrastInfo.withBlack.toFixed(2)}:1
              </span>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            {t('tools.colorConverter.contrastInfo')}
          </p>
        </div>
      )}

      {/* Color Palette */}
      {showPalette && colorPalette.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('tools.colorConverter.colorPalette')}:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {colorPalette.map((paletteColor, index) => (
              <button
                key={index}
                onClick={() => setColorFromPalette(paletteColor.color)}
                className="flex flex-col p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-full h-12 rounded border border-gray-300 mb-2"
                  style={{ backgroundColor: `rgb(${paletteColor.color.r}, ${paletteColor.color.g}, ${paletteColor.color.b})` }}
                />
                <span className="text-xs text-gray-600 text-center">{paletteColor.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversions Grid */}
      {Object.keys(conversions).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(conversions).map(([formatName, result]) => (
            <div
              key={formatName}
              className={`bg-white border rounded-lg p-4 ${
                result.success ? 'border-gray-200' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">{formatName}</h3>
                {result.success && result.result !== undefined && (
                  <button
                    onClick={() => handleCopy(formatName, result.result!.toString())}
                    className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copiedType === formatName ? (
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
                  className="p-3 bg-gray-50 rounded border text-sm font-mono cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => result.result !== undefined && handleCopy(formatName, result.result.toString())}
                >
                  {result.result !== undefined ? result.result.toString() : t('tools.colorConverter.empty')}
                </div>
              ) : (
                <div className="p-3 bg-red-100 border border-red-200 rounded text-sm text-red-600">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {result.error || t('tools.colorConverter.errors.conversionFailed')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Color Presets */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('tools.colorConverter.commonColors')}:</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => setInput(preset.value)}
              className="flex flex-col items-center p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-8 h-8 rounded border border-gray-300 mb-1"
                style={{ backgroundColor: preset.value }}
              />
              <span className="text-xs text-gray-600">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* No Input State */}
      {!input && (
        <div className="text-center py-12 text-gray-500">
          <Palette className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>{t('tools.colorConverter.enterColorPrompt')}</p>
        </div>
      )}

      {/* Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('tools.colorConverter.supportedFormatsTitle')}:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>HEX</strong>: #RRGGBB or #RGB (e.g., #FF5733, #F73)</li>
          <li>• <strong>RGB</strong>: rgb(r, g, b) (e.g., rgb(255, 87, 51))</li>
          <li>• <strong>HSL</strong>: hsl(h, s%, l%) (e.g., hsl(9, 100%, 60%))</li>
        </ul>
      </div>
    </div>
  )
}