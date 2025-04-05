import { usePage } from '@inertiajs/react';

import Carousel from 'react-bootstrap/esm/Carousel';

import { StarRating } from '@/components/star-rating';
import { SharedData } from '@/types';

export default function Testimonials() {
    const { site } = usePage<SharedData>().props;

    return (
        <div className="my-12 bg-[#f7f8f1] py-20">
            <div className="container-fluid">
                <div className="mb-10 text-center">
                    <h2 className="mb-1 uppercase">
                        <span className="font-black">Testimonials</span>
                    </h2>
                    <p className="mb-0">What our customers say about us?</p>
                </div>
                <Carousel data-bs-theme="dark" indicators={false}>
                    {site.testimonials.map((item) => (
                        <Carousel.Item key={item.id}>
                            <div className="flex flex-col justify-center gap-2.5">
                                <StarRating rating={item.rating} />
                                <div className="mx-auto w-5/8 text-center text-2xl">{item.review}</div>
                                <div className="mt-10 flex flex-col items-center gap-1">
                                    <img src={item.image} className="aspect-square w-18 rounded-full object-cover" />
                                    <span className="font-black">{item.name}</span>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
