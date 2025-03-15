import { http, createConfig } from 'wagmi'
import { mainnet, liskSepolia, sepolia, base } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, base, liskSepolia],
  connectors: [],
  transports: {
    [mainnet.id]: http("https://eth.drpc.org"),
    [sepolia.id]: http("https://sepolia.drpc.org"),
    [base.id]: http("https://base.drpc.org"),
    [liskSepolia.id]: http("https://rpc.sepolia-api.lisk.com"),
  },
})
