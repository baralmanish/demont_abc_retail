import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { BadgeVariant } from '@/types';
import { ORDER_STATUS, PAYMENT_STATUS } from './enums';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getOrderStatusVariants(status: ORDER_STATUS) {
    let variant: BadgeVariant = 'default';
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

export function getPaymentStatusVariants(status: PAYMENT_STATUS) {
    let variant: BadgeVariant = 'default';
    switch (status) {
        case 'pending':
            variant = 'default';
            break;
        case 'paid':
            variant = 'success';
            break;
        case 'failed':
            variant = 'error';
            break;
    }

    return variant;
}
