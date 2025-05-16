import React from 'react'

const AvailabilityToggle: React.FC<{
    isAvailable: boolean;
    onToggle: () => void;
}> = ({ isAvailable, onToggle }) => {
    return (
        <div className="flex justify-between items-center">
            <span className="font-medium">Availability Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={onToggle}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
        </div>
    );
}

export default AvailabilityToggle