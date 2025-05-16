export interface PaymentComponentProps {
    onClosePaymentModel: (show: boolean) => void;
    setShowCartModel: (show: boolean) => void;
    title: string,
    orderId: string,
    amount: number
}


export interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactNode;
}