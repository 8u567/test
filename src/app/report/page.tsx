"use client";

import { useEffect, useMemo, useState } from "react";

import { ArrowBendDownLeftIcon, CircleNotchIcon, ShareNetworkIcon, TipJarIcon } from "@phosphor-icons/react";

import { reportJSON } from "~/lib/main";
import { NavBtn } from "~/components/actionBtn";

export default function ReportPage() {
    const [metadata, setMetadata] = useState<undefined | reportJSON>(undefined);

    useEffect(() => {
        const get = sessionStorage.getItem("report");
        get ? setMetadata(JSON.parse(get)) : null;

    }, []);

    const transactions = useMemo(() => {
        return metadata ? Math.ceil(metadata.accounts / 25) : 0;
    }, [metadata]);

    const value = useMemo(() => {
        return metadata ? (0.00203928 * metadata.accounts).toFixed(4) : "0.0000";
    }, [metadata]);

    const text = `Got ${value} $SOL, by @OrdexOfficial\ncheck out #DustBuster...\nhttps://ordex.lol/`;

    const linked = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;

    return (
        <div className="flex-auto flex items-center justify-center">
            <div className="w-full md:w-1/2 flex items-center justify-center">
                {metadata ? (
                    <div>
                        <button className="text-(--so) absolute top-8 right-8 text-2xl cursor-pointer" onClick={() => window.location.reload()}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </button>

                        <div className="flex flex-col items-center gap-4">
                            <div className="text-(--so) text-5xl animate-bounce">
                                <TipJarIcon weight="fill" size={64} />
                            </div>
                            <h1 className="text-2xl font-black text-(--so)">
                                <span className="text-xl">+</span>
                                {value}
                                <span className="text-xs"> SOL</span>
                            </h1>
                            <p className="text-xs text-center">
                                closed <b className="font-black text-(--so)">[ {metadata.accounts} ]</b> empty associated token accounts <br />
                                in  <b className="font-black text-(--so)">[ {transactions} ]</b> transactions.
                            </p>

                            <div className="flex gap-4 pt-8">
                                <NavBtn dir="/">
                                    <ArrowBendDownLeftIcon size={18} />
                                </NavBtn>

                                <NavBtn dir={linked} external>
                                    <ShareNetworkIcon size={18} />
                                </NavBtn>
                            </div>
                        </div>
                    </div>

                ) : (
                    <CircleNotchIcon size={24} className="animate-spin text-(--so)" />
                )}
            </div>
        </div>
    );
}