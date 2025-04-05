import { Link, usePage } from '@inertiajs/react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Logo } from '@/components/fe_ui/logo';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';

const expand = 'lg';

export default function AppHeader() {
    const { auth, cartItems, url } = usePage<SharedData>().props;

    const [y, setY] = useState(window.scrollY);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 200);

        const handleScroll = () => setY(window.scrollY);

        window.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const renderNavbarMenu = () => {
        return (
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="start">
                {!loading && (
                    <Offcanvas.Header closeButton>
                        <Logo />
                    </Offcanvas.Header>
                )}

                <Offcanvas.Body className="pt-0">
                    <Nav className="justify-content-end flex-grow-1 gap-0.5 pe-3 text-lg font-medium">
                        <Link href={route('home')} className={cn('nav-link', url === route('home') && 'active')}>
                            Home
                        </Link>
                        <Link href={route('about')} className={cn('nav-link', url === route('about') && 'active')}>
                            About
                        </Link>
                        <Link href={route('products')} className={cn('nav-link', url.includes('/products') && 'active')}>
                            Products
                        </Link>
                        <Link href={route('contact')} className={cn('nav-link', url === route('contact') && 'active')}>
                            Contact
                        </Link>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        );
    };

    const renderNavbarIcons = () => {
        const cartCount = cartItems?.length || 0;

        return (
            <div className="flex items-center space-x-4">
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                <Search className="hidden h-6 w-6 cursor-pointer text-gray-600 hover:text-green-600" />

                {/* User Account */}
                <Link href={auth.user ? route('dashboard') : route('login')} title={auth.user ? 'My Account' : 'Login'}>
                    <User className="h-6 w-6 cursor-pointer text-gray-600 hover:text-green-600" />
                </Link>

                {/* Cart Icon with Badge */}
                <Link href="/cart" className="relative">
                    <ShoppingBag className="h-6 w-6 cursor-pointer text-gray-600 hover:text-green-600" />
                    {cartCount ? (
                        <span className="absolute -top-2 -right-2 rounded-full bg-orange-500 px-2 text-xs font-bold text-white">{cartCount}</span>
                    ) : null}
                </Link>
            </div>
        );
    };

    return (
        <Navbar collapseOnSelect key={expand} expand={expand} sticky="top" className={cn('bg-white', y > 100 && 'shadow')}>
            <Container className="my-2.5">
                <Logo />
                {renderNavbarMenu()}
                {renderNavbarIcons()}
            </Container>
        </Navbar>
    );
}
