export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        About MiniDev
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-lg text-muted-foreground">
          MiniDev is a collection of privacy-focused developer tools that run entirely in your browser. 
          No data is sent to any server - everything is processed locally to ensure your privacy and security.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>🔒 Complete privacy - all processing happens in your browser</li>
          <li>⚡ Fast and responsive</li>
          <li>📱 Works offline as a Progressive Web App</li>
          <li>♿ Fully accessible with ARIA support</li>
          <li>🌐 Multiple language support</li>
        </ul>
        
        <h2>Open Source</h2>
        <p>
          MiniDev is open source and available on GitHub. Contributions are welcome!
        </p>
      </div>
    </div>
  )
}