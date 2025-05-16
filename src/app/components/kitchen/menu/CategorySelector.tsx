import { ChevronDown } from 'lucide-react';
import React from 'react'

const CategorySelector: React.FC<{
    category: string;
    categories: string[];
    hasError: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onAddNew: () => void;
}> = ({ category, categories, hasError, onChange, onAddNew }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium">
            Category<span className="text-red-500">*</span>
        </label>
        <div className="relative">
            <select
                name="category"
                value={category}
                onChange={onChange}
                className={`w-full p-3 border rounded-md appearance-none pr-10 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
            >
                <option value="">Select category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={20} className="text-gray-500" />
            </div>
            <button
                type="button"
                onClick={onAddNew}
                className="mt-2 text-sm text-blue-500 font-medium"
            >
                + Add new category
            </button>
        </div>
    </div>
);


export default CategorySelector