import { useAccount } from "wagmi"
import { Account } from "./Accounts"
import { useState } from "react";
import WalletModal from "./Modal";
import './ConnectButton.css'

export default function ConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { isConnected } = useAccount()
  
  if (isConnected) return <Account />
  return isModalOpen ? 
                  <WalletModal isOpen={isModalOpen} onClose={closeModal} />: 
                  <button onClick={openModal}>Connect wallet</button>
}