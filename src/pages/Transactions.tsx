import { useState } from 'react'

function Transactions() {
  const [transactions, setTransactions] = useState<
    { owner: string; receiver: string; value: string; hash: string }[]
  >([])
  const [owner, setOwner] = useState('')
  const [receiver, setReceiver] = useState('')
  const [value, setValue] = useState('')

  const handleAddTransaction = async () => {
    if (!owner || !receiver || !value) return
    const hash = await generateHash(`${owner}${receiver}${value}`)
    setTransactions([...transactions, { owner, receiver, value, hash }])
    setOwner('')
    setReceiver('')
    setValue('')
  }

  const generateHash = async (input: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background text-text font-sans px-4'>
      <h2 className='text-3xl font-bold text-accent mb-6'>Transactions</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full max-w-4xl'>
        <input
          type='text'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder='Owner'
          className='border border-secondary rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-secondary text-text'
        />
        <input
          type='text'
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder='Receiver'
          className='border border-secondary rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-secondary text-text'
        />
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Value'
          className='border border-secondary rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-secondary text-text'
        />
      </div>
      <button
        onClick={handleAddTransaction}
        className='bg-accent text-secondary px-6 py-2 rounded-full font-medium shadow-lg hover:bg-accent/90 mb-6'
      >
        Add Transaction
      </button>
      <div className='w-full max-w-4xl'>
        {transactions.length > 0 ? (
          <table className='w-full border-collapse border border-secondary text-sm bg-secondary rounded'>
            <thead className='bg-primary text-text'>
              <tr>
                <th className='border border-secondary px-4 py-2'>Owner</th>
                <th className='border border-secondary px-4 py-2'>Receiver</th>
                <th className='border border-secondary px-4 py-2'>Value</th>
                <th className='border border-secondary px-4 py-2'>Hash</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className='hover:bg-accent/10'>
                  <td className='border border-secondary px-4 py-2'>
                    {transaction.owner}
                  </td>
                  <td className='border border-secondary px-4 py-2'>
                    {transaction.receiver}
                  </td>
                  <td className='border border-secondary px-4 py-2'>
                    {transaction.value}
                  </td>
                  <td className='border border-secondary px-4 py-2'>
                    {transaction.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center text-gray-500'>
            No transactions added yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default Transactions
