export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60" role="contentinfo">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            MiniDev - Privacy-focused developer tools running entirely in your browser
          </p>
          <p className="mt-1">
            © 2025 MiniDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}