import SectionFooter from "./SectionFooter.jsx";
import {Link} from "react-router-dom";


export default function Footer() {

    return <footer className='mx-10 lg:mx-20 mt-10 '>
        <div className='flex flex-col mb-20 '>
            <div className='flex flex-col lg:justify-between lg:flex-row '>
            <SectionFooter textSection='Resources'
                           resourcesLinks={[
                               {text: 'Gift Cards', to: ''},
                               {text: 'Find a Store', to: ''},
                               {text: 'Membership', to: ''},
                               {text: 'Site Feedback', to: ''},
                           ]} />


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
            <SectionFooter textSection='Promotions'
                           resourcesLinks={[
                               {text: 'Student', to: ''},
                               {text: 'Military', to: ''},
                               {text: 'Teacher', to: ''},
                               {text: 'Medical Professionals', to: ''},
                               {text: 'Birthday', to: ''},
                           ]}
            />
            </div>

          <div>
            <hr className='lg:hidden' />
            <div className='flex flex-col gap-1 lg:flex-row lg:gap-5 text-cyan-800'>
                <p className='my-4 lg:my-0 text-black'>© 2025 Sneakers Heaven, Online Store. All Rights Reserved</p>
                <Link to=''> <h5>Terms of Sale</h5> </Link>
                <Link to=''> <h5>Terms of Use</h5> </Link>
                <Link to=''> <h5>Nike Privacy Policy</h5> </Link>
            </div>
          </div>
        </div>
    </footer>

}
