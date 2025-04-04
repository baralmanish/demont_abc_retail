import { ShoppingBasket } from 'lucide-react';

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
    return (
        <a className="product-card" href={href}>
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
                    <div className="product-btn">
                        <ShoppingBasket />
                        Add to Cart
                    </div>
                </div>
            </div>
        </a>
    );
}
