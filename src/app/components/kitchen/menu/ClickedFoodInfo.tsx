"use client"
import React from 'react'

const ClickedFoodInfo = ({ name, description, price, currency }: 
  { name: string, description: string, price: number, currency: string}) => {
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-xl font-bold text-gray-900">{name}</h1>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">{currency}{price.toLocaleString()}</p>
        </div>
      </div>
      
      {/* <div className="flex gap-2 mb-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div> */}
      
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default ClickedFoodInfo