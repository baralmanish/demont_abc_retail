import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { OrderStatus } from './enums';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getOrderStatusVariants(status: OrderStatus) {
    let variant: 'default' | 'secondary' | 'success' | 'error' | 'info' = 'default';
    switch (status) {
        case 'pending':
            variant = 'default';
            break;
        case 'processing':
            variant = 'info';
            break;
        case 'completed':
            variant = 'success';
            break;
        case 'cancelled':
            variant = 'error';
            break;
    }

    return variant;
}
