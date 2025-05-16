import { Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CartItemProps } from "@/types/cart";

const CartItem: React.FC<CartItemProps> = ({
    id,
    image,
    name,
    description,
    price,
    quantity,
    updateQuantity,
    removeItem,
    formatPrice,
}) => {
    return (
        <div
            className={`flex items-center p-4 mb-3 mx-4 bg-white rounded-lg ${id === "2" ? "relative overflow-hidden" : ""
                }`}
        >
            {/* Food image */}
            <div className="w-16 h-16 overflow-hidden rounded-lg mr-3">
                <Image
                    width={100}
                    height={100}
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Food details */}
            <div className="flex-1">
                <h3 className="font-medium text-gray-800">{name}</h3>
                <p className="text-xs text-gray-500">{description}</p>
                <p className="font-medium text-gray-800 mt-1">{formatPrice(price)}</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center space-x-3">
                <button
                    onClick={() => updateQuantity(id, -1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
                    aria-label={`Decrease quantity of ${name}`}
                >
                    <Minus className="w-4 h-4 text-gray-700" />
                </button>

                <span className="font-medium w-4 text-center">{quantity}</span>

                <button
                    onClick={() => updateQuantity(id, 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
                    aria-label={`Increase quantity of ${name}`}
                >
                    <Plus className="w-4 h-4 text-gray-700" />
                </button>

                {/* Delete button (only shown for the second item) */}
                {id === "2" && (
                    <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center bg-red-100">
                        <Trash2
                            className="w-6 h-6 text-red-500 cursor-pointer"
                            onClick={() => removeItem(id)}
                            aria-label={`Remove ${name} from cart`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartItem;