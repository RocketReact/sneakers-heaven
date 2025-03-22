import { useEffect, useRef } from 'react';
import {toast} from "react-toastify";
import { useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";


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

export default function Notification () {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const prevTotalQuantityRef = useRef(totalQuantity);
    useEffect(() => {
        const prevQuantity = prevTotalQuantityRef.current;
        if (totalQuantity > prevQuantity) {
            notifySuccess('Item was added successfully');
        }
        else if (totalQuantity < prevQuantity && prevQuantity > 0) {
            notifyError('Item was removed successfully');
        }

        prevTotalQuantityRef.current = totalQuantity
    }, [totalQuantity]);

    return null
}