"use client";
import { useState, useEffect } from "react";
import { Heart, MessageSquare, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  likes: number;
  comments: number;
  restaurant: string;
  rating: number;
}

interface DisplayFoodItemProps {
  foodItem: FoodItem;
}

const DisplayFoodItem: React.FC<DisplayFoodItemProps> = ({ foodItem }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Initialize state after component mounts on client
  useEffect(() => {
    setIsClient(true);
    setLikes(foodItem.likes || 0);
  }, [foodItem.likes]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const addToCart = () => {
    try {
      const existingCart = localStorage.getItem("cartItems");
      let cartItems = existingCart ? JSON.parse(existingCart) : [];

      const existingItemIndex = cartItems.findIndex((item: any) => item.id === foodItem.id);
      if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].quantity += 1;
      } else {
        cartItems.push({
          id: foodItem.id,
          name: foodItem.name,
          description: foodItem.description,
          price: foodItem.price,
          quantity: 1,
          image: foodItem.imageUrl,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert(`${foodItem.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Render a placeholder during SSR or if data is missing
  if (!isClient || !foodItem) {
    return <div className="bg-white p-4 rounded shadow">Loading food item...</div>;
  }

  return (
    <div className="bg-white relative rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {foodItem.imageUrl ? (
          <Image
            src={foodItem.imageUrl}
            alt={foodItem.name}
            className="w-full aspect-square object-cover"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {/* Restaurant icon */}
        {foodItem.restaurant && (
          <div className="absolute top-4 left-4 bg-amber-400 rounded-full p-2">
            <span className="text-xs font-bold">{foodItem.restaurant.charAt(0)}</span>
          </div>
        )}
        
        {/* Rating */}
        {typeof foodItem.rating === 'number' && (
          <div className="absolute top-4 right-4 bg-white rounded-md px-2 py-1 flex items-center">
            <span className="text-sm font-bold">★ {foodItem.rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Add to cart button */}
        <div className="absolute bottom-4 right-4 flex items-center">
          <button
            onClick={addToCart}
            className="bg-amber-400 rounded-md px-3 py-2 font-medium text-sm shadow-md flex items-center"
          >
            Add to Cart
            <ShoppingCart className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      
      {/* Food details */}
      <div className="p-3">
        <div className="flex items-center space-x-3 mb-1">
          <button onClick={handleLike} className="flex items-center">
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            <span className="ml-1 text-sm text-gray-700">{likes.toLocaleString()}</span>
          </button>
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-gray-500" />
            <span className="ml-1 text-sm text-gray-700">{foodItem.comments || 0}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900">{foodItem.name}</h3>
        <p className="text-sm text-gray-500">{foodItem.description}</p>
        <p className="mt-1 text-lg font-bold text-gray-900">
          ${typeof foodItem.price === 'number' ? foodItem.price.toFixed(2) : '0.00'}
        </p>
      </div>
    </div>
  );
};

export default DisplayFoodItem;