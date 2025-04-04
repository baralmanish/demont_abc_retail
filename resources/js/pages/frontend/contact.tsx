import { Globe, Mail, MapPin, Phone } from 'lucide-react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import AppLayoutProps from '@/layouts/frontend-layout';
import BrandsScroll from '@/layouts/frontend/brands-scroll';
import PageTitle from '@/layouts/frontend/page-title';

export default function Contact() {
    return (
        <AppLayoutProps>
            <PageTitle
                title="Contact Us"
                description="Got a question? we had love to hear from you. send us a message and we will respond as soon as possible."
            />
            <div className="container my-16">
                <Row className="g-5">
                    <Col lg={{ order: 'first', span: 5 }} xs={{ order: 'last', span: 12 }}>
                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="text-2xl font-black">
                                    <span className="text-green-600">ABC</span> Retail
                                </div>
                                <div>Leading retail supermarket in the Middle East</div>
                            </div>
                            <div>
                                <div className="flex flex-row items-center gap-1.5">
                                    <MapPin className="h-5 w-5" /> <span className="font-bold">Address</span>
                                </div>
                                <div className="pl-6">Dubai, United Arab Emirates</div>
                            </div>
                            <div>
                                <div className="flex flex-row items-center gap-1.5">
                                    <Phone className="h-5 w-5" /> <span className="font-bold">Phone</span>
                                </div>
                                <div className="pl-6">+971 547386975</div>
                            </div>
                            <div>
                                <div className="flex flex-row items-center gap-1.5">
                                    <Mail className="h-5 w-5" /> <span className="font-bold">Email</span>
                                </div>
                                <div className="pl-6">info@abc-retail.ae</div>
                            </div>
                            <div>
                                <div className="flex flex-row items-center gap-1.5">
                                    <Globe className="h-5 w-5" /> <span className="font-bold">Website</span>
                                </div>
                                <div className="pl-6">www.abc-retail.ae</div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={{ order: 'last', span: 7 }} xs={{ order: 'first', span: 12 }}>
                        <Form>
                            <Form.Group className="mb-3" controlId="contactName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder="Enter full name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="contactEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="contactSubject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control placeholder="Enter subject" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="contactMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
            <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231280.41318719325!2d55.0626795164591!3d25.076242447822473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1743776830076!5m2!1sen!2sae"
                    loading="lazy"
                    className="contact-map"
                ></iframe>
            </div>
            <BrandsScroll />
        </AppLayoutProps>
    );
}
