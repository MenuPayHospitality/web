import React from 'react'

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
        <span className="text-white text-sm">🍽️</span>
      </div>
      <div className='text-center'>
        <h1 className="text-[15px] font-bold text-gray-800">Welcome!</h1>
        <p className="text-[12px] text-gray-600">Thefoodforyng</p>
      </div>
      <div className="flex space-x-2">
        <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600">🔔</span>
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader