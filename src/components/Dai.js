import { useState, useEffect } from 'react'
import { Contract, utils } from 'ethers'
import { formatWalletAddress } from '../utils/walletFormat'

function Dai({ wallet }) {
  const abi = [
    'event Transfer(address indexed src, address indexed dst, uint val)',
  ]
  const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'
  const [txs, setTxs] = useState([])

  useEffect(() => {
    if(!wallet.provider) return

    const contract = new Contract(daiAddress, abi, wallet.provider)
    const filter = contract.filters.Transfer()

    
    async function onTransfer(from, to, amount) {
      const strFrom = await formatWalletAddress(from, wallet.provider)
      const strTo = await formatWalletAddress(to, wallet.provider)
      setTxs(txs => [{ 
        from: strFrom, 
        to: strTo,
        amount: utils.formatEther(amount.sub(amount.mod(1e14)))
      }, ...txs])
    }
    contract.on(filter, onTransfer)

    return () => {
      contract.off(filter, onTransfer)
    }
  })

  if (!wallet.provider) return (<p className='font-mono'>connect wallet to use this feature</p>)

  return (
    <div className='font-mono'>
      <p className='font-bold'>observed txs: { txs.length }</p>
      { txs.map((tx, i) => (<p key={i}>{ tx.from } sent { tx.amount } DAI to { tx.to }</p>)) }
    </div>
  )
}

export default Dai
