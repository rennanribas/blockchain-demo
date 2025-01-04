import { useState } from 'react'

function HashConverter() {
  const [text, setText] = useState<string>('')
  const [hash, setHash] = useState<string>('')

  const handleGenerateHash = async (): Promise<void> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const digest = await crypto.subtle.digest('SHA-256', data)
    setHash(
      Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    )
  }

  return (
    <div className='flex flex-col items-center justify-center h-full bg-background text-text font-sans relative overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='w-96 h-96 bg-gradient-to-r from-accent to-secondary rounded-full blur-3xl opacity-30 animate-pulse'></div>
        <div className='w-72 h-72 bg-gradient-to-r from-secondary to-primary rounded-full blur-2xl opacity-40 animate-pulse absolute top-1/4 right-1/3'></div>
      </div>
      <h2 className='text-3xl font-bold text-accent mb-6 z-10'>
        Hash Converter
      </h2>
      <div className='flex items-center w-full max-w-lg z-10'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text'
          className='flex-1 border border-secondary rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-secondary text-text'
        />
        <button
          onClick={handleGenerateHash}
          className='bg-accent text-secondary px-4 py-2 rounded-r hover:bg-accent/90'
        >
          Generate
        </button>
      </div>
      {hash && (
        <p className='mt-6 break-words text-center text-sm bg-secondary text-text p-4 rounded shadow-md max-w-lg z-10'>
          {hash}
        </p>
      )}
    </div>
  )
}

export default HashConverter
