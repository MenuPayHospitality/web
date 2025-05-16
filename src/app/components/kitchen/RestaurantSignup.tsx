import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

const RestaurantSignup = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleNext = () => {
    // Handle next step logic here
    console.log("Restaurant details:", {
      restaurantName,
      email,
      location,
      description,
      logo
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-yellow-200 min-h-screen">
      <div className="w-full px-6 py-8">
        {/* Progress bar */}
        <div className="h-1 w-full mb-8 flex">
          <div className="bg-gray-800 h-full w-1/2"></div>
          <div className="bg-gray-200 h-full w-1/2"></div>
        </div>

        <h1 className="text-2xl font-bold mb-1">Create Your Account</h1>
        <p className="text-gray-600 mb-8">Register to get started</p>

        {/* Logo Upload */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
            {logo ? (
              <Image
              width={300}
                height={300} 
                src="/api/placeholder/80/80" 
                alt="Restaurant logo preview" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <ImageIcon size={24} className="text-gray-400" />
            )}
          </div>
          <label htmlFor="logo-upload" className="text-black cursor-pointer">
            Upload logo
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </label>
        </div>

        {/* Restaurant Name */}
        <div className="mb-4">
          <label htmlFor="restaurant-name" className="block text-sm font-medium mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurant-name"
            className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full border border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition-colors mb-4"
        >
          Next
        </button>

        <div className="text-center mt-2">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-black font-medium">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSignup;