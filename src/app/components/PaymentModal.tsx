import Image from "next/image";
import React from "react";

interface PaymentModalProps {
  onClose: () => void;
  onSelect: (method: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onSelect }) => {
  const paymentMethods = [
    { name: "Menupay Wallet", icon: "/wallet-icon.png" },
    { name: "Paypal", icon: "/paypal-icon.png" },
    { name: "Send Money", icon: "/send-money-icon.png" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div className="bg-gray-800 text-white rounded-t-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Pay Using</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="mt-4">
          {paymentMethods.map((method) => (
            <button
              key={method.name}
              onClick={() => onSelect(method.name)}
              className="flex items-center justify-between w-full p-4 bg-gray-700 rounded-lg mb-2"
            >
              <div className="flex items-center">
                <Image src={method.icon} alt={method.name} className="w-6 h-6 mr-2" width={300} height={300} />
                <span>{method.name}</span>
              </div>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;