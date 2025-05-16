// components/FoodItem.tsx
import Image from "next/image";
import React from "react";

interface FoodItemProps {
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  likes: number;
  comments: number;
  onAddToCart: () => void;
}

const FoodItem: React.FC<FoodItemProps> = ({
  name,
  description,
  price,
  rating,
  image,
  likes,
  comments,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="w-full h-48 object-cover rounded-lg"
        />
        <button className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{rating}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">₦{price.toLocaleString()}</p>
          <div className="flex items-center space-x-2">
            <span className="flex items-center">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="ml-1">{likes}</span>
            </span>
            <span className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              <span className="ml-1">{comments}</span>
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onAddToCart}
        className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg flex items-center justify-center"
      >
        Add to Cart
        <svg
          className="w-5 h-5 ml-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17v2H3.414a1 1 0 01-.707-1.707L5 13m12 0v2m0 0v2m0-2h-2m2 0h2" />
        </svg>
      </button>
    </div>
  );
};

export default FoodItem;