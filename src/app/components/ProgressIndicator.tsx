import React from "react";

const ProgressIndicator: React.FC<{ step: "creation" | "setup_password" }> = ({ step }) => {
    return (
        <div className="flex justify-center mb-4">
            <div className={`w-[200px] h-1 py-1 rounded-tl rounded-bl ${step === "creation" ? "bg-gradient-to-r from-black to-yellow-500" : "bg-black"}`}></div>
            <div className={`w-[200px] h-1 py-1 rounded-tr rounded-br ${step === "setup_password" ? "bg-gradient-to-r from-black to-yellow-500" : "bg-gray-300"}`}></div>
        </div>
    );
};

export default ProgressIndicator