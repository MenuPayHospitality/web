"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

interface SuccessMenuUploadProps {
    restaurantId: string
}

const SuccessMenuUpload: React.FC<SuccessMenuUploadProps> = ({restaurantId}) => {
    const router = useRouter()

    const handleDone = () => {
        router.push(`/restaurants/${restaurantId}/menu`)
    }

    return (
        <div className="fixed inset-0 bg-zinc-[100] opacity-70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[300px] text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-12l-6 6m6-6l6 6"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Well Done!</h2>
            <p className="text-gray-600 mb-6">
              Your new menu item has been added and published!
            </p>
            <button
              onClick={handleDone}
              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Ok
            </button>
          </div>
        </div>
      );
}

export default SuccessMenuUpload