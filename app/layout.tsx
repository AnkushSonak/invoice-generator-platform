// app/layout.tsx or components/Layout.tsx depending on your structure
'use client'

import React from "react";
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Free Invoice Generator</title>
        <meta
          name="description"
          content="Create professional invoices online for free. No login required. PDF download instantly."
        />
        {/* Put your Google AdSense or any other scripts here if needed */}
      </head>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Header />
        <main className="pt-16 max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md flex items-center justify-between px-6 z-50">
      <div className="flex items-center space-x-3">
        {/* Logo or site name */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
        <h1 className="text-xl font-bold select-none">InvoiceGen</h1>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        <a
          href="https://github.com/AnkushSonak/invoice-generator-platform"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.372 0 0 5.373 0 12a12 12 0 008.205 11.438c.6.112.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.086 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.997.107-.775.418-1.306.76-1.605-2.665-.304-5.467-1.335-5.467-5.933 0-1.31.467-2.382 1.235-3.22-.123-.304-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.516 11.516 0 016 0c2.29-1.554 3.297-1.23 3.297-1.23.654 1.653.242 2.872.12 3.176.77.838 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.813 1.102.813 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.217.694.825.576A12.003 12.003 0 0024 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === 'light' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m8.66-10h1M3 12h1m14.14 6.364l.707.707M6.343 6.343l.707.707m12.02 0l-.707.707M6.343 17.657l-.707.707M12 7a5 5 0 000 10 5 5 0 000-10z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
}
