import { useEffect, useRef } from 'react';
import {toast} from "react-toastify";
import { useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";

/**
 * Success notification helper
 * @param {string} content - Custom message (defaults to registration success)
 */
export const notifySuccess = (content = '' +
'🎉 Your email was successfully registered!' +
'Check your mailbox to complete registration.')  => {
    toast.success(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};

/**
 * Error notification helper
 * @param {string} content - Custom message (defaults to email exists error)
 */
export const notifyError = (content='' +
'THIS EMAIL ADDRESS ALREADY EXISTS!' +
' ' +
'CHOOSE ANOTHER EMAIL!') => {
    toast.error( content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};

/**
 * Cart notification component - tracks cart add/delete items
 */
export default function Notification () {
    // Current cart quantity from Redux
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    // Previous quantity for comparison
    const prevTotalQuantityRef = useRef(totalQuantity);

    // Show notifications when cart quantity changes
    useEffect(() => {
        const prevQuantity = prevTotalQuantityRef.current;

        // Item added
        if (totalQuantity > prevQuantity) {
            notifySuccess('Item was added successfully');
        }
        // Item removed
        else if (totalQuantity < prevQuantity && prevQuantity > 0) {
            notifyError('Item was removed successfully');
        }

        // Store current quantity for next comparison
        prevTotalQuantityRef.current = totalQuantity
    }, [totalQuantity]);

    return null
}