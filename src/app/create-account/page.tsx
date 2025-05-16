"use client";
import React from "react";
import CreateAccount from "../components/account/CreateAccount";

const AccountCreation: React.FC = () => {

  return (
    <div className="flex flex-col h-screen bg-yellow-200 p-4">
     <CreateAccount />
    </div>
  );
};

export default AccountCreation;