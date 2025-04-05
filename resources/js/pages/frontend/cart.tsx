import { router, usePage } from '@inertiajs/react';

import Table from 'react-bootstrap/Table';

import AppLayoutProps from '@/layouts/frontend-layout';
import PageTitle from '@/layouts/frontend/page-title';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/fe_ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { SharedData } from '@/types';
import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react';

export default function CartPage() {
    const { cartItems } = usePage<SharedData>().props;

    const handleUpdateCart = (productId: number, quantity: number) => {
        let thisQty = quantity;
        if (quantity < 1) {
            thisQty = 1;
        } else if (quantity > 10) {
            thisQty = 10;
        }

        router.post(
            route('cart.update'),
            { product_id: productId, quantity: thisQty },
            {
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id: number) => {
        router.delete(route('cart.remove', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayoutProps>
            <PageTitle title="Cart Items" />
            <div className="container my-16">
                {cartItems.length ? (
                    <>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="w-13">Image</th>
                                    <th>Name</th>
                                    <th className="w-32" style={{ textAlign: 'right' }}>
                                        Qty
                                    </th>
                                    <th className="w-32" style={{ textAlign: 'right' }}>
                                        Price
                                    </th>
                                    <th className="w-24" style={{ textAlign: 'center' }}>
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((row) => (
                                    <tr key={row.id}>
                                        <td>
                                            <img src={row.image} alt={row.name} className="aspect-square w-12 object-fill" />
                                        </td>
                                        <td className="align-middle">{row.name}</td>
                                        <td className="text-right align-middle">
                                            <Select
                                                defaultValue={`${row.quantity}`}
                                                onValueChange={(value) => handleUpdateCart(row.id, Number(value))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[...Array(10)].map((_, index) => (
                                                        <SelectItem key={index} value={`${index + 1}`}>
                                                            {index + 1}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="text-right align-middle">{formatCurrency(row.price)}</td>
                                        <td className="text-right align-middle">
                                            <div className="flex flex-row items-center justify-center gap-3">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Trash2 className="h-5 w-5 cursor-pointer opacity-45 hover:opacity-75" />
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle className="pr-4" style={{ lineHeight: '24px' }}>
                                                            Are you sure you want to remove this product from cart?
                                                        </DialogTitle>
                                                        <DialogDescription style={{ marginTop: -20, marginBottom: 0 }}>
                                                            Once product: {row.name} is removed from cart, it cannot be reverted.
                                                        </DialogDescription>
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
                                ))}
                            </tbody>
                        </Table>
                        <div className="mt-3 flex justify-end">
                            <Button variant="default" onClick={() => router.visit(route('checkout'))}>
                                Proceed to Checkout
                                <ArrowRight />
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-12">
                        <ShoppingCart className="h-20 w-20 opacity-50" />
                        <div className="text-center">
                            <div className="mb-1.5 text-2xl font-black">Cart is Empty</div>
                            <div className="opacity-55">Please add some product(s) to the cart</div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayoutProps>
    );
}
