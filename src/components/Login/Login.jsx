import { FormProvider, useForm } from "react-hook-form";
import {Email} from '../TextInput/TextInputHtml.jsx'
import {addUserData} from "../../data/userRegisterData.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Login () {
    const methods = useForm()
    const { handleSubmit, reset } = methods;
    const storedData = JSON.parse(localStorage.getItem("userRegisterData")) || [];

    const notifySuccess = () => {
        toast.success('🎉 Your email was successfully registered!Check your mailbox to complete registration.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    };
    const notifyError = () => {
        toast.error('Email address already exists! Choose another email!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    };

    const onSubmit = (data) => {
        const newUser = {
            id: Date.now(),
            email: data.email
        };

        if (storedData.some(user => user.email === newUser.email)) {
            notifyError();
        } else {
            addUserData(newUser);
            localStorage.setItem("userRegisterData", JSON.stringify([...storedData, newUser]));
            reset()
            notifySuccess()

        }
    };

    const onError = (errors) => {
        console.log("Form Errors:", errors);
    };

    return (

        <FormProvider {...methods} >

            <form onSubmit={handleSubmit(onSubmit, onError)}
                  className='w-100 justify-self-center mt-20'>
                <h1 className='text-2xl'>Enter your email to join us or sign in.</h1>
                <Email/>
                <div className='justify-self-end mt-10'>
                <button
                    type={'submit'}
                    className='
                bg-black rounded-full p-3 pr-5 pl-5
                text-white font-extralight hover:bg-gray-400
                hover:cursor-pointer active:scale-90 duration-200'
                > Continue </button>
                </div>
                <ToastContainer/>
            </form>
        </FormProvider>
    );
};

