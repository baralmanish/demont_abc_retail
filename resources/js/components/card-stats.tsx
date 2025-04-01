import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CardStatsProps {
    classnames?: {
        main?: string;
        count?: string;
        title?: string;
        icon?: string;
    };
    className?: string;
    item: {
        count: number;
        title: string;
        icon: LucideIcon;
    };
}

export function CardStats({ classnames, item }: CardStatsProps) {
    return (
        <div
            data-slot="stats-card"
            className={cn(
                'border-sidebar-border/70 dark:border-sidebar-border relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border p-6',
                classnames?.main,
            )}
        >
            <div className="flex flex-col gap-2">
                <div className={cn('text-5xl leading-none font-semibold', classnames?.count)}>{item.count}</div>
                <div className={cn('text-muted-foreground', classnames?.title)}>{item.title}</div>
            </div>
            <item.icon className={cn('h-16 w-16 opacity-50', classnames?.icon)} />
        </div>
    );
}
