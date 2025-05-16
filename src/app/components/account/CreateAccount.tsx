"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SetupPassword from "./SetupPassword";
import { useRouter } from "next/navigation";
import { CreateAccountFormData, createAccountSchema, PasswordFormData } from "@/types/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ProgressIndicator from "../ProgressIndicator";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { uploadBlobToCloudinary } from "../../../../utlis/uploader";
import { RestaurantData } from "@/types/restaurant";
import axios from "axios";

const CreateAccount: React.FC = () => {
  const router = useRouter();
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<"creation" | "setup_password">("creation");
  const [accountData, setAccountData] = useState<CreateAccountFormData | null>(null);
  const { authenticated, user } = usePrivy();
  const { wallets } = useSolanaWallets();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      restaurantName: "",
      email: "",
      location: "",
      description: "",
    },
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      const uploadedUrl = await uploadBlobToCloudinary(file, "image");
      setLogoUrl(uploadedUrl);
    }
  };

  const handleCreateAccountSubmit = (data: CreateAccountFormData) => {
    setAccountData(data);
    setCurrentScreen("setup_password");
  };

  const handlePasswordSetupComplete = async (passwordData: PasswordFormData) => {
    if (!accountData) return;
    const restaurantData: RestaurantData = {
      ...accountData,
      password: passwordData.password,
      logoUrl: logoUrl || "",
      name: accountData.restaurantName,
      description: accountData.description || "",
    };

    try {
      setIsLoading(true)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${user?.google?.email}`,
        'x-user-identifier': `${user?.google?.email}`,
      };

      const api_url = process.env.NEXT_PUBLIC_API_URL;
      const restaurantResponse = await axios.post(`${api_url}/restaurants`, {
        email: restaurantData.email,
        name: restaurantData.name,
        password: restaurantData.password,
        walletAddress: wallets[0]?.address,
        restaurantName: restaurantData.restaurantName,
        description: restaurantData.description,
        logoUrl: restaurantData.logoUrl,
        LoginEmail: user?.google?.email,
        role: "admin"
      }, { headers });

      await localStorage.setItem("restaurant_unique", JSON.stringify({
        id: restaurantResponse.data.id,
        name: restaurantResponse.data.restaurantName
      }));

      router.push(`/restaurants/${restaurantResponse.data.id}/menu/add`);
    } catch (error) {
      console.log("Error: ", error)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (!authenticated && !user) {
        await localStorage.setItem("current_page", "/create-account")
        router.push("/login")
      }
    }
    checkLogin()
  }, [authenticated, user, router])


  useEffect(() => {
    const createUser = async () => {
      if (authenticated && user) {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        await axios.post(`${api_url}/users`, {
          email: user.google?.email,
          walletAddress: wallets[0].address,
          role: "ADMIN"
        })
      }
    }
    createUser()
  }, [authenticated, user, wallets])

  return (
    <div className="flex flex-col h-screen bg-yellow-200 px-4 py-2">
      <ProgressIndicator step={currentScreen} />
      {isLoading ? (
        <div className="w-full h-full fixed top-0 left-0 bg-yellow-200 flex justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#BB8F54]"></div>
          </div>
        </div>
      ) : currentScreen === "creation" ? (
        <div>
          <div className="text-left mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-sm text-gray-600">Register to get started</p>
          </div>
          <form onSubmit={handleSubmit(handleCreateAccountSubmit)} className="items-center space-y-3">
            <div>
              <label htmlFor="logo-upload" className="rounded-md cursor-pointer">
                {logo ? (
                  <Image
                    src={URL.createObjectURL(logo)}
                    alt="Restaurant logo"
                    className="w-16 h-16 object-cover rounded-md"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-300 flex justify-center items-center">
                      <ImageIcon size={50} color="#474747" />
                    </div>
                    <span className="text-md text-zinc-700">Upload Logo</span>
                  </div>
                )}
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
              <input
                type="text"
                placeholder="Enter name"
                {...register("restaurantName")}
                className="w-full p-3 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.restaurantName && (
                <p className="text-red-500 text-sm mt-1">{errors.restaurantName.message}</p>
              )}
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email")}
                className="w-full p-3 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter address"
                {...register("location")}
                className="w-full p-3 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Enter description"
                {...register("description")}
                className="w-full p-3 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-md cursor-pointer bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
            >
              Next
            </button>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      ) : (
        <SetupPassword
          onBack={() => setCurrentScreen("creation")}
          onComplete={handlePasswordSetupComplete}
        />
      )}
    </div>
  );
};

export default CreateAccount;