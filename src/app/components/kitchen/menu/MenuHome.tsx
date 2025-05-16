"use client"
import { Bell } from 'lucide-react';
import React, { useState } from 'react'
import KitchenFood from './KitchenFood';
import ClickedKitchenFood from './ClickedKitchenFood';

const MenuHome = () => {
  const [activeCategory, setActiveCategory] = useState('Rice');
  const [clickedFood, setClickedFood] = useState(false)
  const [clickeditem, setClickedItem] = useState([])

  const categories = ['Rice', 'Pasta', 'Soups', 'Drinks', 'Snack', 'Meat'];

  const [foodItems, setFoodItems] = useState([
    {
      id: '1',
      name: 'Ofada Rice',
      price: 7800,
      isAvailable: true,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    },
    {
      id: '2',
      name: 'Jollof Rice',
      price: 6500,
      isAvailable: true,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    },
    {
      id: '3',
      name: 'Fried Rice',
      price: 6000,
      isAvailable: false,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    },
    {
      id: '4',
      name: 'White Rice',
      price: 5200,
      isAvailable: true,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    },
    {
      id: '5',
      name: 'Coconut Rice',
      price: 8500,
      isAvailable: false,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    },
    {
      id: '6',
      name: 'Basmati Rice',
      price: 7200,
      isAvailable: true,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    },
    {
      id: '7',
      name: 'White Rice & Sauce',
      price: 8500,
      isAvailable: false,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    },
    {
      id: '8',
      name: 'Native Rice',
      price: 2500,
      isAvailable: true,
      image: 'https://i.ibb.co/Sw72XZ8/placeholder.jpg'
    }
  ]);

  const handleToggleAvailability = (id: string) => {
    setFoodItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleClickedFood = (item: any) => {
    setClickedFood(true)
    setClickedItem(item)
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 h-screen flex flex-col">
      <div className='h-full'>
        <div className='sticky top-0 bg-white w-full z-40'>
          {/* Header */}
          <div className="flex justify-between items-center p-3 py-2 bg-white">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-white text-lg">🍚</span>
            </div>
            <button className="p-2">
              <Bell className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Category Navigation */}
          <div className="flex space-x-2 p-2 overflow-x-auto bg-white">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`p-1 px-3 rounded-full text-sm font-medium cursor-pointer ${activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Food List */}
        <div className="flex-1 overflow-y-auto pb-16 bg-white mt-2">
          {foodItems.map(item => (
            <div key={item.id} onClick={() => handleClickedFood(item)}>
              <KitchenFood
                item={item}
                handleToggleAvailability={handleToggleAvailability}
              />
            </div>
          ))}
        </div>
      </div>

      {clickedFood && (
        <ClickedKitchenFood
        id=""
          name="nsnsss sj js"
          description={"sjsjsjs"}
          price={2000}
          currency={""}
          rating={3}
          likes={12}
          comments={3}
          image="/assest/header1.png"
          // tags={["ndd"]}
          isFavorite={true}
          isSaved={false}
          onClickedKitchenFood={handleClickedFood}
        />
      )}
    </div>
  )
}


export default MenuHome