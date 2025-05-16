import React, { useState } from 'react'
interface Order {
    table: string;
    time: string;
    status: string;
    items: { name: string; quantity: string }[];
    date?: string;
    paid: boolean;
  }
  
  interface HistoryItem {
    name: string;
    quantity: string;
    revenue: string;
    date?: string;
  }

const DashboardManagement = () => {
    const [selectedTab, setSelectedTab] = useState<string>('Activity');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
    const orders: Order[] = [
      {
        table: 'Table 12',
        time: '15 mins ago',
        status: 'Pending',
        items: [
          { name: 'Ofada Rice', quantity: '3 Plates' },
          { name: 'Rose Wine', quantity: '1 bottle' },
          { name: 'Bottle Water', quantity: '5 bottles' },
        ],
        paid: true,
      },
      {
        table: 'Table 04',
        time: '25 mins ago',
        status: 'Served',
        items: [],
        date: '15/04/2025',
        paid: true,
      },
      {
        table: 'Table 02',
        time: 'Yesterday',
        status: 'Served',
        items: [],
        date: '15/04/2025',
        paid: true,
      },
      {
        table: 'Table 17',
        time: 'Yesterday',
        status: 'Served',
        items: [],
        date: '15/04/2025',
        paid: true,
      },
    ];
  
    const history: HistoryItem[] = [
      { name: 'Ofada Rice', quantity: '3 Plates • Multiple Tables', revenue: '₦300,000', date: 'Today' },
      { name: 'Vegetable Soup', quantity: '1 Plate • 1Table', revenue: '₦15,000', date: 'Today' },
      { name: 'Peppered Chicken', quantity: '5 Plates • 1Table', revenue: '₦70,000', date: 'Today' },
      { name: 'Jollof Rice', quantity: '1 Plate • 1Table', revenue: '₦25,000', date: '16/04/2025' },
      { name: 'Pounded Yam', quantity: '1 Plate • 1Table', revenue: '₦12,000', date: '16/04/2025' },
      { name: 'Beef Burger', quantity: '3 Plates • Multiple Tables', revenue: '₦18,000', date: '16/04/2025' },
    ];
  
    const toggleOrder = (table: string) => {
      setExpandedOrder(expandedOrder === table ? null : table);
    };
  
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              selectedTab === 'Activity' ? 'bg-yellow-300' : 'bg-white'
            }`}
            onClick={() => setSelectedTab('Activity')}
          >
            Activity <span className="ml-1 bg-gray-200 text-xs rounded-full px-2 py-1">5</span>
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              selectedTab === 'History' ? 'bg-yellow-300' : 'bg-white'
            }`}
            onClick={() => setSelectedTab('History')}
          >
            History
          </button>
        </div>
  
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedTab === 'Activity' ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.table} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{order.table}</span>
                      {order.table === 'Table 12' && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      <span className="text-green-500 text-sm">• Paid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 text-sm">{order.time}</span>
                      <button onClick={() => toggleOrder(order.table)}>
                        <svg
                          className={`w-4 h-4 transform ${expandedOrder === order.table ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {expandedOrder === order.table && order.items.length > 0 && (
                    <div className="mt-2">
                      <div className="text-gray-600 font-medium">Order</div>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-700 mt-1">
                          <span>{item.name}</span>
                          <span>{item.quantity}</span>
                        </div>
                      ))}
                      <button className="text-blue-500 text-sm mt-2">View Order</button>
                    </div>
                  )}
                  {order.date && <div className="text-gray-500 text-sm mt-1">{order.date}</div>}
                  <button
                    className={`mt-2 px-4 py-1 rounded text-sm font-medium ${
                      order.status === 'Pending'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {order.status}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.name} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-gray-500 text-sm">{item.quantity}</div>
                    </div>
                    <div className="font-semibold">{item.revenue}</div>
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{item.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Bottom Navigation */}
        <div className="flex justify-around py-2 bg-white border-t border-gray-300">
          {['Home', 'Menu', 'Orders', 'Inventory'].map((item) => (
            <button key={item} className="flex flex-col items-center text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    item === 'Home'
                      ? 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                      : item === 'Menu'
                      ? 'M4 6h16M4 12h16M4 18h16'
                      : item === 'Orders'
                      ? 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      : 'M20 7l-3-3m0 0l-3 3m3-3v12'
                  }
                />
              </svg>
              <span className="text-xs">{item}</span>
            </button>
          ))}
        </div>
      </div>
    );
}

export default DashboardManagement