import { Link } from 'react-router-dom'
import type { Tool } from '@/utils/constants/tools'

interface ToolCardProps {
  tool: Tool
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

export default function ToolCard({ tool, size = 'medium', onClick }: ToolCardProps) {
  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  }

  const titleClasses = {
    small: 'text-sm font-medium',
    medium: 'text-base font-semibold',
    large: 'text-lg font-semibold'
  }

  const descriptionClasses = {
    small: 'text-xs text-gray-600 dark:text-gray-400 mt-1',
    medium: 'text-sm text-gray-600 dark:text-gray-400 mt-1',
    large: 'text-sm text-gray-600 dark:text-gray-400 mt-2'
  }

  const categoryClasses = {
    small: 'text-xs text-blue-600 dark:text-blue-400 font-medium',
    medium: 'text-xs text-blue-600 dark:text-blue-400 font-medium',
    large: 'text-sm text-blue-600 dark:text-blue-400 font-medium'
  }

  return (
    <Link 
      to={tool.path}
      className="block"
      aria-describedby={`tool-desc-${tool.id}`}
      onClick={onClick}
    >
      <div className={`
        border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 
        transition-all duration-200 group ${sizeClasses[size]}
      `}>
        <div className={categoryClasses[size]}>{tool.category}</div>
        <h3 className={`${titleClasses[size]} text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
          {tool.name}
        </h3>
        <p id={`tool-desc-${tool.id}`} className={descriptionClasses[size]}>
          {tool.description}
        </p>
      </div>
    </Link>
  )
}