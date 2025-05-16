import React from 'react'

const DescriptionInput: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }> = ({ value, onChange }) => {
    return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Description (optional)<span className="text-red-500">*</span>
      </label>
      <textarea
        name="description"
        value={value}
        onChange={onChange}
        placeholder="Additional information about the meal"
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
    </div>
  )
}

export default DescriptionInput