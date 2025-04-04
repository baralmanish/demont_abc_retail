import Slider from '@/components/fe_ui/slider';

import Brand1 from '../../../images/brands/l1.png';
import Brand2 from '../../../images/brands/l2.png';
import Brand3 from '../../../images/brands/l3.png';
import Brand4 from '../../../images/brands/l4.png';
import Brand5 from '../../../images/brands/l5.png';
import Brand6 from '../../../images/brands/l6.png';

export default function HomeCategories() {
    const settings = {
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        slidesToShow: 8,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    dots: false,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 3,
                    dots: false,
                },
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className="my-10">
            <div className="container-fluid">
                <Slider {...settings}>
                    <div>
                        <img src={Brand1} />
                    </div>
                    <div>
                        <img src={Brand2} />
                    </div>
                    <div>
                        <img src={Brand3} />
                    </div>
                    <div>
                        <img src={Brand4} />
                    </div>
                    <div>
                        <img src={Brand5} />
                    </div>
                    <div>
                        <img src={Brand6} />
                    </div>
                    <div>
                        <img src={Brand1} />
                    </div>
                    <div>
                        <img src={Brand2} />
                    </div>
                    <div>
                        <img src={Brand3} />
                    </div>
                    <div>
                        <img src={Brand4} />
                    </div>
                    <div>
                        <img src={Brand5} />
                    </div>
                    <div>
                        <img src={Brand6} />
                    </div>
                </Slider>
            </div>
        </div>
    );
}
