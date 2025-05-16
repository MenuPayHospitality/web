import { Play, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const ClickedFoodImage = ({ image }: { image: string }) => {
    return (
        <div className="relative w-full aspect-square">
            <Image
                src={image}
                alt="Food item"
                className="w-full h-full object-cover"
                width={500}
                height={500}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white rounded-full p-4 opacity-80 hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-gray-800" />
                </button>
            </div>
            <div className="absolute top-3 right-3 flex items-center bg-gray-800 bg-opacity-60 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#FACC15" />
                <span className="text-white text-sm font-medium">4.0</span>
            </div>
        </div>
    );
}

export default ClickedFoodImage