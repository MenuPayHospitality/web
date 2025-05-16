"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, Trash2, Minus, Plus } from "lucide-react";
import axios from "axios";
import CartItem from "./CartItem";
import PaymentComponent from "../payment/PaymentComponent";
import { useSolanaWallets } from "@privy-io/react-auth/solana";
import { usePrivy } from "@privy-io/react-auth";
import Loader from "../Loader";

interface CartItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface FoodCartsProps {
  setShowCart: (show: boolean) => void;
}

const FoodCarts: React.FC<FoodCartsProps> = ({ setShowCart }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [tipPercentage, setTipPercentage] = useState<number>(10);
  const [customTip, setCustomTip] = useState<number | null>(null);
  const [showTipSlide, setShowTipSlide] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const { user } = usePrivy()

  const restaurantId = JSON.parse(localStorage.getItem("restaurant_unique") || "{}").id;

  useEffect(() => {
    const loadCartItems = () => {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };
    loadCartItems();
  }, []);

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.075;
  const tipAmount = customTip || (subtotal * tipPercentage) / 100;
  const total = subtotal + vat + tipAmount;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleTipSelection = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTip(null);
    setShowTipSlide(false);
  };

  const handleCustomTip = (amount: number) => {
    setCustomTip(amount);
    setTipPercentage(0);
    setShowTipSlide(false);
  };

  const submitOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    try {
      setIsLoading(true)
      const uniqueId = localStorage.getItem("customer-unique-id")

      const userIdentifier = user?.google?.email ? user?.google?.email : uniqueId;
      const api_url = process.env.NEXT_PUBLIC_API_URL;

      const orderData = {
        restaurantId,
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
        totalPrice: total,
        tipAmount,
        customerIdentifier: userIdentifier,
      }

      const response = await axios.post(`${api_url}/orders`, orderData, {
        headers: { "x-user-identifier": userIdentifier },
      });

      setOrderId(response.data.id);
      setWalletAddress("7u5mMx6fzDzmByfiRSDagfcX85JPmCrcU8VdprZNqC4b")
      // setWalletAddress(response.data.walletAddress)
      setShowPayment(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false)
    }
  };

  console.log("Account: ", walletAddress)

  const handlePaymentSuccess = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    setShowPayment(false);
    setShowCart(false);
    setIsOrderPlaced(true)
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-white">
      {isLoading ? (
        <Loader />
      ) : (

        <div className="relative z-40 w-full max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="p-4 bg-white">
            <div className="flex items-center mb-2">
              <button
                onClick={() => setShowCart(false)}
                className="flex items-center text-gray-800 font-medium"
                aria-label="Go back"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Your Food Cart</h1>
            {/* <p className="text-sm text-gray-500">Table #{tableId} • Ref #{referenceId}</p> */}
          </div>

          {/* Swipe to remove hint */}
          <div className="bg-amber-50 mx-4 my-2 p-2 rounded-md flex items-center text-sm text-amber-800">
            <span className="ml-1">← Swipe left to remove item</span>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto px-4">
            {cartItems.length === 0 ? (
              <p className="py-8 text-center text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  quantity={item.quantity}
                  updateQuantity={handleQuantityChange}
                  removeItem={handleRemoveItem}
                  formatPrice={formatPrice}
                />
              ))
            )}
          </div>

          {/* Tip Slide (Bottom Sheet) */}
          {showTipSlide && (
            <div className="fixed inset-x-0 bottom-0 bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-amber-700 p-4 rounded-t-lg text-white">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">Tip your server</h2>
                  <button onClick={() => setShowTipSlide(false)} className="text-white">
                    ✕
                  </button>
                </div>
                <p className="text-sm mb-4">Your server today was Michael.</p>
                <div className="flex justify-around mb-4">
                  {[0, 5, 10, 15, 20, 25].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => handleTipSelection(percent)}
                      className={`px-4 py-2 rounded-lg ${tipPercentage === percent && !customTip ? "bg-yellow-400 text-black" : "bg-gray-200 text-black"
                        }`}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="customTip"
                    onChange={(e) => e.target.checked && setCustomTip(0)}
                    className="mr-2"
                  />
                  <label htmlFor="customTip" className="text-sm">
                    Enter custom tip amount
                  </label>
                </div>
                {customTip !== null && (
                  <div className="mb-4">
                    <input
                      type="number"
                      value={customTip || ""}
                      onChange={(e) => handleCustomTip(Number(e.target.value))}
                      placeholder="Custom Tip (₦)"
                      className="w-full p-2 border rounded-lg text-black"
                    />
                  </div>
                )}
                <p className="text-right text-sm">
                  Tip amount: ₦{(customTip || (subtotal * tipPercentage) / 100).toFixed(2)} ({tipPercentage || "custom"}%)
                </p>
              </div>
            </div>
          )}
          {showPayment && (
            <PaymentComponent
              onClosePaymentModel={setShowPayment}
              restaurantAddress={walletAddress}
              title="Food Order Payment"
              amount={total}
              orderId={orderId!}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {/* Footer - Summary and Order button */}
          {cartItems.length > 0 && !showTipSlide && !showPayment && (
            <div className="mt-auto">
              <div className="bg-gray-200 p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-800 font-medium">Subtotal</span>
                  <span className="text-gray-800 font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-800 font-medium">VAT (7.5%)</span>
                  <span className="text-gray-800 font-medium">{formatPrice(vat)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">Tip</span>
                  <span className="text-gray-800 font-medium">{formatPrice(tipAmount)}</span>
                </div>
              </div>
              <div className="bg-amber-50 p-4 flex items-center justify-between" onClick={() => setShowTipSlide(true)}>
                <div>
                  <p className="text-gray-800 font-medium">Tip your server</p>
                  <p className="text-xs text-gray-600">Your server today was Michael.</p>
                </div>
                <ChevronRight size={20} className="text-gray-600" />
              </div>
              <div className="bg-gray-900 p-4 flex justify-between items-center">
                <span className="text-white font-bold">Total</span>
                <span className="text-amber-400 font-bold text-xl">{formatPrice(total)}</span>
              </div>
              <button
                onClick={submitOrder}
                className="bg-amber-400 w-full p-4 text-center font-bold text-gray-900"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodCarts;