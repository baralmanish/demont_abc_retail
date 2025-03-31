import { Head, usePage } from '@inertiajs/react';
import { Eye, Layers2, PackageSearch, ShoppingBasket } from 'lucide-react';

import { CardStats } from '@/components/card-stats';
import AppLayout from '@/layouts/app-layout';

import { Badge } from '@/components/ui/badge';
import { getOrderStatusVariants } from '@/lib/utils';
import { BreadcrumbItem, SharedData } from '@/types';
import { Order } from '@/types/order';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface InertiaPage extends SharedData {
    totalCategories: number;
    totalProducts: number;
    totalOrder: number;
    orders: Order[];
}

export default function Dashboard() {
    const { totalCategories, totalProducts, totalOrder, orders } = usePage<InertiaPage>().props;

    const renderStats = () => {
        return (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <CardStats item={{ title: 'Categories', count: totalCategories, icon: Layers2 }} />
                <CardStats item={{ title: 'Products', count: totalProducts, icon: PackageSearch }} />
                <CardStats item={{ title: 'Orders', count: totalOrder, icon: ShoppingBasket }} />
            </div>
        );
    };

    const renderTableRow = (row: Order) => {
        return (
            <tr key={row.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <td className="px-6 py-3">{row.order_date}</td>
                <td className="px-6 py-3">{row.ordered_by}</td>
                <td className="px-6 py-3 text-right">{row.quantity}</td>
                <td className="px-6 py-3 text-right">{row.total_price}</td>
                <td className="px-6 py-3">
                    <Badge variant={getOrderStatusVariants(row.status)}>{row.status}</Badge>
                </td>
                <td className="px-6 py-3 text-center">
                    <Eye className="h-4 w-4 cursor-pointer opacity-45 hover:opacity-75" />
                </td>
            </tr>
        );
    };

    const renderTable = () => {
        return (
            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ordered Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ordered By
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody>{orders.map(renderTableRow)}</tbody>
                </table>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {renderStats()}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    {renderTable()}
                </div>
            </div>
        </AppLayout>
    );
}
