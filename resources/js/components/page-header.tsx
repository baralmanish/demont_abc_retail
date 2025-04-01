import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface PageHeaderProps {
    title?: React.ReactNode;
    classname?: string;
    actions?: React.ReactNode;
    onBack?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export function PageHeader({ title, classname, actions, onBack }: PageHeaderProps) {
    return (
        <div className={cn('flex', classname)}>
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1">
                    {onBack && (
                        <div role="button" tabIndex={0} aria-label="Back" className="cursor-pointer opacity-50 hover:opacity-75" onClick={onBack}>
                            <ArrowLeft />
                        </div>
                    )}
                    {title && <span className="text-xl font-bold">{title}</span>}
                </div>
                {actions && <div className="flex">{actions}</div>}
            </div>
        </div>
    );
}
