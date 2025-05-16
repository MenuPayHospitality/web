"use client";
import Image from "next/image";
import React from "react";

interface OnboardingScreen5Props {
  onContinue: () => void;
  onSkip: () => void;
}

const OnboardingScreen5: React.FC<OnboardingScreen5Props> = ({ onContinue, onSkip }) => {
    return (
        <div className="">
            <Image
                src="/assest/onboarding5.png"
                alt="menupay-onboarding"
                width={400}
                height={400}
                className="w-full h-[450px]"
            />
            <div className="p-4 pt-8">
                <div className="text-center">
                    <h2 className="font-semibold text-[18px]">Bring Your Menu to Life</h2>
                    <p>Create engaging video menus and let customers order with ease. A better way to showcase your fresh and delicious meals.</p>
                </div>
                <div className="flex justify-center items-center py-8">
                    <button
                        onClick={onSkip}
                        className="text-gray-800 cursor-pointer font-semibold py-3 px-6"
                    >
                        Skip
                    </button>
                    <button
                        onClick={onContinue}
                        className="bg-yellow-400 cursor-pointer text-gray-800 font-semibold py-2 px-6 rounded-full"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen5;