"use client"
import React, { useState } from 'react'

const DashboardStatistic = () => {
    const [selectedRange, setSelectedRange] = useState<string>('D');

    const handleClick = (range: string) => {
        setSelectedRange(range);
    };

    const getLabel = (range: string) => {
        if (selectedRange === range) {
            return range === 'D' ? 'Day' : range === 'W' ? 'Week' : range === 'M' ? 'Month' : 'Year';
        }
        return range;
    };

    return (
        <div>
            <div className='justify-end w-full' style={{ display: 'flex', padding: '10px 0px'}}>
                {['D', 'W', 'M', 'Y'].map((range) => (
                    <button
                        key={range}
                        onClick={() => handleClick(range)}
                        style={{
                            padding: '5px',
                            backgroundColor: selectedRange === range ? 'yellow' : 'white',
                            border: '1px solid #ccc',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                        className='text-[8px]'
                    >
                        {getLabel(range)}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-[#E3EEF9]  p-[10px] rounded-lg text-center border border-zinc-300 flex flex-col items-start">
                    <h2 className="text-[17px] font-semibold">11,205</h2>
                    <p className="text-[12px] text-gray-600 capitalize">Total Orders</p>
                </div>
                <div className="bg-[#FDF8DC]  p-[10px] rounded-lg text-center border border-zinc-300 flex flex-col items-start">
                    <h2 className="text-[17px] font-semibold">220</h2>
                    <p className="text-[12px] text-gray-600 capitalize">Pending Order's</p>
                </div>
                <div className="bg-[#DCF0DF]  p-[10px] rounded-lg text-center border border-zinc-300 flex flex-col items-start">
                    <h2 className="text-[17px] font-semibold">20</h2>
                    <p className="text-[12px] text-gray-600 capitalize">Amount earned</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardStatistic