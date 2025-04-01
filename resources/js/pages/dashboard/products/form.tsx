import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

import { BreadcrumbItem, SharedData } from '@/types';
import { Category } from '@/types/category';
import { Product, ProductForm } from '@/types/product';
import { Transition } from '@headlessui/react';

interface InertiaPage extends SharedData {
    id?: string;
    product?: Product;
    categories: Category[];
}

export default function ProductsForm() {
    const { id, product, categories } = usePage<InertiaPage>().props;

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm<Required<ProductForm>>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        status: product?.status || 'active',
        category_id: product?.category_id || null,
        image: null,
    });
    const [image, setImage] = useState<string | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Categories',
            href: '/dashboard/categories',
        },
        {
            title: product ? `Edit ${product.name}` : 'Add Category',
            href: '',
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (id) {
            post(route('dashboard.products.update', id), {
                preserveScroll: true,
                onSuccess: () => console.log('Product added successfully!'),
            });
        } else {
            post(route('dashboard.products.create'), {
                preserveScroll: true,
                onSuccess: () => console.log('Product added successfully!'),
            });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const renderImage = () => {
        const thisImage = image || product?.image || '';

        if (!thisImage) return;

        return <img src={thisImage} alt="Preview" className="mt-2 h-32 w-32 rounded-lg object-cover" />;
    };

    const renderForm = () => {
        return (
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">
                            Name
                            <span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Name"
                        />

                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">
                            Description
                            <span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            rows={3}
                            required
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            autoComplete="description"
                            placeholder="Description"
                        />

                        <InputError message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">
                            Price (AED)
                            <span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            className="mt-1 block w-full"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                            autoComplete="price"
                            placeholder="Price"
                        />

                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category_id">
                            Category<span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <Select value={`${data.category_id}`} onValueChange={(value) => setData('category_id', Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={`${cat.id}`}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.category_id} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">
                            Status<span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <Select value={data.status} onValueChange={(value) => setData('status', value as 'active' | 'inactive')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {['active', 'inactive'].map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status.toLocaleUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image">
                            Image
                            <span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <FileInput
                            required={!product?.image}
                            id="image"
                            className="mt-1 block w-full"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                        />
                        <InputError className="mt-2" message={errors.image} />
                        {renderImage()}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button type="reset" variant="secondary" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button disabled={processing}>Save</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product ? `Edit ${product.name}` : 'Add Category'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PageHeader title={product ? `Edit ${product.name}` : 'Add Category'} onBack={() => router.get(route('dashboard.products'))} />
                {renderForm()}
            </div>
        </AppLayout>
    );
}
