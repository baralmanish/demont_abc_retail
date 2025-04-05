import { usePage } from '@inertiajs/react';

import Table from 'react-bootstrap/Table';

import AppLayoutProps from '@/layouts/frontend-layout';
import PageTitle from '@/layouts/frontend/page-title';

import { Button } from '@/components/fe_ui/button';
import { SharedData } from '@/types';

export default function CartPage() {
    const { cartItems } = usePage<SharedData>().props;
    console.log({ cartItems });

    const renderCartTable = () => {
        return (
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th className="w-13">Image</th>
                        <th>Name</th>
                        <th className="w-32" style={{ textAlign: 'right' }}>
                            Price
                        </th>
                        <th className="w-28" style={{ textAlign: 'right' }}>
                            Qty
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
                            <td className="text-right align-middle">{row.price}</td>
                            <td className="text-right align-middle">{row.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <AppLayoutProps>
            <PageTitle title="Checkout" />
            <div className="container my-16">
                {renderCartTable()}
                <div className="mt-3 flex justify-end">
                    <Button variant="default">Checkout</Button>
                </div>
            </div>
        </AppLayoutProps>
    );
}
