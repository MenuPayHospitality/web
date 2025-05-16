import Image from 'next/image';
import React from 'react';

interface OrderItemProps {
  image: string;
  name: string;
  quantity: number;
  unit: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ image, name, quantity, unit }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden mr-3">
          <Image width={300}
                height={300} src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <span className="text-gray-600">
        {quantity} {unit}
      </span>
    </div>
  );
};

export default OrderItem;