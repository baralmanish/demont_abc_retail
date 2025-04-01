import { Link, usePage } from '@inertiajs/react';

import { SharedData } from '@/types';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';

export default function AppHeader() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="header-group">
            <header className="header header-main-area">
                <div className="header-area header-sticky">
                    <div className="container-fluid">
                        <div className="header-main">
                            <div className="logo header-element">
                                <Link href="" className="header-log">
                                    ABC Retail
                                </Link>
                            </div>
                            <div className="header-element main-menu-area">
                                <nav className="mainwrap">
                                    <ul className="list-unstyled main-menu">
                                        <li className="menu-link">
                                            <Link href="" className="link-title">
                                                Home
                                            </Link>
                                        </li>
                                        <li className="menu-link">
                                            <Link href="" className="link-title">
                                                About
                                            </Link>
                                        </li>
                                        <li className="menu-link">
                                            <Link href="" className="link-title">
                                                Products
                                            </Link>
                                        </li>
                                        <li className="menu-link">
                                            <Link href="" className="link-title">
                                                Contact
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="header-element right-block-box">
                                <ul className="shop-element">
                                    <li className="toggler-wrap">
                                        <Menu />
                                    </li>
                                    <li className="search-wrap search-wrap-mobile">
                                        <Search />
                                    </li>
                                    <li className="user-wrap ele-wrap">
                                        <Link href={route('login')}>
                                            <User />
                                        </Link>
                                    </li>
                                    <li className="user-wrap ele-wrap">
                                        <Link href="">
                                            <ShoppingBag />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
