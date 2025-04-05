import { Head, Link, usePage } from '@inertiajs/react';
import { BadgeAlert, Eye, Layers2, PackageSearch, ShoppingBasket } from 'lucide-react';

import { CardStats } from '@/components/card-stats';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

import { PAYMENT_STATUS } from '@/lib/enums';
import { getOrderStatusVariants, getPaymentStatusVariants } from '@/lib/utils';
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

    console.log('orders', orders);

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
                    <Badge variant={getOrderStatusVariants(row.status)} className="uppercase">
                        {row.status}
                    </Badge>
                </td>
                <td className="px-6 py-3">
                    {row.payment && (
                        <Badge variant={getPaymentStatusVariants(row.payment.payment_status as PAYMENT_STATUS)} className="uppercase">
                            {row.payment.payment_status}
                        </Badge>
                    )}
                </td>
                <td className="px-6 py-3 text-center">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <Link href={route('dashboard.order', { id: row.id })}>
                            <Eye className="h-4 w-4 cursor-pointer opacity-45 hover:opacity-75" />
                        </Link>
                    </div>
                </td>
            </tr>
        );
    };

    const renderNoData = () => {
        return (
            <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <td colSpan={6} className="px-6 py-8">
                    <div className="flex flex-col items-center gap-2 opacity-60">
                        <BadgeAlert className="h-12 w-12" />
                        <span>No Order Found</span>
                    </div>
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
                            <th scope="col" className="w-48 px-6 py-3">
                                Ordered Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ordered By
                            </th>
                            <th scope="col" className="w-20 px-6 py-3 text-right">
                                Qty
                            </th>
                            <th scope="col" className="w-40 px-6 py-3 text-right">
                                Price
                            </th>
                            <th scope="col" className="w-30 px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="w-30 px-6 py-3">
                                Payment
                            </th>
                            <th scope="col" className="w-24 px-6 py-3 text-center">
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody>{orders.length ? orders.map(renderTableRow) : renderNoData()}</tbody>
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
