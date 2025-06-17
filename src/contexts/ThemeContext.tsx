import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark' // The resolved theme (system preference resolved)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage or default to system
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme
      return stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system'
    }
    return 'system'
  })

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => {
    // Initialize actual theme immediately
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme
      const initialTheme = stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system'
      return initialTheme === 'system' ? 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
        initialTheme as 'light' | 'dark'
    }
    return 'light'
  })

  // Function to get system preference
  const getSystemPreference = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Apply initial theme immediately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(actualTheme)
    }
  }, [])

  // Update actual theme based on current theme setting
  useEffect(() => {
    const updateActualTheme = () => {
      const resolved = theme === 'system' ? getSystemPreference() : theme
      setActualTheme(resolved)
      
      // Apply theme to document
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(resolved)
      console.log('Theme applied:', resolved, 'Classes:', root.classList.toString())
    }

    updateActualTheme()

    // Listen for system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => updateActualTheme()
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // Persist theme choice
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const value = {
    theme,
    setTheme,
    actualTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}