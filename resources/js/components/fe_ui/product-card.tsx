import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { LoaderCircle, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

interface ProductCardProps {
    href: string;
    imagePath: string;
    product: {
        id: number;
        name: string;
        price: string;
    };
}

export function ProductCard({ href, imagePath, product }: ProductCardProps) {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setLoading(true);
        router.post(
            route('cart.add'),
            { product_id: product.id, quantity: 1 },
            {
                preserveScroll: true,
                onError: () => {
                    console.error('ERROR:: Error in adding cart.');
                },
                onFinish: () => {
                    setLoading(false);
                },
            },
        );
    };

    return (
        <a className={cn('product-card', loading && 'disabled')} href={href}>
            <div className="product-img">
                <img src={imagePath} />
            </div>
            <div className="product-info">
                <div className="product-description">
                    <div className="product-details">{product.name}</div>
                    <div className="price">
                        <span>{product.price}</span>
                    </div>
                </div>
                <div className="product-cart-btn">
                    <Button className="product-btn" onClick={handleAddToCart} disabled={loading}>
                        {loading ? <LoaderCircle className="spin" /> : <ShoppingBasket />}

                        {loading ? 'Adding to Cart...' : 'Add to Cart'}
                    </Button>
                </div>
            </div>
        </a>
    );
}
