import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { EditFoodItemProps } from '@/types/Kitchen';

const EditFoodItem = ({ 
  food = {
    name: "Mexican Spaghetti Bolognese",
    description: "Stir fried pasta & egg sauce garnished with mint leaf, minced beef and carrot.",
    price: 15000,
    category: "Pasta",
    image: "/spaghetti.jpg", // Placeholder image path
    available: true
  },
  onSave,
  onCancel
}: EditFoodItemProps) => {
  const [formData, setFormData] = useState({
    name: food.name,
    description: food.description,
    price: food.price,
    category: food.category,
    available: food.available
  });
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // const handleSave = () => {
  //   if (onSave) onSave(formData);
  // };
  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 overflow-auto">
      <div className="flex flex-col max-w-md mx-auto h-full">
        {/* Header */}
        <div className="flex items-center p-4 border-b sticky z-50 top-0 w-full bg-white">
          <button 
            onClick={onCancel}
            className="flex items-center text-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-1 text-lg font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold mx-auto pr-10">Edit item</h1>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-video mt-4 bg-gray-100">
          {food.image && (
            <div className="relative w-full h-48">
              <Image
                src={food.image}
                alt="Food preview"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-3 opacity-80">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="p-4 flex-1">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Category<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg bg-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{formData.category}</span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              {dropdownOpen && (
                <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 z-10">
                  {["Pasta", "Pizza", "Burgers", "Desserts", "Drinks"].map((category) => (
                    <div
                      key={category}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFormData({ ...formData, category });
                        setDropdownOpen(false);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Price<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="bg-gray-100 p-3 border border-gray-300 rounded-l-lg">
                ₦
              </div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 rounded-r-lg"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description (optional)<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            />
          </div>

          <div className="mb-4 bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Availability Status</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        {/* <div className="p-4 mt-auto">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium mb-4"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 text-gray-700 font-medium"
          >
            Cancel
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default EditFoodItem;