import { Category } from "@/types/restaurant";
import Image from "next/image";
import React from "react";

interface HeaderFoodItemProps {
  category: Category;
}

const HeaderFoodItem: React.FC<HeaderFoodItemProps> = ({ category }) => {
  return (
    <div className="bg-[#F9E154] max-w-[70px] p-1 rounded-xl">
      <Image
        className="min-w-[50px] cursor-pointer rounded-xl"
        src={category.imageUrl || "/assest/header1.png"} // Fallback to hardcoded image if no imageUrl
        alt={category.name}
        width={100}
        height={100}
      />
      <h2 className="text-[12px] truncate pt-[1px] text-center font-semibold capitalize">
        {category.name}
      </h2>
    </div>
  );
};

export default HeaderFoodItem;