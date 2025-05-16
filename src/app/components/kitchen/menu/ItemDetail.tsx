import React from 'react'

const ItemDetail: React.FC<{
    label: string;
    value: string;
    isStatus?: boolean;
}> = ({ label, value, isStatus = false }) => {

    return (
        <div>
            <span className="text-gray-500 text-sm">{label}</span>
            <p className={isStatus ? "text-green-500 font-medium" : "font-medium"}>{value}</p>
        </div>
    );
}

export default ItemDetail