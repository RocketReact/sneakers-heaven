import {useSelector} from "react-redux";

export default function ShippingAddress({isHidden, textSmall}) {
    const {customerData} = useSelector(state => state.checkout);
    return <ul className={`${textSmall? ' text-sm text-gray-600': ' text-base'} text-left flex flex-col font-extralight`}

      >
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

                <div className={isHidden ? 'hidden' : ''}>
                    <p className= 'font-normal mt-2'>Shipping Speed</p>
                    <div>{item.deliverySpeed}</div>
                </div>
            </li>
        ))}
    </ul>
}