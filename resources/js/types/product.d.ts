import { Category } from './category';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    price_formatted: string;
    image: string;
    category_id: number;
    category: Category;
    status: 'active' | 'inactive';
}

export interface ProductForm {
    name: string;
    description: string;
    price: string;
    image: File | null;
    category_id: number | null;
    status: 'active' | 'inactive';
}
