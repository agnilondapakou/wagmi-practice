import { switchChain } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { config } from './config'

const result = await switchChain(config, {
  addEthereumChainParameter: { 
    iconUrls: ['https://example.com/icon.png'], 
  }, 
  chainId: mainnet.id,
})