import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

import { Category } from '@/types/category';
import { ISocialLinks } from '@/types/socialLinks';
import { Testimonial } from '@/types/testimonial';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedDataMeta {
    title: string;
    description: string;
    keywords: string;
}

export interface SharedData {
    name: string;
    meta: SharedDataMeta;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    url: string;
    site: {
        socialLink: ISocialLinks;
        categories: Category[];
        testimonials: Testimonial[];
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'error' | 'info';
