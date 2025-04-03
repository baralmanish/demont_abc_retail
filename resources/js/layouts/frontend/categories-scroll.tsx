import { usePage } from '@inertiajs/react';

import Slider from '@/components/fe_ui/slider';

import { SharedData } from '@/types';
import { Category } from '@/types/category';

interface InertiaPage extends SharedData {
    categories: Category[];
}

export default function HomeCategories() {
    const { categories } = usePage<InertiaPage>().props;

    return (
        <div className="container">
            <div className="my-6 ml-[-16px]">
                <Slider>
                    {categories.map((item) => (
                        <div key={item.id}>
                            <div className="ml-4 flex flex-col gap-2 bg-[#f7f8f1] p-3">
                                <img src={item.image} className="mx-2 aspect-square object-contain" />
                                <div className="text-center text-xl font-bold">{item.name}</div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
