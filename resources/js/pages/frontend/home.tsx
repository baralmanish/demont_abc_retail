import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

import AppLayoutProps from '@/layouts/frontend-layout';
import BrandsScroll from '@/layouts/frontend/brands-scroll';
import CategoriesScroll from '@/layouts/frontend/categories-scroll';
import AppHero from '@/layouts/frontend/hero';
import Testimonials from '@/layouts/frontend/testimonials';

import { ProductCard } from '@/components/fe_ui/product-card';
import { Product } from '@/types/product';

interface InertiaPage extends SharedData {
    products: Product[];
}

export default function Home() {
    const { products } = usePage<InertiaPage>().props;

    return (
        <AppLayoutProps>
            <AppHero />
            <CategoriesScroll />

            <div className="mt-25 mb-20">
                <div className="container">
                    <div className="mb-10 text-center">
                        <h2 className="mb-0 uppercase">
                            <span className="font-black">New Arrivals</span>
                        </h2>
                    </div>
                    <div className="row g-4 justify-content-md-center">
                        {products.map((item) => (
                            <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                                <ProductCard
                                    href={route('products.details', { id: item.id })}
                                    imagePath={item.image}
                                    product={{ id: item.id, name: item.name, price: item.price_formatted }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Testimonials />
            <BrandsScroll />
        </AppLayoutProps>
    );
}
