// components/FoodCategory.tsx
import Image from "next/image";
import React from "react";

interface FoodCategoryProps {
  label: string;
  icon: string; 
  isActive?: boolean;
  onClick: () => void;
}

const FoodCategory: React.FC<FoodCategoryProps> = ({
  label,
  icon,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-full ${
        isActive ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      <Image src={icon} alt={label} className="w-8 h-8 rounded-full" width={300} height={300} />
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default FoodCategory;