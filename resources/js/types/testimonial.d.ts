export interface Testimonial {
    id: number;
    name: string;
    image: string;
    review: string;
    rating: number;
    order: number;
    status: 'active' | 'inactive';
}

export interface TestimonialForm {
    name: string;
    image: File | null;
    review: string;
    rating: number;
    order: number;
    status: 'active' | 'inactive';
}
