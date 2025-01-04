import { useState } from 'react'
import {
  generateBitcoinKeyPair,
  generateBitcoinAddress,
} from '../utils/crypto.utils'

function KeyPair() {
  const [privateKey, setPrivateKey] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [bitcoinAddress, setBitcoinAddress] = useState('')

  const handleGenerateKeys = () => {
    const { privateKey, publicKey } = generateBitcoinKeyPair()
    const address = generateBitcoinAddress(publicKey)
    setPrivateKey(privateKey)
    setPublicKey(publicKey)
    setBitcoinAddress(address)
  }

  return (
    <div className='flex flex-col items-center justify-center h-full bg-background text-text font-sans px-6 py-8'>
      <div className='max-w-4xl w-full'>
        <h2 className='text-3xl font-bold text-accent text-center mb-6'>
          Bitcoin Key Pair Demo
        </h2>
        <div className='flex flex-col items-center space-y-6'>
          <button
            onClick={handleGenerateKeys}
            className='bg-accent text-secondary px-6 py-2 rounded-full font-medium shadow-lg hover:bg-accent/90'
          >
            Generate Keys
          </button>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-accent mb-2'>
              Private Key
            </h3>
            <p className='bg-secondary text-text p-4 rounded shadow-md break-words max-h-64 overflow-auto'>
              {privateKey || 'Click the button to generate a private key.'}
            </p>
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-accent mb-2'>
              Public Key
            </h3>
            <p className='bg-secondary text-text p-4 rounded shadow-md break-words max-h-64 overflow-auto'>
              {publicKey || 'Click the button to generate a public key.'}
            </p>
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-accent mb-2'>
              Bitcoin Address
            </h3>
            <p className='bg-secondary text-text p-4 rounded shadow-md break-words max-h-64 overflow-auto'>
              {bitcoinAddress ||
                'Click the button to generate a Bitcoin address.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyPair
