"use client";

import { FC, ReactNode } from "react";

import { ConnectionProvider,WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaProviderProps {
  children: ReactNode;
}

export const Provider: FC<SolanaProviderProps> = ({ children }) => {

    const endpoint = "https://solana-rpc.publicnode.com";  
    
    // https://solana-rpc.publicnode.com  - https://api.devnet.solana.com

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};