"use client"
import { Heart, MessageSquare, ShoppingCart, Play } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderFoodItem from "../items/HeaderFoodItem";
import DisplayFoodItems from "../items/DisplayFoodItems";
import FoodCarts from "../cartItems/FoodCarts";
import { Category } from "@/types/restaurant";
import axios from "axios";
import { useParams } from "next/navigation";

interface FoodCategory {
    id: string;
    name: string;
    imageUrl: string;
}

interface FeaturedItem {
    id: string;
    title: string;
    price: string;
    rating: number;
    likes: number;
    comments: number;
    imageUrl: string;
}

export default function WelcomeScreen() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showCart, setShowCart] = useState(false)
    const [categories, setCategories] = useState<Category[]>([]);

    const param = useParams();
 console.log("Isss: ", param)

    const handleShowCart = () => {
        localStorage.setItem("show_cart", "true")
        setShowCart(true)
    }

    useEffect(() => {
        localStorage.setItem("restaurant_unique", JSON.stringify({
            id: param.restuarantid,
            name: "testinh"
        }));
    }, [param])

    useEffect(() => {
        const fetchCategories = async () => {
            const api_url = process.env.NEXT_PUBLIC_API_URL;

            const storedData = localStorage.getItem("restaurant_unique");
            if (!storedData) {
                console.error("No restaurant data found in localStorage");
                return;
            }

            const restaurantInfo = JSON.parse(storedData);
            console.log("Restaurant ID:", restaurantInfo.id);

            try {
                const response = await axios.get(`${api_url}/menu-items/restaurant/${restaurantInfo.id}/categories`);
                console.log("Response data: ", response.data);
                if (response.data && Array.isArray(response.data)) {

                    const mappedCategories = response.data.map((item: any) => ({
                        id: item.id || item.categoryId,
                        name: item.name || item.category || "Unnamed Category",
                        imageUrl: item.imageUrl || undefined,
                    }));
                    setCategories(mappedCategories);
                } else {
                    console.error("No categories found in response");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            <div className="flex flex-col h-full bg-white">
                {/* Header */}
                <div className=" sticky top-0 w-full z-40 bg-white">
                    <div className="px-3 py-2 flex justify-between items-center bg-white">
                        <div className="flex-1 pr-3">
                            <p className="text-lg font-bold">Welcome!</p>
                            <input
                                className="w-full p-1 outline-none bg-gray-100"
                                placeholder="What would you like to eat?"
                            />
                        </div>
                        <button className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer" onClick={handleShowCart}>
                            <ShoppingCart size={20} />
                        </button>
                    </div>

                    <div className="flex space-x-2 px-4 py-2 overflow-x-auto">
                        {categories.map((category) => (
                            <HeaderFoodItem key={category.id} category={category} />
                        ))}
                    </div>
                </div>
                <DisplayFoodItems />
            </div>
            {showCart && (<FoodCarts setShowCart={setShowCart} />)}
        </>
    );
}