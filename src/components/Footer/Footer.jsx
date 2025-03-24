import SectionFooter from "./SectionFooter.jsx";


export default function Footer() {

    return <footer className='mx-10 lg:mx-20 '>
        <div className='flex flex-col'>

            <SectionFooter/>

            <div >
                <hr className='lg:hidden' />
                <h3>Help</h3>
            </div>


            <div >
                <hr className='lg:hidden' />
                <h3>Company</h3>
            </div>

            <div >
                <hr className='lg:hidden' />
                <h3>Promotions & Discounts</h3>
            </div>

        </div>

    </footer>


}
