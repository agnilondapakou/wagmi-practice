import { useAccount, useDisconnect, useEnsName, useSwitchChain } from 'wagmi'
import './Account.css'
import { useCallback } from 'react'
import { getChainId } from '@wagmi/core'
import { config } from '../../config/config'
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FaUserSecret } from '@react-icons/all-files/fa/FaUserSecret';
import { FaArrowAltCircleRight } from '@react-icons/all-files/fa/FaArrowAltCircleRight';

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

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
        <img alt="Wallet icon" src="wallet.svg" />
        {address && <span><b><FaUserSecret/> Connected as : </b><code>{ensName ? `${ensName} (${address})` : address}</code></span>}
        <span><b> <FaLink/> Chain ID : </b><code>{ getCurrentChainId() }</code></span>
        <span><b> <FaLink/> Chain Name : </b><code>{ getChainName() }</code></span>
      </div>
      {chains.map((chain) => (
        <button id="chains" key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          <img src={`${chain.name}.svg`} alt="" /> <br />
          {chain.name.split(' ')[0]}
        </button>
      ))} <br />
      <button id='disconnect' onClick={() => disconnect()}><FaArrowAltCircleRight/> Disconnect</button>
    </div>
  )
}