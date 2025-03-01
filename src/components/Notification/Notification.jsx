import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notifySuccess = (content = '🎉 Your email was successfully registered!Check your mailbox to complete registration.')  => {
    toast.success(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};
export const notifyError = (content='Email address already exists! Choose another email!') => {
    toast.error( content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
};