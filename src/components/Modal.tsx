import React from 'react';
import { WalletOptions } from './WalletOpitons';
import './Modal.css'

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id="modal">
        <button onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      
      <h2>Connect with your wallet</h2>
      
      <WalletOptions />
    </div>
  );
};

export default WalletModal;