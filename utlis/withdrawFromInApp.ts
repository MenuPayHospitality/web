import { Connection, VersionedTransaction, PublicKey, TransactionInstruction, TransactionMessage } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';

// Configuration constants
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // Mainnet USDC mint address

// Interface for function parameters
interface WithdrawUSDCParams {
  connection: Connection;
  userPublicKeyAddress: string;
  amount: number;
  signTransaction: any
  restaurantAddress: string
}

/**
 * Withdraws USDC from Privy embedded wallet to a destination address
 * @param params - Function parameters
 * @returns Transaction signature
 */
export async function withdrawUSDC({
  connection,
  userPublicKeyAddress,
  amount,
  signTransaction,
  restaurantAddress,
}: WithdrawUSDCParams): Promise<string> {
  try {
    // Validate inputs
    if (!connection) {
      throw new Error('Connection is required');
    }
    if (!userPublicKeyAddress || !restaurantAddress) {
      throw new Error('User public key or restaurant address is missing');
    }
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount');
    }

    // Validate public keys
    let userPublicKey: PublicKey;
    let destinationPublicKey: PublicKey;
    try {
      userPublicKey = new PublicKey(userPublicKeyAddress);
      destinationPublicKey = new PublicKey(restaurantAddress);
    } catch (err) {
      throw new Error(`Invalid public key`);
    }

    console.log(userPublicKey)
    console.log(destinationPublicKey)

    // Convert amount to lamports (USDC has 6 decimals)
    const amountInLamports: number = Math.round(amount * 1_000_000);

    const userTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      userPublicKey
    );

    const destinationTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      destinationPublicKey
    );

    // Check if destination token account exists
    const destinationAccountInfo = await connection.getAccountInfo(destinationTokenAccount);
    if (!destinationAccountInfo) {
      throw new Error('Destination token account does not exist');
    }

    // Create transaction instructions
    const instructions: TransactionInstruction[] = [
      new TransactionInstruction({
        keys: [
          { pubkey: userTokenAccount, isSigner: false, isWritable: true },
          { pubkey: destinationTokenAccount, isSigner: false, isWritable: true },
          { pubkey: userPublicKey, isSigner: true, isWritable: false },
        ],
        programId: TOKEN_PROGRAM_ID,
        data: Buffer.from([
          3, // Transfer instruction
          ...new Uint8Array(
            BigInt(amountInLamports)
              .toString(16)
              .padStart(16, '0')
              .match(/.{2}/g)!
              .map(byte => parseInt(byte, 16))
          ),
        ]),
      }),
    ];

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');

    // Create transaction message
    const messageV0 = new TransactionMessage({
      payerKey: userPublicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();

    // Create versioned transaction
    const transaction = new VersionedTransaction(messageV0);

    // Sign transaction
    const signedTransaction = await signTransaction(transaction);

    // Send transaction
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    // Confirm transaction
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }

    return signature;
  } catch (error) {
    console.error('USDC withdrawal failed:', error);
    throw error;
  }
}