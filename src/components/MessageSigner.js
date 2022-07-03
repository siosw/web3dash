import { useState } from 'react'

function MessageSigner({ wallet }) {
  const [ input, setInput ] = useState(undefined)
  const [ output, setOutput ] = useState(undefined)
   
   
  if (!wallet.provider) return (<p className='font-mono'>connect wallet to use this feature</p>)

  async function onSignClicked() {
    if (!wallet.signer) return
    if (!input) return

    const signed = await wallet.signer.signMessage(input) 
    setOutput(signed)
  }
  
  return (
    <div className='flex flex-col space-y-4'>
      <textarea 
        placeholder='message to sign'
        onChange={e => setInput(e.target.value)}
        className='p-4 font-mono border border-4 border-black'/>
      <button 
        onClick={() => onSignClicked()}
        className='w-16 font-bold border border-4 border-black'>
        sign
      </button>
      { output && <p className='p-4 font-mono break-all bg-yellow-100'>{output}</p> }
    </div>
  )
}

export default MessageSigner
