import AppLayoutProps from '@/layouts/frontend-layout';
import BrandsScroll from '@/layouts/frontend/brands-scroll';
import PageTitle from '@/layouts/frontend/page-title';
import Testimonials from '@/layouts/frontend/testimonials';
import { CheckCircle } from 'lucide-react';

export default function About() {
    return (
        <AppLayoutProps>
            <PageTitle title="About Us" />
            <div className="container my-16">
                <div className="mb-8">
                    <p>
                        Welcome to <strong>ABC Retail Supermarket</strong>, your one-stop destination for all your shopping needs in the UAE! As a
                        trusted name in the retail industry, we are committed to delivering a seamless shopping experience, offering a wide range of
                        <strong>groceries, fresh produce, electronics, household essentials, and more</strong> - all at competitive prices.
                    </p>
                </div>

                <div className="mb-8">
                    <h3>Our Mission</h3>
                    <p>
                        At ABC Retail, our mission is to provide <strong>high-quality products at affordable prices</strong>, ensuring convenience,
                        reliability, and superior customer service. Whether you shop in-store or online, we prioritize your satisfaction by
                        maintaining the highest standards in product selection, pricing, and customer care.
                    </p>
                </div>

                <div className="mb-8">
                    <h3>Why Shop With Us?</h3>
                    <ul className="list-unstyled">
                        <li className="d-flex align-items-center mb-0.5 gap-1.5">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <strong>Wide Product Range</strong> – From fresh fruits and vegetables to premium electronics, we have everything you need
                            under one roof.
                        </li>
                        <li className="d-flex align-items-center mb-0.5 gap-1.5">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <strong>Unmatched Convenience</strong> – Shop from the comfort of your home with our easy-to-use online store and fast
                            delivery services.
                        </li>
                        <li className="d-flex align-items-center mb-0.5 gap-1.5">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <strong>Quality You Can Trust</strong> – We source only the best products to ensure freshness, durability, and value for
                            money.
                        </li>
                        <li className="d-flex align-items-center mb-0.5 gap-1.5">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <strong>Affordable Pricing</strong> – Enjoy great discounts, exclusive deals, and unbeatable savings every day!
                        </li>
                        <li className="d-flex align-items-center mb-0.5 gap-1.5">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <strong>Customer-Centric Approach</strong> – Your satisfaction is our priority. Our friendly support team is always ready
                            to assist you.
                        </li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h3>Our Vision</h3>
                    <p>
                        We aim to be the <strong>leading retail supermarket</strong> in the Middle East, revolutionizing the shopping experience with
                        innovation, affordability, and exceptional service. We continuously strive to enhance our offerings, ensuring that our
                        customers receive the best shopping experience possible.
                    </p>
                </div>
                <div>
                    <h3>Shop With ABC Retail Today!</h3>
                    <p>
                        Whether you visit our store or shop online, ABC Retail Supermarket guarantees{' '}
                        <strong>quality, affordability, and convenience</strong> - all in one place. Experience the best in retail shopping with us!
                    </p>
                </div>
            </div>
            <Testimonials />
            <BrandsScroll />
        </AppLayoutProps>
    );
}
