"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingScreen1 from "../components/onboarding/OnboardingScreen1";
import OnboardingScreen2 from "../components/onboarding/OnboardingScreen2";
import OnboardingScreen3 from "../components/onboarding/OnboardingScreen3";
import OnboardingScreen4 from "../components/onboarding/OnboardingScreen4";
import OnboardingScreen5 from "../components/onboarding/OnboardingScreen5";

const Onboarding: React.FC = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(1);

  const handleSkip = () => {
    router.push("/create-account");
  };

  const handleContinue = () => {
    if (currentScreen < 5) setCurrentScreen(currentScreen + 1);
    else router.push("/create-account");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <OnboardingScreen1 onContinue={handleContinue} onSkip={handleSkip} />;
      case 2:
        return <OnboardingScreen2 onContinue={handleContinue} onSkip={handleSkip} />;
      case 3:
        return <OnboardingScreen3 onContinue={handleContinue} onSkip={handleSkip} />;
      case 4:
        return <OnboardingScreen4 onContinue={handleContinue} onSkip={handleSkip} />;
      case 5:
        return <OnboardingScreen5 onContinue={handleContinue} onSkip={handleSkip} />;
      default:
        return <OnboardingScreen1 onContinue={handleContinue} onSkip={handleSkip} />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default Onboarding;