import Link from "next/link";
import { ReactNode } from "react";


const styled = `h-12 w-12 flex items-center cursor-pointer justify-center rounded-lg 
    bg-zinc-900/25 border border-zinc-800 hover:border-(--so) hover:text-black
    text-zinc-600 transition duration-500 hover:bg-(--so)`;


type Props01 = {
    dir: string;
    external?: boolean;
    children: ReactNode;
}

export function NavBtn({ dir, external = false, children }: Props01) {
    return external ? (
        <a href={dir} target="_blank" className={styled}>
            {children}
        </a>

    ) : (
        <Link href={dir} className={styled}>
            {children}
        </Link>
    )
}


type Props02 = {
    action: () => void;
    children: ReactNode;
}

export function TapBtn({ action, children }: Props02) {
    return (
        <button onClick={action} className={styled}>
            {children}
        </button>
    );
}