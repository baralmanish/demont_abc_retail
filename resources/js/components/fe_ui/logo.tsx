import { Link } from '@inertiajs/react';

export function Logo() {
    return (
        <Link href={route('home')} className="navbar-brand font-bold">
            <span className="text-3xl text-green-600">ABC</span> <span className="text-3xl">Retail</span>
        </Link>
    );
}
