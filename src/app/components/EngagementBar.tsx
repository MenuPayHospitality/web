"use client"
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import React, { useState } from 'react'

const EngagementBar = ({ likes, comments, isFavorite = false, isSaved = false }: 
    { likes: number, comments: number, isFavorite?: boolean, isSaved?: boolean }) => {
    const [favorite, setFavorite] = useState(isFavorite);
    const [saved, setSaved] = useState(isSaved);
    const [likeCount, setLikeCount] = useState(likes);
    
    const handleLike = () => {
      if (favorite) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setFavorite(!favorite);
    };
  
    return (
      <div className="flex justify-between items-center py-3 px-4">
        <button 
          className="flex items-center" 
          onClick={handleLike}
        >
          <Heart className={`w-6 h-6 ${favorite ? 'text-red-500 fill-red-500' : 'text-gray-800'}`} />
          <span className="ml-2 text-gray-800 font-medium">{likeCount}</span>
        </button>
        
        <button className="flex items-center">
          <MessageCircle className="w-6 h-6 text-gray-800" />
          <span className="ml-2 text-gray-800 font-medium">{comments}</span>
        </button>
        
        <button 
          className="flex items-center"
          onClick={() => setSaved(!saved)}
        >
          <Bookmark className={`w-6 h-6 ${saved ? 'text-blue-500 fill-blue-500' : 'text-gray-800'}`} />
        </button>
      </div>
    );
  };

export default EngagementBar