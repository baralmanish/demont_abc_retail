import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

import SSRProvider from 'react-bootstrap/SSRProvider';

import AppHeader from '@/layouts/frontend/header';
import AppFooter from './frontend/footer';

import { SharedData } from '@/types';

import '../../css/frontend.scss';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => {
    const { meta, site } = usePage<SharedData>().props;

    return (
        <SSRProvider>
            <Head title={meta.title}>
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={meta.keywords} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />

                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    integrity="sha384-..."
                    crossOrigin="anonymous"
                />
            </Head>

            <div {...props}>
                <AppHeader />
                {children}
                <AppFooter socialLink={site.socialLink} />
            </div>
        </SSRProvider>
    );
};
