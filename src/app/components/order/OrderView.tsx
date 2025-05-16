import React from 'react';
import { X, Clock } from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  image: string;
}

interface OrderViewProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number;
  timeOrdered: string;
  timeElapsed: string;
  status: 'Pending' | 'Served' | 'Delivered';
  orderItems: OrderItem[];
  preparationTime: {
    total: number;
    remaining?: number;
    isExpired?: boolean;
  };
}

const OrderView: React.FC<OrderViewProps> = ({
  isOpen,
  onClose,
  tableNumber,
  timeOrdered,
  timeElapsed,
  status,
  orderItems,
  preparationTime
}) => {
  if (!isOpen) return null;

  const getStatusColor = () => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Served': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Served': return 'bg-green-100 text-green-800 border-green-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTimerContent = () => {
    if (status === 'Delivered') {
      return (
        <div className="flex items-center justify-between">
          <Clock size={20} className="mr-2" />
          <span className="font-medium">Preparation Time</span>
          <span className="bg-green-500 text-white px-4 py-1 rounded-md">Delivered</span>
        </div>
      );
    }

    if (preparationTime.isExpired) {
      return (
        <div className="flex items-center justify-between">
          <Clock size={20} className="mr-2" />
          <span className="font-medium">Preparation Time</span>
          <span className="bg-red-400 text-white px-4 py-1 rounded-md">Time up!</span>
          <div className="rounded-full border-4 border-red-500 w-12 h-12 flex items-center justify-center">
            <span className="text-red-500 font-bold">30:00</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between">
        <Clock size={20} className="mr-2" />
        <span className="font-medium">Preparation Time</span>
        <span className="bg-blue-500 text-white px-4 py-1 rounded-md">
          {preparationTime.remaining} mins left
        </span>
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-yellow-400 border-r-yellow-400 border-b-transparent border-l-transparent transform rotate-45"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-700 font-bold text-sm">05:04</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">View Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium">Table {tableNumber}</span>
              <span className="ml-3 text-xs text-gray-500">{timeOrdered}</span>
            </div>
            <span className="text-sm text-gray-500">{timeElapsed} ago</span>
          </div>

          <div className="p-4 bg-gray-100 rounded-md m-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Order</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge()}`}>
                {status}
              </span>
            </div>

            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden mr-3">
                      <Image width={300}
                        height={300} src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-gray-700">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-100 border-t">
          {getTimerContent()}
        </div>

        {status === 'Pending' && (
          <div className="p-4">
            <button className="w-full bg-yellow-400 text-black font-medium py-3 rounded-md flex items-center justify-center">
              <span>Swipe to Deliver</span>
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderView;