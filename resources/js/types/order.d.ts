import { OrderStatus } from '@/utils/enums';

export interface Order {
    id: number;
    order_date: string;
    user_id: number;
    ordered_by: string;
    quantity: number;
    total_price: string;
    status: OrderStatus;
}
