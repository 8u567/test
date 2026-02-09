import "~/app/main.css";

import type { Metadata } from "next";
import { Provider } from "~/context/provider";

import Structure from "~/components/structure";

export const metadata: Metadata = {
    title: "Dust Buster",
    description: "Close empty token accounts and reclaim solana.",
    openGraph: {
        title: "Dust Buster",
        description: "Close empty token accounts and reclaim solana.",
        url: "https://ordex.lol/",
        siteName: "Website",
        images: [
            {
                url: "https://ordex.lol/og.png",
                width: 1200,
                height: 630,
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dust Buster",
        description: "Close empty token accounts and reclaim solana.",
        images: ["https://ordex.lol/og.png"],
    },
};

export default function RootLayout({ children }:
    { children: React.ReactNode; }) {

    return (
        <html lang="en">
            <body>
                <Provider>
                    <Structure>
                        {children}
                    </Structure>
                </Provider>
            </body>
        </html>
    );
}