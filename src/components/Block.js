import { useState, useEffect, useCallback } from 'react'

function Block({ wallet }) {
  const [ blockNumber, setBlockNumber ] = useState(0)
  const [ blockInfo, setBlockInfo ] = useState({
    difficulty: undefined,
    gasUsed: undefined,
    miner: undefined,
    timestamp: undefined,
  })

  const getCurrentBlockInfo = useCallback(async blockNumber => {
    const block = await wallet.provider.getBlock(blockNumber)
    setBlockInfo({
      gasUsed: block.gasUsed.toString(),
      miner: block.miner,
      timestamp: block.timestamp,
      numberTransactions: block.transactions.length
    })
  }, [wallet])

  useEffect(() => {
    if (!wallet.provider) return

    async function getCurrentBlockNumber() {
      const currentNumber = await wallet.provider.getBlockNumber()
      setBlockNumber(currentNumber) 
    }
    
    function onNewBlockNumber(newNumber) {
      setBlockNumber(newNumber) 
    }

    getCurrentBlockNumber()
    wallet.provider.on('block', onNewBlockNumber)

    return () => {
      wallet.provider.off('block', onNewBlockNumber)
    }
  }, [wallet])

  useEffect(() => {
    if (!wallet.provider) return
    getCurrentBlockInfo(blockNumber)
  }, [blockNumber, wallet, getCurrentBlockInfo])

  useEffect(() => {
    if (blockInfo.gasUsed === '0') getCurrentBlockInfo(blockNumber)
  }, [blockInfo, blockNumber, getCurrentBlockInfo])

  if (!wallet.provider) return (<p className='font-mono'>connect wallet to use this feature</p>)
  
  return (
    <div className='font-mono'>
      <p className='font-bold'>current block: { blockNumber }</p>
      <p>gas used: { blockInfo.gasUsed }</p>
      <p>miner: { blockInfo.miner }</p>
      <p>timestamp: { blockInfo.timestamp }</p>
      <p>included txs: { blockInfo.numberTransactions }</p>
    </div>
  )
}

export default Block
