import { useTranslation } from 'react-i18next'
import ToolCard from '@/components/common/ToolCard'
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory } from '@/utils/constants/tools'

export default function HomePage() {
  const { t } = useTranslation()
  const categories = Object.values(TOOL_CATEGORIES)

  return (
    <div className="space-y-8">
      <section aria-labelledby="page-title">
        <h1 id="page-title" className="text-3xl font-bold tracking-tight">
          {t('home.title')}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {t('home.subtitle')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t('home.sidebarNote')}
        </p>
      </section>

      <section aria-labelledby="tools-section">
        <h2 id="tools-section" className="sr-only">
          Available tools by category
        </h2>
        
        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category)
          
          return (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200" id={`category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                {category}
              </h3>
              
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                role="list"
                aria-labelledby={`category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {categoryTools.map((tool) => (
                  <div key={tool.id} role="listitem">
                    <ToolCard tool={tool} size="medium" />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-12">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('home.privacyTitle')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('home.privacyDescription')}
        </p>
      </section>
    </div>
  )
}