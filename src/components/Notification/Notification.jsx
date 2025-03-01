import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notifySuccess = ()  => {
    toast.success('🎉 Your email was successfully registered!Check your mailbox to complete registration.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};
export const notifyError = () => {
    toast.error('Email address already exists! Choose another email!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};