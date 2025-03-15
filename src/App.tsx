import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, WagmiProvider } from 'wagmi'
import { config } from '../config/config'
import { Account } from './components/Accounts'
import './App.css'
import ConnectButton from './components/ConnectButton'

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <ConnectButton />
}

export default function App() {

  return (
    <>
      <div id='bg-image'></div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet/>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}