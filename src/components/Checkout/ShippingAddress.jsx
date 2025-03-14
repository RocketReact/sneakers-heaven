import {useSelector} from "react-redux";

export default function ShippingAddress() {
    const {customerData} = useSelector(state => state.checkoutSlice);
    console.log("customerData in ShippingAddress:", customerData);
    return <ul className='flex flex-col font-extralight text-base text-left '>
        {Array.isArray(customerData) && customerData?.map((item) => (
            <li key={item.id}>

                <p className='font-normal'>Shipping Address</p>
                <div>{item.email}</div>
                <div>{item.firstName}</div>
                <div>{item.lastName}</div>
                <div>{item.country}</div>
                <div>{item.city}</div>
                <div>{item.postalCode}</div>
                <div>{item.phoneNumber}</div>

                <div>
                    <p className='font-normal mt-2'>Shipping Speed</p>
                    <div>{item.deliverySpeed}</div>
                </div>
            </li>
        ))}
    </ul>
}