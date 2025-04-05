import AppLayoutProps from '@/layouts/frontend-layout';
import PageTitle from '@/layouts/frontend/page-title';

import { Smile } from 'lucide-react';

export default function OrderSuccess() {
    return (
        <AppLayoutProps>
            <PageTitle title="Order Created" />
            <div className="container my-16">
                <div className="flex flex-col items-center justify-center gap-2 py-12">
                    <Smile className="h-20 w-20 text-green-600" />
                    <div className="text-center">
                        <div className="mb-1.5 text-2xl font-black text-green-600">Order Created</div>
                        <div className="opacity-55">You will get a call from our representation once the order is ready.</div>
                    </div>
                </div>
            </div>
        </AppLayoutProps>
    );
}
