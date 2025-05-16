import React from 'react';
import { X } from 'lucide-react';

interface DeliveryNotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeliveryNotification: React.FC<DeliveryNotificationProps> = ({ 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4 overflow-hidden">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center p-6 pt-10">
          <div className="relative mb-4">
            <div className="w-20 h-20 flex items-center justify-center">
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10C45 10 40 12 40 15L35 25H65L60 15C60 12 55 10 50 10Z" fill="#FBE68F" />
                <path d="M20 60C25 60 30 55 30 50H70C70 55 75 60 80 60V70H20V60Z" fill="black" stroke="black" strokeWidth="2" />
                <path d="M85 50C85 45 80 40 75 40H25C20 40 15 45 15 50H85Z" fill="white" stroke="black" strokeWidth="2" />
                <path d="M85 50C85 65 70 75 50 75C30 75 15 65 15 50" stroke="black" strokeWidth="2" />
                <path d="M15 50H30" stroke="black" strokeWidth="2" />
              </svg>
              <div className="absolute top-0 right-0 w-10 h-10 bg-yellow-300 rounded-full"></div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-2">Delivery in progress...</h2>
          <p className="text-gray-600 mb-6">The meal is being delivered!</p>
          
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotification;