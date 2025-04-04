// Import required components and libraries
import SectionFooter from "./SectionFooter.jsx";
import {Link} from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaYoutube, FaLinkedin, FaTiktok  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";





export default function Footer() {
    return (
        <>
            {/* SEO metadata with Helmet */}
            <Helmet>
                <title>Sneakers Heaven - Premium Footwear Store</title>
                {/* Description meta tag for search engines */}
                <meta name="description" content="
                Explore a wide range of sneakers at Sneakers Heaven.
                Find the perfect pair for your style and comfort." />
                {/* Keywords to help with SEO */}
                <meta name="keywords" content="sneakers, shoes, footwear, Sneakers Heaven" />
                {/* Open Graph tags for social media sharing */}
                <meta property="og:title" content="Sneakers Heaven - Premium Footwear Store" />
                <meta property="og:description" content="Explore a wide range of sneakers at Sneakers Heaven." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="" />
                {/* Canonical URL to prevent duplicate content issues */}
                <link rel="canonical" href="" />
            </Helmet>

            {/* Main footer container with responsive padding */}
            <footer className='mx-10 lg:mx-20 mt-10 '>
                <hr className='hidden lg:block'/>
                <div className='flex flex-col mb-20 '>
                    {/* Footer sections container - stacked on mobile, row on desktop */}
                    <div className='flex flex-col lg:justify-between lg:flex-row '>
                        {/* Resources section with custom links */}
                        <SectionFooter textSection='Resources'
                                       resourcesLinks={[
                                           {text: 'Gift Cards', to: ''},
                                           {text: 'Find a Store', to: ''},
                                           {text: 'Membership', to: ''},
                                           {text: 'Site Feedback', to: ''},
                                       ]} />
                        {/* Help section with support links */}
                        <SectionFooter textSection='Help'
                                       resourcesLinks={[
                                           {text: 'Get Help', to: ''},
                                           {text: 'Order Status', to: ''},
                                           {text: 'Shipping and Delivery', to: ''},
                                           {text: 'Returns', to: ''},
                                           {text: 'Order Cancellation', to: ''},
                                           {text: 'Payment Options', to: ''},
                                           {text: 'Gift Card Balance', to: ''},
                                           {text: 'Contact us', to: '/contact'}
                                       ]}
                        />
                        {/* Company information section */}
                        <SectionFooter textSection='Company'
                                       resourcesLinks={[
                                           {text: 'About Sneakers Heaven', to: ''},
                                           {text: 'News', to: ''},
                                           {text: 'Careers', to: ''},
                                           {text: 'Investors', to: ''},
                                           {text: 'Purpose', to: ''},
                                           {text: 'Sustainability', to: ''},
                                       ]}
                        />
                        {/* Promotions section with special offers */}
                        <SectionFooter textSection='Promotions'
                                       resourcesLinks={[
                                           {text: 'Student', to: ''},
                                           {text: 'Military', to: ''},
                                           {text: 'Teacher', to: ''},
                                           {text: 'Medical Professionals', to: ''},
                                           {text: 'Birthday', to: ''},
                                       ]}
                        />
                        <hr className='lg:hidden' />

                    </div>

                    {/* Social & Copyright notice */}
                    <div className='flex flex-col items-center lg:flex-row lg:justify-between space-y-3 my-5 '>
                        <p className='my-4 text-black lg:my-0 lg:self-start'>
                        © 2025 Sneakers Heaven, Online Store. All Rights Reserved</p>

                    <div className='flex flex-row gap-5 lg:self-end'>
                        <IoLogoInstagram size={30}/>
                        <FaFacebook size={30}/>
                        <FaYoutube size={30}/>
                        <FaXTwitter size={30}/>
                        <FaLinkedin size={30}/>
                        <FaTiktok size={30}/>
                    </div>

                    </div>
                    {/* Bottom footer section with copyright and legal links */}
                    <div>
                        {/* Legal links - stacked on mobile, row on desktop */}
                        <div className='flex flex-col gap-1 lg:flex-row lg:gap-5 text-cyan-800'>
                            {/* Legal links */}
                            <Link to=''> <h5>Terms of Sale</h5> </Link>
                            <Link to=''> <h5>Terms of Use</h5> </Link>
                            <Link to=''> <h5>Nike Privacy Policy</h5> </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}