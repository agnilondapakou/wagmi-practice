import { SetStateAction, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, WagmiProvider } from 'wagmi'
import { ethers } from "ethers";
import { config } from '../config/config'
import { Account } from './account'
import { WalletOptions } from './wallet-options'

const queryClient = new QueryClient()

const CHAIN_IDS = {
  "0x1": "Ethereum Mainnet",
  "0xaa36a7": "Sepolia Testnet",
  "0x106a": "Lisk Sepolia Testnet",
  "0x2105": "Base Mainnet",
};

const SUPPORTED_CHAINS = [
  { id: "0x1", name: "Ethereum Mainnet" },
  { id: "0xaa36a7", name: "Sepolia Testnet" },
  { id: "0x106a", name: "Lisk Sepolia Testnet" },
  { id: "0x2105", name: "Base Mainnet" },
];

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

export default function App() {
  const [chainId, setChainId] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      getCahinId();

      window.ethereum.on("chainChanged", (newChainId: SetStateAction<string>) => {setChainId(newChainId);});
    } else {
      alert("Ethereum provider not detected. Install MetaMask.");
    }
  }, []);
  
  const getCahinId = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setChainId(chainId);
    } catch (error) {
      console.error("Error getting chain ID:", error);
    }
  };

  const switchChain = async (newChainId: SetStateAction<string>) => {
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: newChainId }]});
      setChainId(newChainId);
    } catch (error) {
      alert("Error switching chain:");
    }
  };

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet/>
        </QueryClientProvider>
      </WagmiProvider>
      <p>
            Current Chain:{" "}
            <strong>{CHAIN_IDS[chainId] || "Onknown chain"}</strong>
          </p>
          <select onChange={(e) => switchChain(e.target.value)} value={chainId}>
            {SUPPORTED_CHAINS.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select><br /><br />
    </>
  )
}