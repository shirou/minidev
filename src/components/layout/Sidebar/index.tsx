import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X, Menu } from 'lucide-react'
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory } from '@/utils/constants/tools'
import ToolCard from '@/components/common/ToolCard'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = Object.values(TOOL_CATEGORIES)

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y'
        }}
        role="complementary"
        aria-label="Tool navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('navigation.tools')}</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t('navigation.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label={t('navigation.search')}
            />
          </div>
        </div>

        {/* Tool List */}
        <div 
          className="flex-1 overflow-y-auto overscroll-contain" 
          style={{ 
            height: 'calc(100vh - 140px)',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin'
          }}
        >
          {searchQuery ? (
            // Filtered results
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('navigation.searchResults')} ({filteredTools.length})
              </h3>
              <div className="space-y-2">
                {filteredTools.map((tool) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    size="small" 
                    onClick={() => {
                      // Close sidebar on mobile when tool is selected
                      if (isMobile) {
                        onClose()
                      }
                    }}
                  />
                ))}
                {filteredTools.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                    {t('navigation.noResults')} "{searchQuery}"
                  </p>
                )}
              </div>
            </div>
          ) : (
            // Grouped by category
            <div className="p-4 space-y-6 pb-8">
              {categories.map((category) => {
                const categoryTools = getToolsByCategory(category)
                return (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {categoryTools.map((tool) => (
                        <ToolCard 
                          key={tool.id} 
                          tool={tool} 
                          size="small" 
                          onClick={() => {
                            // Close sidebar on mobile when tool is selected
                            if (isMobile) {
                              onClose()
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Open navigation menu"
    >
      <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    </button>
  )
}