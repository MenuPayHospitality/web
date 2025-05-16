import React, { useState } from 'react'
import { Order } from '@/types/order';
import { rawOrders } from '../../../../utlis/raw';
import OrderList from '../order/OrderList';
import DashboardHeader from '../Headers/DashboardHeader';
import DashboardStatistic from './DashboardStatistic';
import { PlusSquareIcon } from "lucide-react"
import DashboardManagement from './DashboardManagement';

const MenuDashboard = () => {
    const [activeTab, setActiveTab] = useState<"activity" | "history">("activity");
    const [orders, setOrders] = useState<Order[]>(rawOrders);

    const toggleOrder = (id: string) => {
        setOrders(orders.map((order) =>
            order.id === id ? { ...order, isExpanded: !order.isExpanded } : order
        ));
    };

    return (
        <div className='h-screen w-full p-3'>
            <div className=' sticky top-0 w-full bg-white'>
                <DashboardHeader />
                <DashboardStatistic />
                <button className="w-full bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mb-4 flex items-center justify-center">

                    <PlusSquareIcon size={20} /><span className="text-xl pl-4"></span> Add Menu Item
                </button>
            </div>

            <DashboardManagement/>
        </div>
    )
}

export default MenuDashboard