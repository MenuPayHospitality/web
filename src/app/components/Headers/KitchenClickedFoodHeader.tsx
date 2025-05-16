"use client"
import { ChevronLeft } from 'lucide-react'
import React from 'react'

type KitchenClickedFoodHeaderProps = {
  onClickedKitchenFood: () => void;
  onEdit: () => void;
};

const KitchenClickedFoodHeader = ({onClickedKitchenFood, onEdit}: KitchenClickedFoodHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      <button 
        className="flex items-center text-gray-700"
        onClick={() => onClickedKitchenFood()}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="ml-2 text-lg font-medium">Back</span>
      </button>
      <button 
        className="p-2 rounded-full bg-blue-50"
        onClick={onEdit}
      >
        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      </button>
    </div>
  )
}

export default KitchenClickedFoodHeader