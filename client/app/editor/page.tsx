'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism.css'

export default function CodePreviewComponent() {
  const [code, setCode] = useState<string>(`
function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Edit this code to see live changes!</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  `.trim())

  const [error, setError] = useState<string | null>(null)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setError(null)
  }

  const renderPreview = useCallback(() => {
    const fullCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${code}
          </script>
        </body>
      </html>
    `
    return fullCode
  }, [code])

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // This will throw an error if the code is invalid
        new Function(code)
        setError(null)
      } catch (err: any) {
        setError(err.message)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [code])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>React Code Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
              <div className="border rounded-md p-2 bg-gray-100">
                <Editor
                  value={code}
                  onValueChange={handleCodeChange}
                  highlight={code => highlight(code, languages.jsx, 'jsx')}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                  }}
                />
              </div>
              {error && (
                <div className="mt-2 text-red-500">
                  Error: {error}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Preview</h2>
              <div className="border rounded-md h-[400px]">
                <iframe
                  srcDoc={renderPreview()}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  sandbox="allow-scripts"
                  title="preview"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
