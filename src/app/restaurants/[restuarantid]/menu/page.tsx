"use client"
import WelcomeScreen from "@/app/components/kitchen/WelcomeScreen";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const RestuarantMenu: React.FC = () => {

  useEffect(() => {
    const getOrUniqueIdentifier = localStorage.getItem("customer-unique-id")
    if(!getOrUniqueIdentifier){
      const unique_identifier = uuidv4()
      localStorage.setItem("customer-unique-id", unique_identifier)
    }
  },[])

  return (
    <div>
      <WelcomeScreen />
    </div>
  );                                
};

export default RestuarantMenu;