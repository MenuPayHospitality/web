import { Connection } from "@solana/web3.js";

export const connection = new Connection(process.env.NEXT_PUBLIC_MANNIET_RPC || "https://api.mainnet-beta.solana.com", "confirmed")