"use client";

import { AxeIcon, ListBulletsIcon, XLogoIcon } from "@phosphor-icons/react";
import { ReactNode } from "react";

// type Property = { children: ReactNode; }

export default function Structure({ children }: { children: ReactNode }) {  // {children}: Property
    return (
        <>
            <header className="abolute top-6 inset-x-0 hidden">
                <div className="flex gap-4 h-10 items-center">
                    <span className=" text-(--so) text-xl mt-2 ">
                        Ordex
                    </span>
                </div>
            </header>
            <main className="flex flex-auto">
                {children}
            </main>
            <footer className="h-10">
                <div className="flex h-full items-end justify-center text-xs">
                    <span className="">v0.1.0 / 001</span>
                </div>
            </footer>
        </>
    );
}