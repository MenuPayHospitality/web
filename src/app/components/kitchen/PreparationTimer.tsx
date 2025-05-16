import React from 'react';
import { Clock } from 'lucide-react';

interface PreparationTimerProps {
  status: 'pending' | 'expired' | 'delivered';
  timeRemaining?: string;
  totalTime: string;
  progress?: number; // 0-100
}

const PreparationTimer: React.FC<PreparationTimerProps> = ({
  status,
  timeRemaining,
  totalTime,
  progress = 0,
}) => {
  const getTimerContent = () => {
    switch (status) {
      case 'delivered':
        return (
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-gray-700" />
              <span className="font-medium text-gray-700">Preparation Time</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-green-500 text-white px-4 py-1 rounded-md">
                Delivered
              </span>
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{totalTime}</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'expired':
        return (
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-gray-700" />
              <span className="font-medium text-gray-700">Preparation Time</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-red-400 text-white px-4 py-1 rounded-md">
                Time up!
              </span>
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-red-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-red-500 font-bold">{totalTime}</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'pending':
      default:
        return (
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-gray-700" />
              <span className="font-medium text-gray-700">Preparation Time</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-md">
                {timeRemaining} mins left
              </span>
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-yellow-400 border-r-yellow-400 border-b-transparent border-l-transparent" 
                     style={{ 
                       transform: `rotate(${45 + (progress * 3.6)}deg)`,
                       transition: 'transform 1s ease-in-out' 
                     }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">{timeRemaining}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return getTimerContent();
};

export default PreparationTimer;