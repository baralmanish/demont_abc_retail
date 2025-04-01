import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

import AppHeader from '@/layouts/fontend/header';
import { SharedData } from '@/types';

import '../../css/frontend.css';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => {
    const { meta } = usePage<SharedData>().props;

    return (
        <>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={meta.keywords} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />

                <link href="" rel="stylesheet" type="text/css" media="all"></link>
            </Head>

            <div {...props}>
                <AppHeader />
                {children}
            </div>
        </>
    );
};
