import React from 'react'

const Loader = () => {
    return (
        <div className="w-full h-full fixed opacity-40 top-0 left-0 transparent flex justify-center items-center">
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#BB8F54]"></div>
            </div>
        </div>
    )
}

export default Loader