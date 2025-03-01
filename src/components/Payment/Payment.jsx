
import {useEffect, useState} from "react";
import {getCustomerData} from '../Checkout/Checkout.jsx'

function Payment () {
    const [customerData, setCustomerData] = useState([])
    useEffect (() =>  {const data = getCustomerData();
        setCustomerData(data);}, []);

    return <>
        {customerData? (
            <div>
                <h2>Your information</h2>
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
                Please add products to your Cart, after this
                Checkout and you will be redirect to this page)
            </p>
        )}
     </>
}