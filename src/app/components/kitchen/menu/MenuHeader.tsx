import { ArrowLeft } from 'lucide-react';
import React from 'react'

const MenuHeader: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => (

    <div className="px-4 py-3 border-b sticky top-0 left-0 w-full bg-white z-40">
        <button
            type="button"
            onClick={onBack}
            className="flex items-center text-gray-700"
        >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back</span>
        </button>
        <h1 className="text-2xl font-semibold mt-4">{title}</h1>
    </div>
)

export default MenuHeader