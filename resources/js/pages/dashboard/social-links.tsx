import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ISocialLinks } from '@/types/socialLinks';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Social Links',
        href: '/dashboard/social-links',
    },
];

interface InertiaPage extends SharedData {
    socialLink?: ISocialLinks;
}

export default function SocialLinks() {
    const { socialLink, ...rest } = usePage<InertiaPage>().props;

    console.log(rest);

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm<Required<ISocialLinks>>({
        facebook: socialLink?.facebook || '',
        instagram: socialLink?.instagram || '',
        twitter: socialLink?.twitter || '',
        youtube: socialLink?.youtube || '',
        linkedin: socialLink?.linkedin || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('dashboard.socialLinks.update'), {
            preserveScroll: true,
            onSuccess: () => console.log('Social links updated successfully!'),
        });
    };

    const renderForm = () => {
        return (
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                            id="facebook"
                            className="mt-1 block w-full"
                            value={data.facebook}
                            onChange={(e) => setData('facebook', e.target.value)}
                            autoComplete="facebook"
                            placeholder="Facebook"
                        />

                        <InputError message={errors.facebook} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                            id="instagram"
                            className="mt-1 block w-full"
                            value={data.instagram}
                            onChange={(e) => setData('instagram', e.target.value)}
                            autoComplete="instagram"
                            placeholder="Instagram"
                        />

                        <InputError message={errors.instagram} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                            id="twitter"
                            className="mt-1 block w-full"
                            value={data.twitter}
                            onChange={(e) => setData('twitter', e.target.value)}
                            autoComplete="twitter"
                            placeholder="Twitter"
                        />

                        <InputError message={errors.facebook} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="youtube">YouTube</Label>
                        <Input
                            id="youtube"
                            className="mt-1 block w-full"
                            value={data.youtube}
                            onChange={(e) => setData('youtube', e.target.value)}
                            autoComplete="youtube"
                            placeholder="YouTube"
                        />

                        <InputError message={errors.youtube} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                            id="linkedin"
                            className="mt-1 block w-full"
                            value={data.linkedin}
                            onChange={(e) => setData('linkedin', e.target.value)}
                            autoComplete="linkedin"
                            placeholder="LinkedIn"
                        />

                        <InputError message={errors.linkedin} />
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
            <Head title="Social Links" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PageHeader title="Social Links" />
                {renderForm()}
            </div>
        </AppLayout>
    );
}
