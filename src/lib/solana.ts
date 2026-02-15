import { TOKEN_PROGRAM_ID, createCloseAccountInstruction } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, TransactionSignature, Transaction, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { reportJSON } from "./main";


const coffee = new PublicKey("HpSs9kD3egNgAjmHvi1HDoewzQDea2LizGANJDvGG2PE");

const each = 0.0002 * LAMPORTS_PER_SOL;

export function useAccounts() {
    const { connection } = useConnection();
    const { publicKey, signAllTransactions } = useWallet();

    async function getEmptyAccounts(addy: string) {
        const address = new PublicKey(addy);

        // Get all SPL token accounts owned by the address.
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(address, {
            programId: TOKEN_PROGRAM_ID,
        });

        // Filter accounts with zero token balance.
        const vacant = tokenAccounts.value.filter((spl) => {
            const data = spl.account.data.parsed;
            const amount = data.info.tokenAmount.uiAmount;

            return amount === 0;

        }).map((spl) => spl.pubkey.toBase58());

        return vacant;
    }


    async function closeAccounts(accounts: string[]): Promise<reportJSON | undefined> {

        if (accounts && publicKey && signAllTransactions) {
            const eachTX = 25;
            const eachSign = 100;

            const emptyAccounts = accounts.map((e) => new PublicKey(e));

            // Process accounts sign in chunks of 100
            for (let num = 0; num < emptyAccounts?.length; num += eachSign) {
                const e100 = emptyAccounts.slice(num, num + eachSign)
                const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

                const TXs: Transaction[] = [];

                // Create transactions, each handling up to 25 accounts
                for (let x = 0; x < e100.length; x += eachTX) {
                    const e25 = e100.slice(x, x + eachTX)
                    const TX = new Transaction();

                    e25.forEach((account) => {
                        TX.add(
                            createCloseAccountInstruction(
                                account,
                                publicKey,
                                publicKey
                            )
                        )
                    });

                    const rent = await connection.getMinimumBalanceForRentExemption(0);

                    // Calculate total fee for this transaction
                    const amount = each * e25.length;

                    TX.add(
                        SystemProgram.transfer({
                            fromPubkey: publicKey,
                            toPubkey: coffee,
                            lamports: amount + rent
                        })
                    );

                    // Transaction metadata for each 25 accounts
                    TX.feePayer = publicKey;
                    TX.recentBlockhash = blockhash;

                    TXs.push(TX);
                }

                // Sign and send 100 accounts in 4 transactions in batch
                const signed = await signAllTransactions(TXs);

                for (const tx of signed) {
                    const sig = await connection.sendRawTransaction(
                        tx.serialize(),
                        { skipPreflight: false }
                    );

                    await connection.confirmTransaction({
                        signature: sig,
                        blockhash: blockhash,
                        lastValidBlockHeight: lastValidBlockHeight
                    });
                }


            }
            return ({
                accounts: emptyAccounts.length,
                payer: publicKey.toBase58()
            });
        } else {
            return ({
                accounts: 5000,
                payer: "NAH"
            });
        }


    }


    return { getEmptyAccounts, closeAccounts };
}










export async function validator(address: string): Promise<boolean> {
    try {
        new PublicKey(address);
        return true;
    } catch (e) {
        return false;
    }
}