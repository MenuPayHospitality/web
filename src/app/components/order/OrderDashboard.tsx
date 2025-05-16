import React from 'react';
import { Home, Menu, FileText, Package } from 'lucide-react';
import Image from 'next/image';

interface OrderSummary {
  tableNumber: number;
  timeOrdered: string;
  timeElapsed: string;
  isNew?: boolean;
  status: 'Pending' | 'Served';
  items: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    image: string;
  }[];
  paid: boolean;
}

interface OrderDashboardProps {
  pendingOrders: number;
  deliveredOrders: number;
  orders: OrderSummary[];
  onViewOrder: (tableNumber: number) => void;
  currentDate: string;
}

const OrderDashboard: React.FC<OrderDashboardProps> = ({
  pendingOrders,
  deliveredOrders,
  orders,
  onViewOrder,
  currentDate
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 flex justify-between items-center">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C18 6.4 17.1 5 16 4C14.9 3 13.5 2 12 2C10.5 2 9.1 3 8 4C6.9 5 6 6.4 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 21C13 21.6 12.6 22 12 22C11.4 22 11 21.6 11 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="px-4 py-2 flex space-x-4">
        <div className="flex-1 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="text-sm text-gray-600 mb-1">Pending Orders</h3>
          <p className="text-3xl font-bold">{pendingOrders}</p>
        </div>
        <div className="flex-1 bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-sm text-gray-600 mb-1">Delivered Orders</h3>
          <p className="text-3xl font-bold">{deliveredOrders}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-2">
        {orders.map((order) => (
          <div key={order.tableNumber} className="mb-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center p-3 border-b">
              <div className="flex items-center">
                <span className="font-medium">Table {order.tableNumber}</span>
                {order.isNew && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                    New
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{order.timeElapsed} ago</span>
                <button className="ml-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {order.items.length > 0 && (
              <div className="p-3 bg-gray-50">
                <h3 className="font-medium mb-2">Order</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded overflow-hidden mr-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                          />
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
            )}

            <div className="p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-green-500 text-sm">Paid</span>
              </div>
              <button
                className="text-blue-500 text-sm flex items-center"
                onClick={() => onViewOrder(order.tableNumber)}
              >
                View Order
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {order.status === 'Served' && (
              <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-b-lg text-center">
                Served
              </div>
            )}
          </div>
        ))}

        <div className="text-xs text-gray-500 py-2">
          {currentDate}
        </div>
      </div>

      <div className="bg-white border-t flex justify-around p-2">
        <button className="flex flex-col items-center p-2 text-gray-700">
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-700">
          <Menu size={20} />
          <span className="text-xs mt-1">Menu</span>
        </button>
        <button className="flex flex-col items-center p-2 text-blue-500">
          <FileText size={20} />
          <span className="text-xs mt-1">Orders</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-700">
          <Package size={20} />
          <span className="text-xs mt-1">Inventory</span>
        </button>
      </div>
    </div>
  );
};

export default OrderDashboard;