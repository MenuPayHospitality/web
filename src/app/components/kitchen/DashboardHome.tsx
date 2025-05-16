import { useState } from "react";
import { Plus, Home, Menu, FileText, Package } from "lucide-react";
import KitchenHeader from "./KitchenHeader";
import Image from "next/image";

export default function DashboardHome() {
  const [activeTab, setActiveTab] = useState("Activity");
  
  const foodItems = [
    {
      id: 1,
      name: "Ofada Rice",
      plates: 3,
      tables: "Multiple Tables",
      price: 300000,
      image: "/api/placeholder/100/100",
      date: "Today",
    },
    {
      id: 2,
      name: "Vegetable Soup",
      plates: 1,
      tables: "1 Table",
      price: 15000,
      image: "/api/placeholder/100/100",
      date: "Today",
    },
    {
      id: 3,
      name: "Peppered Chicken",
      plates: 5,
      tables: "1 Table",
      price: 70000,
      image: "/api/placeholder/100/100",
      date: "Today",
    },
    {
      id: 4,
      name: "Jollof Rice",
      plates: 1,
      tables: "1 Table",
      price: 25000,
      image: "/api/placeholder/100/100",
      date: "15/04/2025",
    },
    {
      id: 5,
      name: "Pounded Yam",
      plates: 1,
      tables: "1 Table",
      price: 12000,
      image: "/api/placeholder/100/100",
      date: "15/04/2025",
    },
    {
      id: 6,
      name: "Beef Burger",
      plates: 3,
      tables: "Multiple Tables",
      price: 18000,
      image: "/api/placeholder/100/100",
      date: "15/04/2025",
    },
  ];

  // Format price to include commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('NGN', '₦');
  };

  return (
    <div className="flex flex-col bg-gray-50 h-screen"> 
      <KitchenHeader />

      {/* Add Menu Item Button */}
      <div className="px-4 mb-2">
        <button className="w-full bg-yellow-400 text-gray-800 p-2 rounded-lg font-medium flex items-center justify-center">
          <Plus size={20} className="mr-2" />
          Add Menu Item
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="px-4 flex border-b">
        <button 
          className={`py-2 px-4 relative ${activeTab === "Activity" ? "text-black font-medium border-b-2 border-yellow-400" : "text-gray-500"}`}
          onClick={() => setActiveTab("Activity")}
        >
          Activity
          <span className="ml-1 bg-gray-200 text-xs px-2 py-0.5 rounded-full">5</span>
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === "History" ? "text-black font-medium border-b-2 border-yellow-400" : "text-gray-500"}`}
          onClick={() => setActiveTab("History")}
        >
          History
        </button>
      </div>
      
      {/* Food Items List */}
      <div className="flex-1 overflow-auto px-4">
        {foodItems.map((item, index) => (
          <div key={item.id} className="mt-4">
            {(index === 0 || foodItems[index - 1].date !== item.date) && (
              <p className="text-gray-500 text-sm mb-2">{item.date}</p>
            )}
            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
              <Image 
                src={item.image} 
                alt={item.name} 
                width={300}
                height={300}
                className="w-12 h-12 rounded-md object-cover mr-3" 
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.plates} Plates • {item.tables}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(item.price)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Bar */}
      <div className="mt-auto bg-white border-t flex justify-between items-center px-6 py-3 inset-0 bottom-0">
        <button className="flex flex-col items-center text-xs text-gray-900">
          <Home size={20} className="mb-1" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center text-xs text-gray-500">
          <Menu size={20} className="mb-1" />
          <span>Menu</span>
        </button>
        <button className="flex flex-col items-center text-xs text-gray-500">
          <FileText size={20} className="mb-1" />
          <span>Orders</span>
        </button>
        <button className="flex flex-col items-center text-xs text-gray-500">
          <Package size={20} className="mb-1" />
          <span>Inventory</span>
        </button>
      </div>
    </div>
  );
}