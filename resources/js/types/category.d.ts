export interface CategoryForm {
    name: string;
    description: string;
    image: File | null;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
}
