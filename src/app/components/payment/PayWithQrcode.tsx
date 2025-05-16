// // 'use client';
// // import { useState, useEffect, useMemo, useRef } from 'react';
// // import {
// //   createQR,
// //   encodeURL,
// //   findReference,
// //   FindReferenceError,
// //   validateTransfer,
// // } from '@solana/pay';
// // import { Keypair, PublicKey } from '@solana/web3.js';
// // import { connection } from '../../../../utlis/constants';
// // import BigNumber from 'bignumber.js';
// // import { getAssociatedTokenAddress } from '@solana/spl-token';

// // interface PaymentProps {
// //   restaurantAddress: string;
// //   title: string;
// //   paymentAmount: number;
// //   onPaymentSuccess: () => void;
// // }

// // const PayWithQrcode: React.FC<PaymentProps> = ({
// //   title,
// //   paymentAmount,
// //   onPaymentSuccess,
// //   restaurantAddress,
// // }) => {
// //   const qrRef = useRef<HTMLDivElement>(null);
// //   const [validatedTransaction, setValidatedTransaction] = useState(false);
// //   const [recipientTokenAccount, setRecipientTokenAccount] = useState<PublicKey | null>(null);

// //   const usdc_mint = process.env.NEXT_PUBLIC_USDC_MINT;
// //   if (!usdc_mint) {
// //     throw new Error('NEXT_PUBLIC_USDC_MINT environment variable is required');
// //   }

// //   const recipient = new PublicKey(restaurantAddress);
// //   const amount = new BigNumber(paymentAmount);
// //   const reference = useMemo(() => Keypair.generate().publicKey, []); // Stable reference
// //   const label = 'MENUPAY';
// //   const message = `Food payment for ${title}`;
// //   const memo = 'MENUPAY FOOD PAYMENT';

// //   useEffect(() => {
// //     const fetchTokenAccount = async () => {
// //       try {
// //         const ata = await getAssociatedTokenAddress(new PublicKey(usdc_mint), recipient);
// //         setRecipientTokenAccount(ata);
// //       } catch (e) {
// //         console.error('Error fetching recipient token account:', e);
// //         setRecipientTokenAccount(null);
// //       }
// //     };

// //     fetchTokenAccount();
// //   }, [recipient, usdc_mint]);

// //   useEffect(() => {
// //     const generateQR = async () => {
// //       if (!recipientTokenAccount) {
// //         console.error('Recipient token account not found');
// //         return;
// //       }

// //       const solanaUrl = encodeURL({
// //         recipient: recipientTokenAccount,
// //         amount,
// //         splToken: new PublicKey(usdc_mint),
// //         reference,
// //         label,
// //         message,
// //         memo,
// //       });

// //       const qr = createQR(solanaUrl, 300, 'transparent');

// //       if (qrRef.current) {
// //         qrRef.current.innerHTML = '';
// //         qr.append(qrRef.current);
// //       }
// //     };

// //     if (recipientTokenAccount) {
// //       generateQR();
// //     }
// //   }, [recipientTokenAccount, amount, reference, usdc_mint]);

// //   useEffect(() => {
// //     const interval = setInterval(async () => {
// //       try {
// //         const signatureInfo = await findReference(connection, reference, {
// //           finality: 'confirmed',
// //         });

// //         const validated = await validateTransfer(
// //           connection,
// //           signatureInfo.signature,
// //           { recipient, amount, reference },
// //           { commitment: 'finalized' }
// //         );

// //         if (validated && !validatedTransaction) {
// //           setValidatedTransaction(true);
// //           onPaymentSuccess();
// //         }
// //       } catch (e) {
// //         if (e instanceof FindReferenceError) {
// //           return;
// //         }
// //         console.error('Unknown error', e);
// //       }
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [reference, amount, recipient, validatedTransaction, onPaymentSuccess]);

// //   return (
// //     <div className="bg-[#1F1F1F] p-4">
// //       <h2 className="text-center text-[14px] font-semibold">Scan to pay</h2>
// //       <div className="flex justify-center p-4 bg-white rounded-lg">
// //         <div ref={qrRef} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default PayWithQrcode;


// 'use client';
// import { useState, useEffect, useMemo, useRef } from 'react';
// import {
//   createQR,
//   encodeURL,
//   findReference,
//   FindReferenceError,
//   validateTransfer,
// } from '@solana/pay';
// import { Keypair, PublicKey } from '@solana/web3.js';
// import { connection } from '../../../../utlis/constants';
// import BigNumber from 'bignumber.js';
// import { getAssociatedTokenAddress } from '@solana/spl-token';

// interface PaymentProps {
//   restaurantAddress: string;
//   title: string;
//   paymentAmount: number;
//   onPaymentSuccess: () => void;
// }

// const PayWithQrcode: React.FC<PaymentProps> = ({
//   title,
//   paymentAmount,
//   onPaymentSuccess,
//   restaurantAddress,
// }) => {
//   const qrRef = useRef<HTMLDivElement>(null);
//   const [validatedTransaction, setValidatedTransaction] = useState(false);
//   const [recipientTokenAccount, setRecipientTokenAccount] = useState<PublicKey | null>(null);

//   // const usdc_mint = process.env.NEXT_PUBLIC_USDC_MINT;
//   // if (!usdc_mint) {
//   //   throw new Error('NEXT_PUBLIC_USDC_MINT environment variable is required');
//   // }

//   const recipient = new PublicKey(restaurantAddress);
//   const amount = new BigNumber(paymentAmount);
//   const reference = useMemo(() => Keypair.generate().publicKey, []); // Stable reference
//   const label = 'MENUPAY';
//   const message = `Food payment for ${title}`;
//   const memo = 'MENUPAY FOOD PAYMENT';

//   // useEffect(() => {
//   //   const fetchTokenAccount = async () => {
//   //     try {
//   //       const ata = await getAssociatedTokenAddress(new PublicKey(usdc_mint), recipient);
//   //       setRecipientTokenAccount(ata);
//   //     } catch (e) {
//   //       console.error('Error fetching recipient token account:', e);
//   //       setRecipientTokenAccount(null);
//   //     }
//   //   };

//   //   fetchTokenAccount();
//   // }, [recipient, usdc_mint]);

//   useEffect(() => {
//     const generateQR = async () => {
//       if (!recipientTokenAccount) {
//         console.error('Recipient token account not found');
//         return;
//       }

//       const solanaUrl = encodeURL({
//         recipient: recipientTokenAccount,
//         amount,
//         // splToken: new PublicKey(usdc_mint),
//         reference,
//         label,
//         message,
//         memo,
//       });

//       const qr = createQR(solanaUrl, 300, 'transparent');

//       if (qrRef.current) {
//         qrRef.current.innerHTML = '';
//         qr.append(qrRef.current);
//       }
//     };

//     if (recipientTokenAccount) {
//       generateQR();
//     }
//   }, [recipientTokenAccount, amount, reference]);

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const signatureInfo = await findReference(connection, reference, {
//           finality: 'confirmed',
//         });

//         const validated = await validateTransfer(
//           connection,
//           signatureInfo.signature,
//           { recipient, amount, reference },
//           { commitment: 'finalized' }
//         );

//         if (validated && !validatedTransaction) {
//           setValidatedTransaction(true);
//           onPaymentSuccess();
//         }
//       } catch (e) {
//         if (e instanceof FindReferenceError) {
//           return;
//         }
//         console.error('Unknown error', e);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [reference, amount, recipient, validatedTransaction, onPaymentSuccess]);

//   return (
//     <div className="bg-[#1F1F1F] p-4 z-50">
//       <h2 className="text-center text-[14px] font-semibold">Scan to pay</h2>
//       <div className="flex justify-center p-4 bg-white rounded-lg">
//         <div ref={qrRef} />
//       </div>
//     </div>
//   );
// };

// export default PayWithQrcode;


import { useEffect, useMemo, useRef, useState } from "react";
import {
  createQR,
  encodeURL,
  findReference,
  FindReferenceError,
  validateTransfer,
} from "@solana/pay";
// import { setCookie } from 'cookies-next';
import { Keypair, PublicKey } from "@solana/web3.js";
// import useToastHook from "@/hooks/useToastHook";
import BigNumber from 'bignumber.js';
import { connection } from "../../../../utlis/constants";
;

interface Payment {
  paymentAmount: number
  title: string
  restaurantAddress: string
  onPaymentSuccess: () => any
}


export const QrCodePayment: React.FC<Payment> = ({
  paymentAmount,
  title,
  restaurantAddress,
  onPaymentSuccess
}) => {
  const [validatedTransaction, setValidatedTransaction] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);

  // if (!ofiBoxAddress) {
  //     throw new Error('Wallet address is not defined');
  // }
  // const paymentAmount = process.env.NEXT_PUBLIC_PAYMENT_AMOUNT

  const recipient = new PublicKey("7u5mMx6fzDzmByfiRSDagfcX85JPmCrcU8VdprZNqC4b");
  const amount = new BigNumber(Number(1));
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  const label = 'MENUPAY';
  const message = `MENUPAY Restaurant.`;
  const memo = 'MENUPAY..';

  useEffect(() => {
    const solanaUrl = encodeURL({ recipient, amount, reference, label, message, memo });
    const qr = createQR(
      solanaUrl,
      300,
      "transparent"
    );

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [reference]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const signatureInfo = await findReference(connection, reference, {
          finality: "confirmed",
        });

        const validated = await validateTransfer(connection, signatureInfo.signature, {
          recipient,
          amount,
          reference
        }, { commitment: "finalized" })

        if (validated) {
          setValidatedTransaction(true)
        }

      } catch (e) {
        if (e instanceof FindReferenceError) {
          return;
        }
        console.error("Unknown error", e);
      }
    }, 1000); // Check for new transactions every second
    return () => {
      clearInterval(interval);
    };
  }, [reference]);

  return (
    <div className="z-50">
      <h2 className="text-center text-[14px] font-semibold">Scan to pay</h2>
      <div className="flex justify-center p-4 bg-white rounded-lg">
        <div ref={qrRef} />
      </div>
    </div>
  )
}