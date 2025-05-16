import { OrdersProps } from '@/types/order';
import React from 'react';

const OrderList: React.FC<OrdersProps> = ({ orders, toggleOrder, activeTab, setActiveTab }) => {
  const activityOrders = orders.filter((order) => order.status === "Pending");
  const historyOrders = orders.filter((order) => order.status === "Paid");

  return (
    <div className="space-y-4">
      {activeTab === "activity"
        ? activityOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-800">
                    {order.table} •{" "}
                    <span className="text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full text-xs">
                      {order.time}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{order.date}</span>
                  <span className="text-gray-500">
                    {order.isExpanded ? "▲" : "▼"}
                  </span>
                </div>
              </div>
              {order.isExpanded && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Order</p>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                  </div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">🍽️</span>
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="text-sm text-gray-800">{item.name}</span>
                        <span className="text-sm text-gray-600">{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </span>
                      <span className="text-sm text-green-500 font-medium">Paid</span>
                    </div>
                    <button className="text-blue-500 text-sm font-medium underline">
                      View Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        : historyOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-800">{order.table} • {order.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{order.date}</span>
                  <span className="text-gray-500">
                    {order.isExpanded ? "▲" : "▼"}
                  </span>
                </div>
              </div>
              {order.isExpanded && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </span>
                      <span className="text-sm text-green-500 font-medium">Paid</span>
                    </div>
                    <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
                      Served
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default OrderList;