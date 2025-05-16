export interface KitchenFooterProps {
    setOnActive: (tab: string) => void
    onActive: string
}

export interface KitchenFoodProps {
    item: any,
    handleToggleAvailability: (item: string) => void,
}

export interface ClickedKitchenFoodProps {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    rating: number;
    likes: number;
    comments: number;
    image: string;
    // tags: string[];
    isFavorite?: boolean;
    isSaved?: boolean;
    onClickedKitchenFood: (clicked: any) => void
}

export type FoodItemType = {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
};

export type EditFoodItemProps = {
    food?: FoodItemType;
    onSave: (food: FoodItemType) => void;
    onCancel: () => void;
};