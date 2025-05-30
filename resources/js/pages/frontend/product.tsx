import { router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

import Form from 'react-bootstrap/Form';

import { ProductCard } from '@/components/fe_ui/product-card';
import AppLayoutProps from '@/layouts/frontend-layout';
import PageTitle from '@/layouts/frontend/page-title';

import { SharedData } from '@/types';
import { Product as IProduct } from '@/types/product';
import { TriangleAlertIcon } from 'lucide-react';

interface InertiaPage extends SharedData {
    products: IProduct[];
}

export default function Product() {
    const { products, site } = usePage<InertiaPage>().props;
    const prices = products.map((product) => Number(product.price));
    const maxPrice = Math.ceil(Math.max(...prices) + 5);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const catId = params.get('catId');
        if (catId) {
            setSelectedCategory(Number(catId));
        }
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const price = Number(product.price);
            const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
            const matchesPrice = price >= priceRange[0] && price - 1 <= priceRange[1];
            return matchesCategory && matchesPrice;
        });
    }, [products, selectedCategory, priceRange]);

    return (
        <AppLayoutProps>
            <PageTitle title="Our Products" />
            <div className="container my-16">
                {/* Filter Section */}
                <div className="row mb-10 flex gap-4">
                    <div className="col">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select
                            aria-label="Select category"
                            className="border p-2"
                            onChange={(e) => {
                                const newCatId = e.target.value ? Number(e.target.value) : null;
                                setSelectedCategory(newCatId);

                                const params = new URLSearchParams(window.location.search);
                                if (newCatId) {
                                    params.set('catId', newCatId.toString());
                                } else {
                                    params.delete('catId');
                                }

                                router.get(
                                    `${route('products')}?${params.toString()}`,
                                    {},
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                        replace: true,
                                    },
                                );
                            }}
                            value={selectedCategory || ''}
                        >
                            <option value="">All Categories</option>
                            {site.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="col">
                        <Form.Label>Up to AED {priceRange[1]}</Form.Label>
                        <Form.Range
                            step="1"
                            value={priceRange[1]}
                            min={0}
                            max={maxPrice}
                            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        />
                    </div>
                </div>
                {filteredProducts.length ? (
                    <div className="row g-4">
                        {filteredProducts.map((item) => (
                            <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                                <ProductCard
                                    href={route('products.details', { id: item.id })}
                                    imagePath={item.image}
                                    product={{ id: item.id, name: item.name, price: item.price_formatted }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-12">
                        <TriangleAlertIcon className="h-20 w-20 text-red-600" />
                        <div className="text-center">
                            <div className="mb-1.5 text-2xl font-black">Product Not Found</div>
                            <div className="opacity-55">Try Searching with other categories or different price ranges</div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayoutProps>
    );
}
