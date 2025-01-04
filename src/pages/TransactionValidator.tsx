import { useState } from 'react'
import { ec as EC } from 'elliptic'
import sha256 from 'crypto-js/sha256'
import ripemd160 from 'crypto-js/ripemd160'

const ec = new EC('secp256k1')

const generateBitcoinAddress = (publicKey: string) => {
  const hash = ripemd160(sha256(publicKey).toString()).toString()
  return `1${hash}`
}

function TransactionValidator() {
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [signature, setSignature] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const [senderDetails, setSenderDetails] = useState({
    publicKey: '',
    privateKey: '',
    bitcoinAddress: '',
  })

  const [receiverDetails, setReceiverDetails] = useState({
    publicKey: '',
    privateKey: '',
    bitcoinAddress: '',
  })

  const handleGenerateSender = () => {
    const keyPair = ec.genKeyPair()
    const publicKey = keyPair.getPublic('hex')
    const privateKey = keyPair.getPrivate('hex')
    const bitcoinAddress = generateBitcoinAddress(publicKey)
    setSenderDetails({ publicKey, privateKey, bitcoinAddress })
    setSender(publicKey)
    setPublicKey(publicKey)
  }

  const handleGenerateReceiver = () => {
    const keyPair = ec.genKeyPair()
    const publicKey = keyPair.getPublic('hex')
    const privateKey = keyPair.getPrivate('hex')
    const bitcoinAddress = generateBitcoinAddress(publicKey)
    setReceiverDetails({ publicKey, privateKey, bitcoinAddress })
    setReceiver(publicKey)
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
    if (senderDetails.privateKey && receiver && value) {
      const transactionData = `${sender}-${receiver}-${value}`
      const key = ec.keyFromPrivate(senderDetails.privateKey)
      const newSignature = key.sign(transactionData).toDER('hex')
      setSignature(newSignature)
    } else {
      setSignature('')
    }
  }

  const handleValidateTransaction = () => {
    if (!sender || !receiver || !amount || !signature || !publicKey) {
      setIsValid(false)
      return
    }

    const key = ec.keyFromPublic(publicKey, 'hex')
    const transactionData = `${sender}-${receiver}-${amount}`
    const isValidSignature = key.verify(transactionData, signature)

    setIsValid(isValidSignature)
  }

  return (
    <div className='min-h-screen bg-background text-text font-sans pt-20 px-6'>
      <h2 className='text-4xl font-bold text-accent mb-8 text-center'>
        Transaction Validator
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto'>
        {/* Sender Card */}
        <div className='bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-xl'>
          <h3 className='text-lg font-bold text-accent mb-4'>Sender</h3>
          <div className='space-y-3 text-sm'>
            <p>
              <span className='font-medium'>Public Key:</span>{' '}
              <span className='block truncate'>
                {senderDetails.publicKey || 'Not generated'}
              </span>
            </p>
            <p>
              <span className='font-medium'>Private Key:</span>{' '}
              <span className='block truncate'>
                {senderDetails.privateKey || 'Not generated'}
              </span>
            </p>
            <p>
              <span className='font-medium'>Bitcoin Address:</span>{' '}
              <span className='block'>
                {senderDetails.bitcoinAddress || 'Not generated'}
              </span>
            </p>
          </div>
          <button
            onClick={handleGenerateSender}
            className='mt-6 w-full bg-accent text-secondary px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-accent/90'
          >
            Generate Sender
          </button>
        </div>

        {/* Receiver Card */}
        <div className='bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-xl'>
          <h3 className='text-lg font-bold text-accent mb-4'>Receiver</h3>
          <div className='space-y-3 text-sm'>
            <p>
              <span className='font-medium'>Public Key:</span>{' '}
              <span className='block truncate'>
                {receiverDetails.publicKey || 'Not generated'}
              </span>
            </p>
            <p>
              <span className='font-medium'>Private Key:</span>{' '}
              <span className='block truncate'>
                {receiverDetails.privateKey || 'Not generated'}
              </span>
            </p>
            <p>
              <span className='font-medium'>Bitcoin Address:</span>{' '}
              <span className='block'>
                {receiverDetails.bitcoinAddress || 'Not generated'}
              </span>
            </p>
          </div>
          <button
            onClick={handleGenerateReceiver}
            className='mt-6 w-full bg-accent text-secondary px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-accent/90'
          >
            Generate Receiver
          </button>
        </div>

        {/* Transaction Inputs */}
        <div className='bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-xl'>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='sender'
                className='block text-sm font-semibold text-accent mb-1'
              >
                Sender
              </label>
              <input
                id='sender'
                type='text'
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className='w-full bg-primary text-white px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent'
              />
            </div>
            <div>
              <label
                htmlFor='receiver'
                className='block text-sm font-semibold text-accent mb-1'
              >
                Receiver
              </label>
              <input
                id='receiver'
                type='text'
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className='w-full bg-primary text-white px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent'
              />
            </div>
            <div>
              <label
                htmlFor='amount'
                className='block text-sm font-semibold text-accent mb-1'
              >
                Amount
              </label>
              <input
                id='amount'
                type='number'
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className='w-full bg-primary text-white px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent'
              />
            </div>
            <div>
              <label
                htmlFor='signature'
                className='block text-sm font-semibold text-accent mb-1'
              >
                Signature
              </label>
              <input
                id='signature'
                type='text'
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className='w-full bg-primary text-white px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent'
              />
            </div>
            <div>
              <label
                htmlFor='publicKey'
                className='block text-sm font-semibold text-accent mb-1'
              >
                Sender's Public Key
              </label>
              <input
                id='publicKey'
                type='text'
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className='w-full bg-primary text-white px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-accent'
              />
            </div>
          </div>
          <button
            onClick={handleValidateTransaction}
            className='mt-6 w-full bg-accent text-secondary px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-accent/90'
          >
            Validate Transaction
          </button>
          {isValid !== null && (
            <p
              className={`mt-4 text-center text-lg font-bold ${
                isValid ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isValid ? 'Transaction is valid' : 'Transaction is invalid'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionValidator
