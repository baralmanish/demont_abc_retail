import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import AppLayoutProps from '@/layouts/frontend-layout';

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <AppLayoutProps>
                <div>dfa</div>
            </AppLayoutProps>
        </>
    );
}
