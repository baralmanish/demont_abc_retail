import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

import { ORDER_STATUS, PAYMENT_STATUS } from '@/lib/enums';
import { getOrderStatusVariants, getPaymentStatusVariants } from '@/lib/utils';
import { SharedData, type BreadcrumbItem } from '@/types';
import { OrderDetails } from '@/types/order';

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

interface InertiaPage extends SharedData {
    order: OrderDetails;
}

export default function Orders() {
    const { order, auth } = usePage<InertiaPage>().props;
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm<
        Required<{ status: ORDER_STATUS; payment_status: PAYMENT_STATUS }>
    >({
        status: order.status,
        payment_status: (order.payment?.payment_status || 'pending') as PAYMENT_STATUS,
    });

    const updateOrderStatus: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('dashboard.order.updateStatus', order.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                console.log('Order status updated successfully!');
            },
        });
    };

    const updatePaymentStatus: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('dashboard.payment.updateStatus', { id: order.id, paymentId: order.payment?.id }), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                console.log('Payment status updated successfully!');
            },
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    const renderOrderItems = () => {
        return (
            <div className="relative flex-1 overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="w-12 px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="w-20 px-6 py-3 text-right">
                                Qty
                            </th>
                            <th scope="col" className="w-40 px-6 py-3 text-right">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.order_items.map((row) => (
                            <tr key={row.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                <td className="px-6 py-3">
                                    <img src={row.product.image} alt={row.product.name} className="aspect-square w-12 object-fill" />
                                </td>
                                <td className="px-6 py-3">
                                    <a href={route('products.details', { id: row.product.id })} target="_blank" className="hover:underline">
                                        <strong>{row.product.name}</strong>
                                    </a>
                                    <div className="line-clamp-1">{row.product.description}</div>
                                </td>
                                <td className="px-6 py-3 text-right">{row.quantity}</td>
                                <td className="px-6 py-3 text-right">{row.price_formatted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderOrderDetails = () => {
        return (
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] w-82 overflow-hidden rounded-xl border px-2 py-1 md:min-h-min">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="col" className="w-34 px-2 py-3">
                                Ordered Date
                            </th>
                            <td scope="col" className="px-2 py-3">
                                {order.order_date}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="col" className="px-2 py-3">
                                Ordered By
                            </th>
                            <td scope="col" className="px-2 py-3">
                                {order.ordered_by}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="col" className="px-2 py-3">
                                Total Qty
                            </th>
                            <td scope="col" className="px-2 py-3">
                                {order.quantity}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="col" className="px-2 py-3">
                                Total Amount
                            </th>
                            <td scope="col" className="px-2 py-3">
                                {order.total_price}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="col" className="px-2 py-3">
                                Status
                            </th>
                            <td scope="col" className="px-2 py-3">
                                <Badge variant={getOrderStatusVariants(order.status)} className="uppercase">
                                    {order.status}
                                </Badge>
                            </td>
                        </tr>
                        {order.payment && (
                            <>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="col" className="px-2 py-3">
                                        Payment Method
                                    </th>
                                    <td scope="col" className="px-2 py-3 capitalize">
                                        {order.payment?.payment_method}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="col" className="px-2 py-3">
                                        Payment Status
                                    </th>
                                    <td scope="col" className="px-2 py-3">
                                        <Badge
                                            variant={getPaymentStatusVariants(order.payment.payment_status as PAYMENT_STATUS)}
                                            className="uppercase"
                                        >
                                            {order.payment.payment_status}
                                        </Badge>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderActions = () => {
        return (
            <div className="flex gap-4">
                {order.payment && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="default">
                                Update Payment Status
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Select status to update payment status</DialogTitle>
                            <form className="space-y-6 pt-2" onSubmit={updatePaymentStatus}>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">
                                        Status<span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                                    </Label>
                                    <Select value={data.payment_status} onValueChange={(value) => setData('payment_status', value as PAYMENT_STATUS)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Payment Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(PAYMENT_STATUS).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status.toLocaleUpperCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary" onClick={closeModal}>
                                            Cancel
                                        </Button>
                                    </DialogClose>

                                    <Button variant="default" disabled={processing} asChild>
                                        <button type="submit">Update</button>
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="default">
                            Update Order Status
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Select status to update order status</DialogTitle>
                        <form className="space-y-6 pt-2" onSubmit={updateOrderStatus}>
                            <div className="grid gap-2">
                                <Label htmlFor="status">
                                    Status<span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                                </Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value as ORDER_STATUS)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Order Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ORDER_STATUS).map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status.toLocaleUpperCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant="default" disabled={processing} asChild>
                                    <button type="submit">Update</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order Detail" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PageHeader
                    title="Order Detail"
                    onBack={() => router.get(route('dashboard'))}
                    actions={auth.user.role === 'ADMIN' ? renderActions() : null}
                />
                <div className="flex w-full flex-row gap-4">
                    {renderOrderItems()}
                    {renderOrderDetails()}
                </div>
            </div>
        </AppLayout>
    );
}
