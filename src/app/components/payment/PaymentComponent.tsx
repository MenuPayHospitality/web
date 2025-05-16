"use client"
import { X } from "lucide-react";
import { useState } from "react";
import { connection } from "../../../../utlis/constants";
import { withdrawUSDC } from "../../../../utlis/withdrawFromInApp";
import { usePrivy, useSignTransaction, useSolanaWallets } from "@privy-io/react-auth";
import Image from "next/image";
import LoginComponent from "../account/LoginAccount";
import { QrCodePayment } from "./PayWithQrcode";

interface PaymentComponentProps {
  onClosePaymentModel: (show: boolean) => void;
  // setShowCartModel: (show: boolean) => void;
  restaurantAddress: string
  title: string;
  amount: number;
  orderId: string;
  onPaymentSuccess: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export default function PaymentComponent({
  onClosePaymentModel,
  // setShowCartModel,
  title,
  amount,
  orderId,
  restaurantAddress,
  onPaymentSuccess,
}: PaymentComponentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showQrcodePayment, setShowQrcodePayment] = useState(false);
  const { wallets } = useSolanaWallets();
  const { user } = usePrivy();
  const { signTransaction } = useSignTransaction();
  const [isUserLogin, setIsUserLogin] = useState(false)

  const paymentMethods: PaymentMethod[] = [
    { id: "in_app_wallet", name: "Menupay Wallet", icon: "/assest/yellow.png" },
    { id: "scan_payment", name: "Pay with USDC", icon: "/assest/usdc.png" },
  ];

  const handlePayment = async (type: string, methodId: string) => {
    if (type === "in_app_wallet") {

      console.log("Testing")
      try {
        console.log(wallets[0]?.address)
        if (!user || !wallets[0].address) {
          onClosePaymentModel(true)
          setIsUserLogin(true)
          console.error("No wallet address available");
          return;
        }
        
        await withdrawUSDC({
          connection,
          userPublicKeyAddress: wallets[0]?.address.toString(),
          amount,
          signTransaction,
          restaurantAddress
        });
        // onPaymentSuccess();
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      }
    } else {
      setSelectedMethod(methodId);
      setShowQrcodePayment(true);
      console.log("Tested..")
    }
  };

  const handleCloseModel = () => {
    onClosePaymentModel(false);
    // setShowCartModel(false);
  };

  const handleQrcodePaymentSuccess = () => {
    onPaymentSuccess();
    setShowQrcodePayment(false);
  };

  return (
    <>
      {isUserLogin && <LoginComponent />}
      <div className="bg-gray-50 fixed bottom-0 flex flex-col justify-end rounded-t-xl max-h-[90vh] z-50 w-full md:w-1/2 mx-auto">
        {showQrcodePayment && selectedMethod === "scan_payment" ? (
          <QrCodePayment
            paymentAmount={amount}
            title={title}
            restaurantAddress={restaurantAddress}
            onPaymentSuccess={handleQrcodePaymentSuccess}
          />
        ) : (
          <div className="bg-[#1F1F1F] text-gray-400 p-4 pb-20 rounded-t-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Pay Using</span>
              <button onClick={handleCloseModel} className="text-gray-400">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#292929] cursor-pointer"
                  onClick={() => handlePayment(method.id, method.id)}
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={method.icon}
                      alt={method.name}
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px]"
                    />
                    <h2 className="text-sm">{method.name}</h2>
                  </div>
                  <h2>{amount.toFixed(2)}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}