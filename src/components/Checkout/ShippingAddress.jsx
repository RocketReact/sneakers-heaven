import {useSelector} from "react-redux";

/**
 * Displays customer shipping address information
 * @param {boolean} isHidden - Hide shipping speed section when true
 * @param {boolean} textSmall - Use smaller text styling when true
 */
export default function ShippingAddress({isHidden, textSmall}) {
    // Get customer data from Redux store
    const {customerData} = useSelector(state => state.checkout);

    return <ul className={`${textSmall? ' text-sm text-gray-600': ' text-base'} text-left flex flex-col font-extralight`}>
        {/* Map through customer data safely with array check */}
        {Array.isArray(customerData) && customerData?.map((item) => (
            <li key={item.id}>
                {/* Address details */}
                <p className='font-normal'>Shipping Address</p>
                <div>{item.email}</div>
                <div>{item.firstName}</div>
                <div>{item.lastName}</div>
                <div>{item.country}</div>
                <div>{item.city}</div>
                <div>{item.postalCode}</div>
                <div>{item.phoneNumber}</div>

                {/* Conditionally rendered shipping speed section */}
                <div className={isHidden ? 'hidden' : ''}>
                    <p className= 'font-normal mt-2'>Shipping Speed</p>
                    <div>{item.deliverySpeed}</div>
                </div>
            </li>
        ))}
    </ul>
}