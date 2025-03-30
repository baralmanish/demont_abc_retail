import { Link, usePage } from '@inertiajs/react';
import { FacebookIcon, Layers2, LayoutGrid, MessageCircleCode, PackageSearch, ShoppingBasket, Vote } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem, SharedData } from '@/types';

import AppLogo from './app-logo';

export function AppSidebar() {
    const pageProps = usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    if (pageProps.auth.user.role === 'ADMIN') {
        const adminNavItems: NavItem[] = [
            {
                title: 'Categories',
                href: '/dashboard/categories',
                icon: Layers2,
            },
            {
                title: 'Products',
                href: '/dashboard/products',
                icon: PackageSearch,
            },
            {
                title: 'Orders',
                href: '/dashboard/orders',
                icon: ShoppingBasket,
            },
            {
                title: 'Testimonials',
                href: '/dashboard/testimonials',
                icon: MessageCircleCode,
            },
            {
                title: 'Seo',
                href: '/dashboard/seo',
                icon: Vote,
            },
            {
                title: 'Social Links',
                href: '/dashboard/social-links',
                icon: FacebookIcon,
            },
        ];
        mainNavItems.push(...adminNavItems);
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
