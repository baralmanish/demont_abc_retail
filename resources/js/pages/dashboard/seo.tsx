import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Seo',
        href: '/dashboard/seo',
    },
];

export default function Seo() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Seo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Seo</div>
        </AppLayout>
    );
}
