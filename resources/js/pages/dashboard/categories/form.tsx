import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

import { BreadcrumbItem, SharedData } from '@/types';
import { Category, CategoryForm } from '@/types/category';

interface InertiaPage extends SharedData {
    id?: string;
    category?: Category;
}

export default function CategoriesForm() {
    const { id, category } = usePage<InertiaPage>().props;

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm<Required<CategoryForm>>({
        name: category?.name || '',
        description: category?.description || '',
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
            title: category ? `Edit ${category.name}` : 'Add Category',
            href: '',
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (id) {
            post(route('dashboard.categories.update', id), {
                preserveScroll: true,
                onSuccess: () => console.log('Category added successfully!'),
            });
        } else {
            post(route('dashboard.categories.create'), {
                preserveScroll: true,
                onSuccess: () => console.log('Category added successfully!'),
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
        const thisImage = image || category?.image || '';

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
                            placeholder="Category name"
                        />

                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={3}
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            autoComplete="description"
                            placeholder="Category Description"
                        />

                        <InputError message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image">
                            Image
                            <span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <FileInput
                            required={!category?.image}
                            id="image"
                            className="mt-1 block w-full"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                        />
                        <InputError className="mt-2" message={errors.name} />
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
            <Head title={category ? `Edit ${category.name}` : 'Add Category'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PageHeader title={category ? `Edit ${category.name}` : 'Add Category'} onBack={() => router.get(route('dashboard.categories'))} />
                {renderForm()}
            </div>
        </AppLayout>
    );
}
