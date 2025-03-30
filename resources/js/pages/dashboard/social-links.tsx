import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Social Links',
        href: '/dashboard/social-links',
    },
];

export default function SocialLinks() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Social Links" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Social Links</div>
        </AppLayout>
    );
}
