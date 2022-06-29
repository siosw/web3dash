import { useState } from 'react'

function Connect({ wallet, setWallet }) {
  function formatWalletAddress(address) {
    return address.substring(0, 3) + '...' + address.substring(address.length - 3, address.length)
  }
  const [ message, setMessage ] = useState( 
    wallet.address ? formatWalletAddress(wallet.address) : 'connect wallet'
  )

  return (
    <button 
      className='w-full h-16 text-xl font-bold bg-red-200 border border-4 border-black'
      onClick={() => setMessage('clicked')}
    >
      { message }
    </button>
  )
}

export default Connect
