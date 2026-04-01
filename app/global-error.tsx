'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="dark">
      <body style={{ background: '#0c0a09', color: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', opacity: 0.7 }}>Something went wrong.</p>
          <button
            onClick={reset}
            style={{ padding: '0.5rem 1.5rem', borderRadius: '9999px', background: '#00f5ff', color: '#0c0a09', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
