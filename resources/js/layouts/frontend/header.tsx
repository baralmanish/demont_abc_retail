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
    const { auth } = usePage<SharedData>().props;
    const [y, setY] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => setY(window.scrollY);

        window.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar collapseOnSelect key={expand} expand={expand} sticky="top" className={cn('bg-white', y > 100 && 'shadow')}>
            <Container className="my-2.5">
                <Logo />
                <Navbar.Offcanvas
                    style={{ width: 300 }}
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Logo />
                    </Offcanvas.Header>
                    <Offcanvas.Body className="pt-0">
                        <Nav className="justify-content-end flex-grow-1 gap-0.5 pe-3 text-lg font-medium">
                            <Link href="#action1" className="nav-link">
                                Home
                            </Link>
                            <Link href="#action1" className="nav-link">
                                About
                            </Link>
                            <Link href="#action1" className="nav-link">
                                Products
                            </Link>
                            <Link href="#action1" className="nav-link">
                                Contact
                            </Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className="flex items-center space-x-4">
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

                    <Search className="h-6 w-6 cursor-pointer text-gray-600 hover:text-green-600" />

                    {/* User Account */}
                    <a target="_blank" href={auth.user ? route('dashboard') : route('login')} title={auth.user ? 'My Account' : 'Login'}>
                        <User className="h-6 w-6 cursor-pointer text-gray-600 hover:text-green-600" />
                    </a>

                    {/* Cart Icon with Badge */}
                    <Link href="/cart" className="relative">
                        <ShoppingBag className="h-6 w-6 cursor-pointer text-gray-600 hover:text-green-600" />
                        <span className="absolute -top-2 -right-2 rounded-full bg-orange-500 px-2 text-xs font-bold text-white">2</span>
                    </Link>
                </div>
            </Container>
        </Navbar>
    );
}
