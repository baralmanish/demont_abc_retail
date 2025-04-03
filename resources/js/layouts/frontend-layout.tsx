import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

import SSRProvider from 'react-bootstrap/SSRProvider';

import AppHeader from '@/layouts/fontend/header';
import { SharedData } from '@/types';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/frontend.scss';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => {
    const { meta } = usePage<SharedData>().props;

    return (
        <SSRProvider>
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
        </SSRProvider>
    );
};
