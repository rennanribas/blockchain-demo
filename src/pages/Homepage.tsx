function Homepage() {
  return (
    <div className='flex flex-col items-center justify-center h-full bg-background text-text font-sans relative overflow-hidden px-4'>
      <div className='absolute inset-0'>
        <div className='w-96 h-96 bg-gradient-to-r from-accent to-secondary rounded-full blur-3xl opacity-30 animate-pulse'></div>
        <div className='w-72 h-72 bg-gradient-to-r from-secondary to-primary rounded-full blur-2xl opacity-40 animate-pulse absolute top-1/4 right-1/3'></div>
      </div>
      <h2 className='text-5xl font-extrabold text-accent mb-6 z-10'>
        Why Understanding Code Matters
      </h2>
      <p className='text-lg text-gray-300 text-center max-w-2xl leading-relaxed z-10'>
        Blockchain and Bitcoin have revolutionized the world of technology and
        finance. However, understanding only the abstract concepts can lead to
        superficial knowledge. By delving into the actual code and mechanisms
        behind these technologies, you gain the power to truly comprehend,
        innovate, and build upon the system that is shaping the future.
      </p>
      <div className='mt-8 z-10'>
        <a
          href='https://bitcoin.org/bitcoin.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-accent text-secondary px-6 py-2 rounded-full text-lg font-medium shadow-lg hover:bg-accent/90'
        >
          Read the Bitcoin White Paper
        </a>
      </div>
    </div>
  )
}

export default Homepage
