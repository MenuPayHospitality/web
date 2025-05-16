"use client"
import React, { useState } from 'react'
import EngagementBar from '../../EngagementBar'
import { ClickedKitchenFoodProps } from '@/types/Kitchen'
import ClickedFoodInfo from './ClickedFoodInfo'
import ClickedFoodImage from './ClickedFoodImage'
import EditFoodItem from './EditFoodItem'

const ClickedKitchenFood = ({
  name,
  description,
  price,
  currency,
  rating,
  likes,
  comments,
  image,
  // tags,
  isFavorite,
  isSaved,
  onClickedKitchenFood
}: ClickedKitchenFoodProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Define the type for the updated food data
  type FoodItemType = {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
  };

  const handleSave = (updatedFood: FoodItemType) => {
    // Here you would typically update the food data in your state or send to API
    console.log('Updated food:', updatedFood);
    setIsEditing(false);
    // Update local state or call a function to update data in parent component
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditFoodItem
        food={{
          name,
          description,
          price,
          category: 'Pasta', // Assuming first tag is category
          image,
          available: true // Default to true if not provided
        }}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className='fixed top-0 bg-red-400 w-full h-[90%] z-50'>
      <div className="flex flex-col bg-white overflow-hidden max-w-md h-full mx-auto">
        {/* <KitchenClickedFoodHeader 
          onClickedKitchenFood={onClickedKitchenFood}
          onEdit={handleEdit}
        /> */}
        <ClickedFoodImage image={image} />
        <EngagementBar
          likes={likes}
          comments={comments}
          isFavorite={isFavorite}
          isSaved={isSaved}
        />
        <ClickedFoodInfo
          name={name}
          description={description}
          price={price}
          currency={currency}
          // tags={tags}
        />
      </div>
    </div>
  )
} 

export default ClickedKitchenFood