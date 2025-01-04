import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='bg-primary text-text p-4 shadow-md fixed top-0 left-0 right-0 z-50'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link to='/' className='text-xl font-semibold hover:text-accent'>
          Blockchain App
        </Link>
        <nav className='hidden md:flex space-x-6'>
          <Link to='/hash-converter' className='hover:text-accent'>
            Hash Converter
          </Link>
          <Link to='/transactions' className='hover:text-accent'>
            Transactions
          </Link>
          <Link to='/key-pair' className='hover:text-accent'>
            Key Pair
          </Link>
          <Link to='/transaction-validator' className='hover:text-accent'>
            Transaction Validator
          </Link>
        </nav>
        <button
          className='md:hidden text-2xl focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <nav className='md:hidden bg-secondary p-4 mt-2 space-y-2 text-center'>
          <Link
            to='/hash-converter'
            className='block hover:text-accent'
            onClick={() => setIsOpen(false)}
          >
            Hash Converter
          </Link>
          <Link
            to='/transactions'
            className='block hover:text-accent'
            onClick={() => setIsOpen(false)}
          >
            Transactions
          </Link>
          <Link
            to='/key-pair'
            className='block hover:text-accent'
            onClick={() => setIsOpen(false)}
          >
            Key Pair
          </Link>
          <Link
            to='/transaction-validator'
            className='block hover:text-accent'
            onClick={() => setIsOpen(false)}
          >
            Transaction Validator
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
