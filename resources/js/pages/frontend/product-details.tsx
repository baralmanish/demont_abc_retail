import { router, usePage } from '@inertiajs/react';
import { LoaderCircle, Minus, Plus, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import AppLayoutProps from '@/layouts/frontend-layout';
import PageTitle from '@/layouts/frontend/page-title';

import { SharedData } from '@/types';
import { Product as IProduct } from '@/types/product';

interface InertiaPage extends SharedData {
    product: IProduct;
}

export default function ProductDetails() {
    const { product } = usePage<InertiaPage>().props;

    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleAddToCart = () => {
        setLoading(true);
        router.post(
            route('cart.add'),
            { product_id: product.id, quantity: count },
            {
                preserveScroll: true,
                onError: () => {
                    console.error('ERROR:: Error in adding cart.');
                },
                onFinish: () => {
                    setCount(1);
                    setLoading(false);
                },
            },
        );
    };

    return (
        <AppLayoutProps>
            <PageTitle title="Product Details" />
            <div className="container my-16">
                <Row className="gutter-5">
                    <Col lg={6}>
                        <img src={product.image} className="aspect-square w-full object-contain" />
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3 flex flex-col">
                            <small className="uppercase">{product.category.name}</small>
                            <h1>
                                <span className="text-3xl font-bold">{product.name}</span>
                            </h1>
                        </div>
                        <div className="mb-5 text-5xl font-black">{product.price_formatted}</div>
                        <div className="mb-4 flex flex-row gap-4">
                            <div className="flex">
                                <Button variant="secondary" disabled={count === 1} onClick={() => (count > 1 ? setCount((c) => c - 1) : undefined)}>
                                    <Minus />
                                </Button>
                                <div className="flex w-20 items-center justify-center bg-[#f7f8f1] font-bold">{count}</div>
                                <Button variant="secondary" disabled={count === 10} onClick={() => (count < 10 ? setCount((c) => c + 1) : undefined)}>
                                    <Plus />
                                </Button>
                            </div>
                            <Button variant="success" className="w-full" onClick={handleAddToCart} disabled={loading}>
                                <div className="flex justify-center gap-2 py-2 font-bold">
                                    {loading ? <LoaderCircle className="spin" /> : <ShoppingBasket />}

                                    {loading ? 'Adding to Cart...' : 'Add to Cart'}
                                </div>
                            </Button>
                        </div>
                        <div>{product.description}</div>
                    </Col>
                </Row>
            </div>
        </AppLayoutProps>
    );
}
