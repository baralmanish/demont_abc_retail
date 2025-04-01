import { Head, router, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

import { PageHeader } from '@/components/page-header';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Order',
        href: '',
    },
];

export default function Orders() {
    const aa = usePage().props;

    console.log('>>> aa', aa);

    const renderOrderItems = () => {
        return (
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="w-12 px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name / Review
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order Detail" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PageHeader title="Order Detail" onBack={() => router.get(route('dashboard'))} />
                {renderOrderItems()}
                {renderOrderItems()}
            </div>
        </AppLayout>
    );
}
