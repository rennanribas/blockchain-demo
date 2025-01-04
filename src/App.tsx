import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import HashConverter from './pages/HashConverter'
import Transactions from './pages/Transactions'
import KeyPair from './pages/KeyPair'
import TransactionValidator from './pages/TransactionValidator'

function App() {
  return (
    <div className='flex flex-col h-screen bg-background text-text font-sans'>
      <Router>
        <Header />
        <div className='flex-1 overflow-y-auto'>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/hash-converter' element={<HashConverter />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/key-pair' element={<KeyPair />} />
            <Route
              path='/transaction-validator'
              element={<TransactionValidator />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
