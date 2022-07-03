import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { formatWalletAddress } from '../utils/walletFormat'
function Connect({ wallet, setWallet }) {
  async function tryConnectWallet() {
    let provider
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum)
    } catch {
      setWallet({ error: 'please install Metamask' }) 
      return
    } 
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    setWallet({
      address: await signer.getAddress(),
      signer,
      provider,
    })
  }

  const [ message, setMessage ] = useState( 
    wallet.address ? formatWalletAddress(wallet.address) : 'connect wallet'
  )

  useEffect(() => {
    if (!wallet.provider) return

    async function checkNetwork() {
      const network = await wallet.provider.getNetwork()
      if (network.chainId !== 1) setWallet( { ...wallet, error: 'please select mainnet' } )
    } 
    checkNetwork()
  }, [wallet, setWallet])

  useEffect(() => {
    if (!window.ethereum) return
    
    async function onAccountsChanged() {
      if (!wallet.signer) return
      setWallet({ ...wallet, address: await wallet.signer.getAddress() })
    }
     
    // TODO: leave user connected after changing the network
    function onChainChanged(chainId) {
      const { error, ...rest } = wallet
       
      if (chainId === '0x1') setWallet({ ...rest, error: undefined })
      else setWallet({ rest, error: 'please select mainnet' })
    }

    window.ethereum.on('accountsChanged', onAccountsChanged)
    window.ethereum.on('chainChanged', onChainChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', onAccountsChanged)
      window.ethereum.removeListener('chainChanged', onChainChanged)
    }
  })

  useEffect(() => {
    async function setFormattedAddress(wallet) {
      const strAddress = await formatWalletAddress(wallet.address, wallet.provider)
      setMessage(strAddress)
    }
    if (wallet.error) setMessage(wallet.error)
    else if (wallet.address) setFormattedAddress(wallet)
    else setMessage('connect wallet')
  }, [wallet])

  return (
    <button 
      className='w-full h-16 text-xl font-bold bg-red-200 border border-4 border-black'
      onClick={() => tryConnectWallet()}
    >
      { message }
    </button>
  )
}

export default Connect
