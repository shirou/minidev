import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SidebarToggle } from '../Sidebar'
import LanguageToggle from '@/components/common/LanguageToggle'
import PWAInstallButton from '@/components/common/PWAInstallButton'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60" role="banner">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
          <div className="flex items-center space-x-3">
            <SidebarToggle onClick={onMenuClick} />
            <Link 
              to="/" 
              className="text-xl font-bold text-blue-600 hover:text-blue-500 transition-colors"
              aria-label="MiniDev - Go to home page"
            >
              MiniDev
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <PWAInstallButton />
            <Link 
              to="/about" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="About page"
            >
              {t('navigation.about')}
            </Link>
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}