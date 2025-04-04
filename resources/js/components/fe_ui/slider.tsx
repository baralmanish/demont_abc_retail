import RSlider from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const defaultSettings = {
    dots: false,
    autoplay: true,
    speed: 300,
    slidesToShow: 6,
    initialSlide: 0,
    slidesToScroll: 1,
};

interface SliderProps {
    children: React.ReactNode;
}

export default function Slider({ children, ...settings }: SliderProps) {
    const thisSettings = {
        ...defaultSettings,
        ...settings,
    };
    return <RSlider {...thisSettings}>{children}</RSlider>;
}
