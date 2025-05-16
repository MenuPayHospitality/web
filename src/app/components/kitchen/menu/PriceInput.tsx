import React from 'react'

const PriceInput: React.FC<{
    value: string;
    hasError: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, hasError, onChange }) => {

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium">
                Price<span className="text-red-500">*</span>
            </label>
            <div className="flex">
                <div className="flex items-center justify-center w-12 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    <span className="text-gray-500 font-medium">₦</span>
                </div>
                <input
                    type="text"
                    name="price"
                    value={value}
                    onChange={onChange}
                    placeholder="Enter price"
                    className={`flex-grow p-3 border rounded-r-md ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
        </div>
    )
}

export default PriceInput