"use client"
import { KitchenFoodProps } from '@/types/Kitchen'
import Image from 'next/image'
import React from 'react'

const KitchenFood:React.FC<KitchenFoodProps> = ({
    item,
    handleToggleAvailability
}) => {
    return (
        <div key={item.id} className="flex items-center p-3 border-b border-gray-100">
            <Image
                src="/assest/header1.png"
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover mr-3"
                width={100}
                height={100}
            />
            <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm">₦{item.price.toLocaleString()}</p>
                <span className={`text-xs ${item.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
            </div>
            <div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isAvailable}
                        onChange={() => handleToggleAvailability(item.id)}
                    />
                    <div className={`w-11 h-6 rounded-full peer ${item.isAvailable
                            ? 'bg-green-600'
                            : 'bg-gray-200'
                        } after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                  after:transition-all ${item.isAvailable ? 'after:translate-x-5' : ''}`}></div>
                </label>
            </div>
        </div>
    )
}

export default KitchenFood