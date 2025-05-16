import React from 'react'

const KitchenHeader = () => {
    return (
        <div>
            <div className="bg-white px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Welcome!</p>
                        <p className="text-sm text-gray-500">Thefoodfactoryng</p>
                    </div>
                </div>
                <div>
                    <button className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.5-1.5a4 4 0 01-5.5-5.5L9 6l-5 5v4h4l5-5zm2-7a4 4 0 104 4H17" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <p className="text-gray-600 text-xs">Total Orders</p>
                    <p className="text-lg font-bold">11,205</p>
                </div>
                <div className="bg-yellow-200 p-2 rounded-lg">
                    <p className="text-gray-600 text-xs">Today's Order</p>
                    <p className="text-lg font-bold">220</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                    <p className="text-gray-600 text-xs">Available Items</p>
                    <p className="text-lg font-bold">20</p>
                </div>
            </div>
        </div>
    )
}

export default KitchenHeader