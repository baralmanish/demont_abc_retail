import { useForm, usePage } from '@inertiajs/react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import InputError from '@/components/input-error';
import AppLayoutProps from '@/layouts/frontend-layout';
import PageTitle from '@/layouts/frontend/page-title';

import { formatCurrency } from '@/lib/utils';
import { SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface CheckoutForm {
    shipping_address: string;
    payment_method: 'cash' | 'card';
    total_price: number;
}

export default function CartPage() {
    const { cartItems } = usePage<SharedData>().props;

    const totalAmount = cartItems
        .reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm<Required<CheckoutForm>>({
        shipping_address: '',
        payment_method: 'cash',
        total_price: Number(totalAmount),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('checkout.placeOrder'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const renderCartTable = () => {
        return (
            <>
                <div className="mb-2 text-2xl font-black">Order Summary</div>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th className="w-13">Image</th>
                            <th>Name</th>
                            <th className="w-16" style={{ textAlign: 'right' }}>
                                Qty
                            </th>
                            <th className="w-32" style={{ textAlign: 'right' }}>
                                Price
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
                                <td className="text-right align-middle">{row.quantity}</td>
                                <td className="text-right align-middle">{formatCurrency(row.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="text-right">
                    Total: <strong>{formatCurrency(totalAmount)}</strong>
                </div>
            </>
        );
    };

    const renderBillingDetails = () => {
        return (
            <>
                <div className="mb-2 text-2xl font-black">Billing Details</div>

                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="checkoutShippingAddress">
                        <Form.Label>
                            Shipping Address
                            <span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Form.Label>
                        <Form.Control
                            required
                            rows={3}
                            as="textarea"
                            value={data.shipping_address}
                            onChange={(e) => setData('shipping_address', e.target.value)}
                        />
                        <InputError message={errors.shipping_address} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="checkoutPaymentMethod">
                        <Form.Label>Payment Method</Form.Label>
                        <div className="">
                            <Form.Check
                                inline
                                label="Cash"
                                name="payment_method"
                                type="radio"
                                id="payment-method-cash"
                                value="cash"
                                checked={data.payment_method === 'cash'}
                                onChange={(e) => setData('payment_method', e.target.value as 'cash' | 'card')}
                            />
                            <Form.Check
                                inline
                                label="Debit/Credit Card"
                                name="payment_method"
                                type="radio"
                                id="payment-method-card"
                                value="card"
                                checked={data.payment_method === 'card'}
                                onChange={(e) => setData('payment_method', e.target.value as 'cash' | 'card')}
                            />
                        </div>
                        <InputError message={errors.payment_method} />
                    </Form.Group>

                    {data.payment_method === 'card' && (
                        <div className="mb-3">
                            <Form.Group className="mb-3" controlId="cardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="cardExpiry">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control type="text" placeholder="MM/YY" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="cardCVC">
                                        <Form.Label>CVC</Form.Label>
                                        <Form.Control type="text" placeholder="CVC" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button variant="success" type="submit" disabled={processing}>
                            <span className="flex flex-row gap-2">
                                {processing && <LoaderCircle className="spin" />}
                                {processing ? 'Placing Order...' : 'Place Order'}
                            </span>
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <div className="text-sm text-neutral-600">Order Request Sent</div>
                        </Transition>
                    </div>
                </Form>
            </>
        );
    };

    return (
        <AppLayoutProps>
            <PageTitle title="Checkout" />
            <div className="container my-16">
                <Row className="g-5">
                    <Col lg={{ order: 'last', span: 7 }}>{renderCartTable()}</Col>
                    <Col lg={{ order: 'first', span: 5 }}>{renderBillingDetails()}</Col>
                </Row>
            </div>
        </AppLayoutProps>
    );
}
