import { Play, Heart, MessageSquare, Bookmark } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FoodPostProps {
  username: string;
  rating: number;
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  likes: number;
  comments: number;
}

export default function FoodPost({
  username = "thefoodfactory",
  rating = 4.0,
  imageUrl = "/api/placeholder/400/400",
  title = "Mexican Pasta",
  description = "Hot Mexican 5 pc pasta garnished with mint leaf",
  price = "₦15,000",
  likes = 812,
  comments = 24
}: FoodPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-md bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">
            @
          </div>
          <span className="font-medium text-sm">{username}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-amber-500">★</span>
          <span className="text-sm">{rating}</span>
        </div>
      </div>
      
      {/* Image */}
      <div className="relative">
        <Image 
          src={imageUrl}
          alt={title}
          width={300}
                height={300}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-black bg-opacity-50 rounded-full p-2">
            <Play size={24} color="white" />
          </button>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between p-3">
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center space-x-1"
          >
            <Heart size={18} fill={isLiked ? "red" : "none"} color={isLiked ? "red" : "black"} />
            <span className="text-sm">{likes}</span>
          </button>
          <button className="flex items-center space-x-1">
            <MessageSquare size={18} />
            <span className="text-sm">{comments}</span>
          </button>
        </div>
        <button 
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark size={18} fill={isSaved ? "black" : "none"} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
        <p className="font-bold mt-1">{price}</p>
      </div>
    </div>
  );
}