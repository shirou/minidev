import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Language = 'en' | 'ja'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  languages: { code: Language; name: string }[]
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [language, setLanguageState] = useState<Language>('en')

  const languages = [
    { code: 'en' as const, name: 'English' },
    { code: 'ja' as const, name: '日本語' },
  ]

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem('minidev-language', lang)
  }

  useEffect(() => {
    // Load saved language or detect browser language
    const savedLanguage = localStorage.getItem('minidev-language') as Language
    const browserLanguage = navigator.language.split('-')[0] as Language
    
    const defaultLanguage = savedLanguage || 
      (languages.some(l => l.code === browserLanguage) ? browserLanguage : 'en')
    
    setLanguage(defaultLanguage)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}