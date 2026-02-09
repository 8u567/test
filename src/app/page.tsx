"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { ArrowsDownUpIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

import ConnectBtn from "~/components/root/connectBtn";

const Invite = dynamic(() => import("~/components/root/referral"), { ssr: false });

export default function HomePage() {
    const [address, setAddress] = useState("");
    const router = useRouter();



    return (
        <div className="flex-auto flex items-center justify-center">
            <Invite />
            <div className="w-full md:w-1/3 space-y-10">
                <div className="text-center">
                    <h1 className="uppercase text-3xl text-(--so)">
                        Dust Buster
                    </h1>
                    <p>
                        got dusty solana laying around !? <br /> let's reclaim that...
                    </p>
                </div>

                <div className="flex-auto flex flex-col gap-4">
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); router.push(`/account/${address}`); }}>
                        <input
                            required
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="solana wallet address"
                            className={`flex-auto h-12 rounded-lg bg-zinc-900/25 text-center pt-0.5 text-[0.67rem] outline-none border hover:border-[#4ADE80] focus:border-[#4ADE80] transition duration-500 ${address ? "text-[#4ADE80] border-[#4ADE80]" : "text-zinc-600 border-zinc-800"}`}
                        />
                        <button type="submit" className="h-12 w-12 flex items-center cursor-pointer justify-center rounded-lg bg-zinc-900/25 border border-zinc-800 hover:border-[#4ADE80] hover:text-[#4ADE80] text-zinc-600 transition duration-500"
                        >
                            <MagnifyingGlassIcon size={20} />
                        </button>
                    </form>
                    <div className="w-full flex items-center gap-4 px-12 text-zinc-600">
                        <div className="h-px flex-auto bg-zinc-800" />
                        <ArrowsDownUpIcon size={20} />
                        <div className="h-px flex-auto bg-zinc-800" />
                    </div>
                    <ConnectBtn />
                </div>
            </div>

            <div className="absolute bottom-6 left-6 hidden md:block">
                <div className="flex items-center gap-6 text-(--so) text-4xl" >
                    <span className="mb-1">+</span>
                    <h2>97.50%</h2>
                </div>
                <p className="text-[0.6rem] pl-1">
                    Get back almost everything, others keep way more...
                </p>
            </div>
        </div>
    );


}
