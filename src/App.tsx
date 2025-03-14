import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, WagmiProvider } from 'wagmi'
import { config } from '../config/config'
import { Account } from './account'
import { WalletOptions } from './wallet-options'

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet/>
      </QueryClientProvider>
    </WagmiProvider>
  )
}