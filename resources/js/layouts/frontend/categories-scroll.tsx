import { usePage } from '@inertiajs/react';

import Slider from '@/components/fe_ui/slider';

import { SharedData } from '@/types';

export default function HomeCategories() {
    const { site } = usePage<SharedData>().props;

    const settings = {
        dots: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className="mt-20 mb-20">
            <div className="container">
                <div className="mb-10 text-center">
                    <h2 className="mb-1 uppercase">
                        <span className="font-black">What food you love to order</span>
                    </h2>
                    <p className="mb-0">Here order your favorite foods from different categories</p>
                </div>
                <div className="ml-[-16px]">
                    <Slider {...settings}>
                        {site.categories.map((item) => (
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
        </div>
    );
}
