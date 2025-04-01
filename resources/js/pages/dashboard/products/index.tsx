import { Head, Link, router, usePage } from '@inertiajs/react';
import { BadgeAlert, PencilIcon, PlusIcon, Trash2 } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';

import { BreadcrumbItem, SharedData } from '@/types';
import { Product } from '@/types/product';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/dashboard/products',
    },
];

interface InertiaPage extends SharedData {
    products: Product[];
}

export default function Products() {
    const { products } = usePage<InertiaPage>().props;

    const handleDelete = (id: number) => {
        router.delete(route('dashboard.products.delete', { id }));
    };

    const renderTableRow = (row: Product) => {
        return (
            <tr key={row.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <td className="px-6 py-3">
                    <img src={row.image} alt={row.name} className="aspect-square w-12 object-fill" />
                </td>
                <td className="px-6 py-3">{row.name}</td>
                <td className="px-6 py-3 text-right">{row.price_formatted}</td>
                <td className="px-6 py-3">{row.category.name}</td>
                <td className="px-6 py-3 text-center">
                    <Badge variant={row.status === 'active' ? 'success' : 'error'}>{row.status}</Badge>
                </td>
                <td className="px-6 py-3 text-center">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <Link href={route('dashboard.products.edit', { id: row.id })}>
                            <PencilIcon className="h-4 w-4 cursor-pointer opacity-45 hover:opacity-75" />
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Trash2 className="h-4 w-4 cursor-pointer opacity-45 hover:opacity-75" />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
                                <DialogDescription>Once product: {row.name} is deleted, it cannot be reverted.</DialogDescription>
                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">Cancel</Button>
                                    </DialogClose>

                                    <Button variant="destructive" asChild onClick={() => handleDelete(row.id)}>
                                        <button type="submit">Delete</button>
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                        <span>No Product Found</span>
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
                            <th scope="col" className="w-12 px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Price
                            </th>
                            <th scope="col" className="w-24 px-6 py-3 text-center">
                                Category
                            </th>
                            <th scope="col" className="w-24 px-6 py-3 text-center">
                                Status
                            </th>
                            <th scope="col" className="w-30 px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{products.length ? products.map(renderTableRow) : renderNoData()}</tbody>
                </table>
            </div>
        );
    };

    const renderHeaderExtra = () => {
        return (
            <Button size="sm" variant="secondary" onClick={() => router.get(route('dashboard.products.add'))}>
                <PlusIcon />
                Add
            </Button>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PageHeader title="Products" actions={renderHeaderExtra()} />
                {renderTable()}
            </div>
        </AppLayout>
    );
}
