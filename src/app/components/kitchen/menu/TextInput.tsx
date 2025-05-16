import React from 'react'

const TextInput: React.FC<{
    label: string;
    name: string;
    value: string;
    placeholder: string;
    required?: boolean;
    hasError?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, placeholder, required = false, hasError = false, onChange }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 border rounded-md ${hasError ? 'border-red-500' : 'border-gray-300'}`}
        />
    </div>
);

export default TextInput