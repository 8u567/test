"use client";

import { FC, ReactNode } from "react";

import { ConnectionProvider,WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

interface SolanaProviderProps {
  children: ReactNode;
}

export const Provider: FC<SolanaProviderProps> = ({ children }) => {

    const endpoint = "https://mainnet.helius-rpc.com/?api-key=d97e4979-d736-4d0d-8833-79412815ed4f";  
    
    // https://solana-rpc.publicnode.com  - https://api.devnet.solana.com

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};