"use client";

import { PublicKey } from "@solana/web3.js";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Invite() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const addy = searchParams.get("referral");
        if (!addy) return;

        try {
            const address = new PublicKey(addy);
            sessionStorage.setItem("code", address.toBase58());

        } catch (err) {
            console.warn("Invalid referral address", addy);
        }

    }, [searchParams]);

    return null;
}