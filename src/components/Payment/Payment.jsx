import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";



export default function Payment() {
    const [customerData, setCustomerData ] = useState(null)
    const {cartItems} = useSelector((state) => state.cart);
    const navigate = useNavigate();

    if (!cartItems || !cartItems.length) {
        return <div className='flex-col justify-items-center mt-50 mr-15 ml-15 '>
            <p className='text-center font-extralight text-2xl'>
            Cart is empty - please add some items to Cart and Checkout </p>
            <button
                onClick={() => navigate('/shop-all')}
                className='p-3 mt-5 bg-emerald-300 rounded-full
                hover:cursor-pointer hover:scale-105 duration-200
                active:scale-95'>
                GO TO SHOP
            </button>
        </div>

    }
    useEffect(() => {
        const storeData = localStorage.getItem("userRegisterData");
        if (storeData) {
            const usersArray = JSON.parse(storeData);
            if (Array.isArray(usersArray) && usersArray.length > 0) {
                setCustomerData(usersArray[usersArray.length - 1]);
            }
        }
    }, []);
    return (
        <>
            {customerData ? (
                <div className='flex-row justify-items-center font-extralight'>
                    <h2 className='mb-5 mt-5 text-2xl'>Your information</h2>
                    <ul>
                        <li><strong>Email:</strong> {customerData.email}</li>
                        <li><strong>First Name:</strong> {customerData.firstName}</li>
                        <li><strong>Last Name:</strong> {customerData.lastName}</li>
                        <li><strong>Country:</strong> {customerData.country}</li>
                        <li><strong>City:</strong> {customerData.city}</li>
                        <li><strong>Postal Code:</strong> {customerData.postalCode}</li>
                        <li><strong>Phone Number:</strong> {customerData.phoneNumber}</li>
                    </ul>
                </div>
            ) : (
                <p>
                    Please add products to your Cart. After that, Checkout and you will be redirected to this page.
                </p>
            )}
        </>
    );
}