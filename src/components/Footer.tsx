import { FaLinkedin, FaInstagram, FaGithub, FaBitcoin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='bg-gray-800 text-gray-400 py-2 px-4 text-sm'>
      <div className='flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0'>
        <p className='text-center lg:text-left'>
          App by Rennan Ribas - Open Source Project
        </p>
        <div className='flex space-x-4'>
          <a
            href='https://www.linkedin.com/in/rennan_ribas'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-accent flex items-center space-x-1'
          >
            <FaLinkedin />
          </a>
          <a
            href='https://www.instagram.com/rennan_ribas'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-accent flex items-center space-x-1'
          >
            <FaInstagram />
          </a>
          <a
            href='https://github.com/rennanribas'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-accent flex items-center space-x-1'
          >
            <FaGithub />
          </a>
          <a href='#' className='hover:text-accent flex items-center space-x-1'>
            <FaBitcoin /> <span>Bitcoin: bc1qexampleaddress</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
