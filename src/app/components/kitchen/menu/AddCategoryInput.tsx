import { Plus } from 'lucide-react';
import React from 'react'

const AddCategoryInput: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: () => void;
    onCancel: () => void;
}> = ({ value, onChange, onAdd, onCancel }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium">
            Category<span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-2">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Enter new category"
                className="flex-grow p-2 border rounded-md"
            />
            <button
                type="button"
                onClick={onAdd}
                className="p-2 bg-green-500 text-white rounded-md"
            >
                <Plus size={20} />
            </button>
            <button
                type="button"
                onClick={onCancel}
                className="p-2 bg-gray-200 rounded-md"
            >
                Cancel
            </button>
        </div>
    </div>
);

export default AddCategoryInput