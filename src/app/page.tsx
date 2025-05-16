"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "./components/onboarding/SplashScreen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
    const isLoggedIn = localStorage.getItem("isNewUser"); // Replace with actual auth check if using backend

    if (!hasCompletedOnboarding) {
      router.push("/onboarding");
    } else if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/create-account");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SplashScreen />
    </div>
  );
}