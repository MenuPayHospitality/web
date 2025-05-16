"use client";
import React from "react";
import LoginComponent from "../components/account/LoginAccount";

const Login: React.FC = () => {

  return (
    <div className="flex flex-col h-screen">
     <LoginComponent />
    </div>
  );
};

export default Login;