import SectionFooter from "./SectionFooter.jsx";



export default function Footer() {

    return <footer className='mx-10 lg:mx-20 '>
        <div className='flex flex-col'>

            <SectionFooter resources={true} textSection='Resources'
                           resourcesLinks={[
                               {text: 'Gift Cards', to: ''},
                               {text: 'Find a Store', to: ''},
                               {text: 'Membership', to: ''},
                               {text: 'Site Feedback', to: ''},
                           ]} />


            <SectionFooter help={true} textSection='Help'
                           resourcesLinks={[
                               {text: 'Get Help', to: ''},
                               {text: 'Order Status', to: ''},
                               {text: 'Shipping and Delivery', to: ''},
                               {text: 'Returns', to: ''},
                               {text: 'O', to: ''},
                               {text: 'Find a Store', to: ''},
                               {text: 'Membership', to: ''},
                               {text: 'Site Feedback', to: ''}
                           ]}
            />
            <SectionFooter company={true} textSection='Company'
                           resourcesLinks={[
                               {text: 'Gift Cards', to: ''},
                               {text: 'Find a Store', to: ''},
                               {text: 'Membership', to: ''},
                               {text: 'Site Feedback', to: ''},
                               {text: 'Gift Cards', to: ''},
                               {text: 'Find a Store', to: ''},
                           ]}
            />
            <SectionFooter promotions={true} textSection='Promotions'
                           resourcesLinks={[
                               {text: 'Gift Cards', to: ''},
                               {text: 'Find a Store', to: ''},
                               {text: 'Membership', to: ''},
                               {text: 'Site Feedback', to: ''},
                               {text: 'Gift Cards', to: ''},
                           ]}
            />

        </div>
    </footer>


}
