import { Sun, Moon, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme, type Theme } from '@/contexts'

export default function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const themes: { value: Theme; icon: React.ReactNode }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', icon: <Moon className="w-4 h-4" /> },
    { value: 'system', icon: <Monitor className="w-4 h-4" /> },
  ]

  const handleToggle = () => {
    const currentIndex = themes.findIndex(t => t.value === theme)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex].value
    setTheme(nextTheme)
  }

  const currentTheme = themes.find(t => t.value === theme)

  return (
    <button
      onClick={handleToggle}
      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
    >
      {currentTheme?.icon}
    </button>
  )
}