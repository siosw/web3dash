import { useState } from 'react'

import Connect from './components/Connect'

function App() {
  const [ selectedPage, setSelectedPage ] = useState(0)
  const [ wallet, setWallet ] = useState({
    address: undefined,
    error: undefined,
  })
  
  return (
    <div className='p-4'>
      <Connect wallet={wallet} setWallet={setWallet} />
    </div>
  )
}

export default App;
