import { Transition } from '@headlessui/react';
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
import { Testimonial, TestimonialForm } from '@/types/testimonial';

interface InertiaPage extends SharedData {
    id?: string;
    testimonial?: Testimonial;
}

export default function CategoriesForm() {
    const { id, testimonial } = usePage<InertiaPage>().props;

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm<Required<TestimonialForm>>({
        name: testimonial?.name || '',
        review: testimonial?.review || '',
        rating: testimonial?.rating || 5,
        order: testimonial?.order || 0,
        status: testimonial?.status || 'active',
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
            href: '/dashboard/testimonials',
        },
        {
            title: testimonial ? `Edit Testimonial` : 'Add Testimonial',
            href: '',
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (id) {
            post(route('dashboard.testimonials.update', id), {
                preserveScroll: true,
                onSuccess: () => console.log('Testimonial added successfully!'),
            });
        } else {
            post(route('dashboard.testimonials.create'), {
                preserveScroll: true,
                onSuccess: () => console.log('Testimonial added successfully!'),
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
        const thisImage = image || testimonial?.image || '';

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
                        <Label htmlFor="review">
                            Review<span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <Textarea
                            id="review"
                            rows={3}
                            className="mt-1 block w-full"
                            value={data.review}
                            onChange={(e) => setData('review', e.target.value)}
                            autoComplete="review"
                            placeholder="Review"
                        />
                        <InputError message={errors.review} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="rating">
                            Rating<span className="pl-0.5 text-red-600 dark:text-red-400">*</span>
                        </Label>
                        <Select
                            value={data.rating.toString()} // Convert number to string if needed
                            onValueChange={(value) => setData('rating', Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Rating" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                        {num} Stars
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.rating} />
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
                            required={!testimonial?.image}
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
            <Head title={testimonial ? `Edit Testimonial` : 'Add Testimonial'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PageHeader title={testimonial ? `Edit Testimonial` : 'Add Testimonial'} onBack={() => router.get(route('dashboard.testimonials'))} />
                {renderForm()}
            </div>
        </AppLayout>
    );
}
