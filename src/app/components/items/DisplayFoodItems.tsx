"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DisplayFoodItem from "./DisplayFoodItem";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const DisplayFoodItems = () => {
  const [foodItems, setFoodItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const api_url = process.env.NEXT_PUBLIC_API_URL;

      const storedData = localStorage.getItem("restaurant_unique");
      if (!storedData) {
        console.error("No restaurant data found in localStorage");
        return;
      }

      const restaurantInfo = JSON.parse(storedData);
      console.log("Restaurant ID:", restaurantInfo.id);

      try {
        const response = await axios.get(`${api_url}/menu-items/restaurant/${restaurantInfo.id}`);
        console.log("Response data: ", response.data);
        if (response.data && Array.isArray(response.data)) {
          setFoodItems(response.data);
        } else {
          console.error("No food items found in response");
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchItems();
  }, []);

  if (foodItems.length === 0) return <div>Loading...</div>;

  return (
    <div className="py-4">
      {foodItems.map((item) => (
        <DisplayFoodItem key={item.id} foodItem={item} />
      ))}
      
    </div>
  );
};

export default DisplayFoodItems;