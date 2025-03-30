import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Testimonials',
        href: '/dashboard/testimonials',
    },
];

export default function Testimonials() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Testimonials" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Testimonials</div>
        </AppLayout>
    );
}
