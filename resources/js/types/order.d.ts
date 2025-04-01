import { ORDER_STATUS } from '@/utils/enums';
import { Product } from './product';

export interface Order {
    id: number;
    order_date: string;
    user_id: number;
    ordered_by: string;
    quantity: number;
    total_price: string;
    status: ORDER_STATUS;
    payment: Payment | null;
}

export interface OrderDetails extends Order {
    order_items: OrderItems[];
}

export interface OrderItems {
    id: number;
    order_id: number;
    product_id: number;
    price: string;
    price_formatted: string;
    quantity: number;
    product: Product;
}

export interface Payment {
    id: number;
    order_id: number;
    amount: string;
    payment_status: 'pending' | 'paid' | 'failed';
    payment_method: 'cash' | 'card';
}
