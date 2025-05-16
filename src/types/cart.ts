export interface CartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }

  export interface CartItemProps extends CartItem {
    updateQuantity: (id: string, increment: number) => void;
    removeItem: (id: string) => void;
    formatPrice: (price: number) => string;
  }

  // export interface CartItemProps {
  //   id: string
  //   name: string;
  //   description: string;
  //   price: number;
  //   quantity: number;
  //   image: string;
  //   onIncrement: () => void;
  //   onDecrement: () => void;
  //   onRemove: () => void;
  // }