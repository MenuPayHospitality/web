"use client"
import React, { useEffect, useState } from 'react'
import KitchenFooter from './KitchenFooter';
import MenuHome from './menu/MenuHome';

const RestuarantKitchenHome = () => {
    const [activeTab, setActiveTab] = useState('menu');

    const handleActiveTab = (tab: string) => {
        localStorage.setItem("restuarant_kitchen_active_tab", tab)
        setActiveTab(tab)
    }

    // useEffect(() => {
    //     const currentTab = localStorage.getItem("restuarant_kitchen_active_tab")

    //     // if(currentTab){
    //     //     setActiveTab(currentTab)
    //     // }
    // }, [])

    return (
        <div>
            <div>
                {activeTab === "menu" ?
                    <MenuHome />
                    :
                    ""
                }

            </div>
            <KitchenFooter onActive={activeTab} setOnActive={handleActiveTab} />
        </div>
    )
}

export default RestuarantKitchenHome