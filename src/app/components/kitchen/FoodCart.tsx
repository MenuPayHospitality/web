import { ArrowLeft, Trash, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface FoodCartProps {
  initialItems?: CartItem[];
  onBackClick?: () => void;
  onPlaceOrder?: (items: CartItem[], total: number) => void;
  currency?: string;
}

export default function FoodCart({
  initialItems = [
    {
      id: "1",
      name: "Ofada Rice",
      description: "Classic rice with spicy sauce",
      price: 15000,
      quantity: 2,
      imageUrl: "/api/placeholder/80/80"
    },
    {
      id: "2",
      name: "Mexican Fideo",
      description: "Mexican style spicy fideo",
      price: 25000,
      quantity: 1,
      imageUrl: "/api/placeholder/80/80"
    },
    {
      id: "3",
      name: "Beef Burger",
      description: "Grilled beef with cheese",
      price: 18000,
      quantity: 3,
      imageUrl: "/api/placeholder/80/80"
    }
  ],
  onBackClick = () => {},
  onPlaceOrder = () => {},
  currency = "₦"
}: FoodCartProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return `${currency}${price.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b">
        <button onClick={onBackClick} className="mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Your Food Cart</h1>
      </div>

      {/* Tap to add more items */}
      <div className="bg-amber-50 py-2 px-4">
        <button className="text-sm text-amber-700 flex items-center">
          <Plus size={16} className="mr-1" /> Swipe left to remove item
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto">
        {items.map(item => (
          <div key={item.id} className="flex p-4 border-b">
            <Image 
              src={item.imageUrl} 
              alt={item.name}
              width={300}
                height={300}
              className="w-16 h-16 rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.description}</p>
              <p className="font-bold mt-1">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
              >
                <Plus size={16} />
              </button>
              <button 
                onClick={() => removeItem(item.id)}
                className="ml-4 text-red-500"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary and Checkout */}
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Subtotal</span>
          <span className="font-bold">{formatPrice(calculateSubtotal())}</span>
        </div>
        <button 
          onClick={() => onPlaceOrder(items, calculateSubtotal())}
          className="w-full py-3 bg-amber-500 text-white rounded-lg font-bold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}