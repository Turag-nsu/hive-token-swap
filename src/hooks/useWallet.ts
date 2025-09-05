import { useContext } from 'react';
import { WalletContext } from '../providers/WalletProvider';
import type { WalletContextValue } from '../providers/WalletProvider';
import { keychain } from '@/lib';

export const useWallet = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
export const useWalletConnection = () => {
  const { isConnected, isConnecting, connect, disconnect } = useWallet();
  return { isConnected, isConnecting, connect, disconnect };
};


export const useWalletUser = () => {
  const { user, isConnected } = useWallet();
  return { user, isConnected };
};

export const useWalletSigning = () => {
  const { signTransaction, isConnected } = useWallet();
  return { signTransaction, canSign: isConnected };
};

export const useKeychainStatus = () => {
  const { keychainInstalled } = useWallet();
  return {
    isInstalled: keychainInstalled,
    installUrl: keychain.getInstallationUrl(),
  };
};