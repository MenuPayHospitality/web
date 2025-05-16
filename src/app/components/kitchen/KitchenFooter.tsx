import { KitchenFooterProps } from '@/types/Kitchen'
import { Archive, Clipboard, Home, Menu } from 'lucide-react'
import React from 'react'

const KitchenFooter: React.FC<KitchenFooterProps> = ({
    onActive,
    setOnActive
}) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-between bg-white border-t border-gray-200 p-2 max-w-md mx-auto">
            {[
                { id: 'home', icon: <Home size={20} />, label: 'Home' },
                { id: 'menu', icon: <Menu size={20} />, label: 'Menu' },
                { id: 'orders', icon: <Clipboard size={20} />, label: 'Orders' },
                { id: 'inventory', icon: <Archive size={20} />, label: 'Inventory' }
            ].map(item => (
                <button
                    key={item.id}
                    className={`flex flex-col items-center p-2 ${onActive === item.id ? 'text-black' : 'text-gray-400'
                        }`}
                    onClick={() => setOnActive(item.id)}
                >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                </button>
            ))}
        </div>
    )
}

export default KitchenFooter