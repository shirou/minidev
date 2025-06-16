import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

export default function LanguageToggle() {
  const { language, setLanguage, languages } = useLanguage()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(l => l.code === language)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t('common.language')}: ${currentLanguage?.name}`}
      >
        <span>{currentLanguage?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]"
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`
                w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors
                ${language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
              `}
              role="option"
              aria-selected={language === lang.code}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}