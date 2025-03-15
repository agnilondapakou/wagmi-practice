import { useAccount } from "wagmi"
import { Account } from "./Accounts"
import { useState } from "react";
import WalletModal from "./Modal";
import './ConnectButton.css'
import { FaPlug } from '@react-icons/all-files/fa/FaPlug';


export default function ConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { isConnected } = useAccount()
  
  if (isConnected) return <Account />
  return isModalOpen ? 
                  <WalletModal isOpen={isModalOpen} onClose={closeModal} />: 
                  <div id="connection">
                    <div id="connection-space">
                      <img src="wallet.svg" alt="" />
                      <h2>Welcome on our app</h2>
                      <p>Connect your wallet to continue</p>
                      <button onClick={openModal}><FaPlug/> Connect wallet</button>
                    </div>
                  </div>
}