"use client";
import Link from "next/link";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { CircleNotchIcon, ShareNetworkIcon, SignOutIcon, WalletIcon } from "@phosphor-icons/react";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { useAccounts, validator } from "~/lib/solana";
import { reportJSON } from "~/lib/main";

import { TapBtn, NavBtn } from "~/components/actionBtn";


export default function AccountPage() {
    const { address } = useParams() as { address: string };

    const { connected, publicKey, disconnect } = useWallet();
    const { setVisible } = useWalletModal();

    const router = useRouter();
    const { getEmptyAccounts, closeAccounts } = useAccounts();

    const [correct, setCorrect] = useState<undefined | boolean>(undefined);

    const [action, setAction] = useState(false);
    const [doing, setDoing] = useState(false);

    const [emptyAccounts, setAccounts] = useState<undefined | string[]>(undefined);

    useEffect(() => {
        (async () => {
            const result = await validator(address);
            setCorrect(result);

            if (result) {
                const report = await getEmptyAccounts(address);
                setAccounts(report);
            }
        })();

    }, [address]);

    const redirect = () => {
        router.push(`/account/${publicKey?.toBase58()}`);
    }

    const ownable = useMemo(() => {
        return correct && publicKey ? publicKey.toBase58() === address : false;
    }, [address, publicKey, correct]);


    const handle = () => {
        if (connected && publicKey) {
            disconnect();
        } else {
            setVisible(true);
            setAction(true);
        }
    }

    useEffect(() => {
        if (action && publicKey) {
            setAction(false);
            redirect();
        }

    }, [action, publicKey]);






    const closeATAs = async () => {
        if (!emptyAccounts || emptyAccounts.length === 0) {
            alert("No empty token accounts found.");
            return;
        }

        setDoing(true);

        const res = await closeAccounts(emptyAccounts);
        sessionStorage.setItem("report", JSON.stringify(res));

        router.push("../report");
    };


    const text = `Got ${emptyAccounts ? (emptyAccounts.length * 0.002).toFixed(4) : "0.0000"} $SOL, by @OrdexOfficial\ncheck out #DustBuster...\nhttps://ordex.lol/`;

    const linked = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;

    return correct ? (
        <div className="flex-auto flex items-center justify-center">
            <div className="md:w-1/3 w-full flex flex-col gap-4">
                <div className="flex flex-col-reverse gap-4 ">
                    <div className="relative aspect-video text-center border flex justify-center flex-col rounded-lg border-zinc-800 bg-black/15">
                        <h1 className="text-3xl text-(--so) gap-2 flex items-center justify-center">
                            {
                                emptyAccounts ? (emptyAccounts.length * 0.002).toFixed(4) : ""
                            }

                            <span className="text-xs">SOL</span>
                        </h1>
                        <span className="uppercase text-xs  absolute bottom-4 left-4">
                            empty accounts ~ {emptyAccounts?.length}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-end gap-4">
                            <TapBtn action={handle}>
                                <WalletIcon size={18} />
                            </TapBtn>
                            <div>
                                <h3 className={`uppercase leading-4 ${ownable ? "text-(--so)" : "text-pink-700"} `}>
                                    {ownable ? "connected" : "not connected"}
                                </h3>
                                <span className="text-xs">
                                    {address.slice(0, 2) + "..." + address.slice(-4)}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4 ">
                            <NavBtn dir={linked} external>
                                <ShareNetworkIcon size={18} />
                            </NavBtn>

                            <NavBtn dir="../">
                                <SignOutIcon size={18} />
                            </NavBtn>
                        </div>
                    </div>
                </div>
                {ownable &&
                    <button onClick={closeATAs} className="bg-[#4ADE80] h-12 flex-auto uppercase text-black rounded-lg cursor-pointer flex items-center justify-center">
                        {
                            doing ? <CircleNotchIcon size={18} className="animate-spin" /> : "claim & close accounts"
                        }
                    </button>
                }
            </div>
        </div>

    ) : (
        <div className="flex-auto flex items-center justify-center">
            <div className="md:w-1/3 w-full flex text-center flex-col gap-4">
                <h1 className="uppercase text-2xl text-zinc-300">
                    address not found!
                </h1>
                <Link href={"/"} className="">
                    back to home
                </Link>
            </div>
        </div>
    );
}