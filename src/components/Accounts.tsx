import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useSwitchChain } from 'wagmi'
import './Account.css'
import { useCallback } from 'react'
import { getChainId } from '@wagmi/core'
import { config } from '../../config/config'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  const { chains, switchChain } = useSwitchChain()

  const getCurrentChainId = useCallback(() => {
    const chainId = getChainId(config)
    return chainId
  }, [chains])
  
  const getChainName = useCallback(() => {
    const chainId = getCurrentChainId()
    return chains.find((chain) => chain.id === chainId)?.name
  }, [chains])

  return (
    <div id='account'>
      <div id='account-info'>
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        {address && <div><b>Connected as : </b><code>{ensName ? `${ensName} (${address})` : address}</code></div>}
        <span><b>Chain ID : </b><code>{ getCurrentChainId() }</code></span>
        <span><b>Chain Name : </b><code>{ getChainName() }</code></span>
      </div>
      {chains.map((chain) => (
        <button id="chains" key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          <img src={`${chain.name}.svg`} alt="" /> <br />
          {chain.name.split(' ')[0]}
        </button>
      ))} <br />
      <button id='disconnect' onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}