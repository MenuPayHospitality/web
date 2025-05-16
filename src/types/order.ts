export interface Order {
    id: string;
    table: string;
    time: string;
    status: string;
    items: { name: string; quantity: string }[];
    total: string;
    date: string;
    isExpanded: boolean;
}

export interface OrderItem {
    name: string;
    quantity: string;
  }
  

export interface OrdersProps {
    orders: Order[],
    toggleOrder: (id: string) => void
    activeTab:  "activity" | "history"
    setActiveTab: (orderType: "activity" | "history") => void
}

