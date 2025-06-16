import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, Check } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallButton() {
  const { t } = useTranslation()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
        return
      }
      
      // Check for iOS Safari
      if ('standalone' in window.navigator && (window.navigator as Navigator & { standalone?: boolean }).standalone === true) {
        setIsInstalled(true)
        return
      }
    }

    checkInstalled()

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      // Show the install prompt
      await deferredPrompt.prompt()
      
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      
      // Reset the deferred prompt
      setDeferredPrompt(null)
      setIsInstallable(false)
    } catch (error) {
      console.error('Error during install:', error)
    }
  }

  // Don't show anything if already installed
  if (isInstalled) {
    return (
      <div className="flex items-center text-green-600" title="App installed">
        <Check className="w-4 h-4" />
        <span className="sr-only">App installed</span>
      </div>
    )
  }

  // Don't show install button if not installable
  if (!isInstallable || !deferredPrompt) {
    return null
  }

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      title="Install MiniDev as an app"
      aria-label="Install MiniDev as a Progressive Web App"
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">Install</span>
    </button>
  )
}