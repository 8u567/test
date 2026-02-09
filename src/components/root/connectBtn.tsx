"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function ConnectBtn() {
    const { publicKey, connected } = useWallet();
    const { setVisible } = useWalletModal();

    const [action, setAction] = useState(false);

    const router = useRouter();

    const redirect = () => {
        router.push(`/account/${publicKey?.toBase58()}`);
    };

    const connect = () => {
        if (connected && publicKey) {
            redirect();
        } else {
            setVisible(true);
            setAction(true);
        }
    };

    useEffect(() => {
        if (action && publicKey && connected) {
            redirect();
        }

    }, [action, publicKey]);


    return (
        <button onClick={connect} className="bg-(--so) h-12 pt-0.5 flex-auto uppercase text-black rounded-lg cursor-pointer">
            Let's Connect
        </button>
    );
}