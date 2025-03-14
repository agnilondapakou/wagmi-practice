import { http, createConfig } from 'wagmi'
import { mainnet, holesky, liskSepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { switchChain } from '@wagmi/core'

const projectId = ''

export const config = createConfig({
  chains: [mainnet, holesky, liskSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http("https://eth.drpc.org"),
    [holesky.id]: http("https://holesky.drpc.org"),
    [liskSepolia.id]: http("https://rpc.sepolia-api.lisk.com"),
  },
})

// export const PROJECT_ID = process.env.REACT_APP_REOWN_ID