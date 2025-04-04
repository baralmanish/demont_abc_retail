import Carousel from 'react-bootstrap/Carousel';

import { Button } from '@/components/fe_ui/button';

import DeliveryIcon from '../../../images/delivery-icon.png';
import Hero1 from '../../../images/hero1.png';
import Hero2 from '../../../images/hero2.png';

export default function AppHero() {
    const renderCaption = () => {
        return (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex">
                <div className="container mx-auto flex items-center justify-end">
                    <div className="flex flex-col gap-3 pr-[5%] pb-3 max-sm:gap-1">
                        <h6 className="m-0">
                            <span className="text-2xl max-lg:text-xl max-sm:text-lg">Pure 100% fresh store</span>
                        </h6>
                        <h2 className="m-0">
                            <span className="block text-8xl font-black text-green-600 uppercase max-lg:text-6xl max-sm:text-3xl">Organic</span>
                            <span className="block text-8xl font-bold uppercase max-lg:text-6xl max-sm:text-3xl">grocery</span>
                        </h2>
                        <div className="flex flex-col gap-4 max-sm:gap-2">
                            <div className="flex items-center gap-2.5 max-sm:gap-0.5">
                                <img src={DeliveryIcon} className="aspect-square w-12 max-lg:w-12 max-sm:w-8" />
                                <span className="text-xl max-sm:text-[14px]">Free delivery around 5 KM</span>
                            </div>

                            <Button className="w-fit lg:text-lg">SHOP NOW</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img
                    className="h-[calc(100vh-78.5px)] w-full object-cover object-right max-lg:max-h-[540px] max-md:max-h-[400px] max-sm:max-h-[300px]"
                    src={Hero1}
                    alt="First slide"
                />
                {renderCaption()}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="h-[calc(100vh-78.5px)] w-full object-cover object-right max-lg:max-h-[540px] max-md:max-h-[400px] max-sm:max-h-[300px]"
                    src={Hero2}
                    alt="First slide"
                />
                {renderCaption()}
            </Carousel.Item>
        </Carousel>
    );
}
