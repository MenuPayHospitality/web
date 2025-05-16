"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFormData, passwordSchema } from "@/types/account";

const SetupPassword: React.FC<{ onBack: () => void, onComplete: (data: PasswordFormData) => void }> = ({ onBack, onComplete }) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: PasswordFormData) => {
    onComplete(data);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Setup your password</h1>
        <p className="text-sm text-gray-600">Create a password to secure your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span className="text-gray-500">👁️</span>
              ) : (
                <span className="text-gray-500">👁️‍🗨️</span>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("confirmPassword")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <span className="text-gray-500">👁️</span>
              ) : (
                <span className="text-gray-500">👁️‍🗨️</span>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <p className="text-sm text-gray-600">Must be at least 8 characters</p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full max-w-md bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
        >
          Create Account
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SetupPassword;