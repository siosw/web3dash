import { useState } from 'react'

import Connect from './components/Connect'
import Block from './components/Block'
import Dai from './components/Dai'
import MessageSigner from './components/MessageSigner'

function App() {
  const [ selectedPage, setSelectedPage ] = useState(0)
  const [ wallet, setWallet ] = useState({
    address: undefined,
    error: undefined,
    signer: undefined,
    provider: undefined,
  })

  const pages = [
    (<Block wallet={wallet} />),
    (<Dai wallet={wallet} />),
    (<MessageSigner wallet={wallet} />),
  ]
  
  return (
    <div className='flex flex-col p-4 space-y-4'>
      <Connect wallet={wallet} setWallet={setWallet} />
      
      <div className='flex w-full h-32 space-x-4'>
        <div 
          onClick={() => setSelectedPage(0)}
          className='flex items-center justify-center h-full bg-blue-200 border border-4 border-black cursor-pointer grow'>
          <h1 className='text-xl font-bold'>block info</h1>
        </div>
        <div 
          onClick={() => setSelectedPage(1)}
          className='flex items-center justify-center h-full bg-green-200 border border-4 border-black cursor-pointer grow'>
          <h1 className='text-xl font-bold'>DAI txs</h1>
        </div>
        <div 
          onClick={() => setSelectedPage(2)}
          className='flex items-center justify-center h-full bg-yellow-200 border border-4 border-black cursor-pointer grow'>
          <h1 className='text-xl font-bold'>signer</h1>
        </div>
      </div>

      { pages[selectedPage] }
    </div>
  )
}

export default App;
