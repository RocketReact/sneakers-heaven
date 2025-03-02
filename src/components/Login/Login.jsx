import { FormProvider, useForm } from "react-hook-form";
import {Email, Password} from '../TextInput/TextInputHtml.jsx'
import {addUserData} from "../../data/userRegisterData.js";
import { ToastContainer } from "react-toastify";
import {notifySuccess, notifyError} from "../Notification/Notification.jsx";


export default function Login ({isAuthenticated, setIsAuthenticated}) {
    const methods = useForm()
    const {handleSubmit, reset} = methods;
    const storedData = JSON.parse(localStorage.getItem("userRegisterData")) || [];

    const onSubmit = (data) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {
            return notifyError('Invalid email format!');
        }

        const newUser = {
            id: Date.now(),
            email: data.email,
            password: data.password
        };
        const findUser = (storedData.find(user =>
            user.email === newUser.email))


        if (findUser) {

            if (findUser.password ===newUser.password
             ) {
                notifySuccess ('You successfully logged!')
                setIsAuthenticated (true)
                reset()
            } else {
                notifyError('THIS EMAIL ADDRESS ALREADY EXISTS!')
                }
           } else {

            addUserData(newUser);

            try {
                localStorage.setItem("userRegisterData", JSON.stringify([...storedData, newUser]));
                reset()
                notifySuccess('🎉 Your email was successfully ' +
                    'registered!Check your mailbox to complete registration.')
            } catch (error) {
                console.error('Error saving user data.', error);
            notifyError(
                'Failed to save user data. ' +
                'Please try again.');
            }


        }
    }


    const onError = (errors) => {
        console.log("Form Errors:", errors);
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        notifySuccess("You successfully logged out!");
    };
   const styleBtn = 'bg-black rounded-full p-3 pr-5 pl-5 ' +
       'text-white font-extralight hover:bg-gray-400' +
       'hover:cursor-pointer active:scale-90 duration-200'

    return (

        <FormProvider {...methods} >

            <form onSubmit={handleSubmit(onSubmit, onError)}
                  className='w-100 justify-self-center mt-20'>
                <h1 className='text-2xl'>Enter your email and password to join us or sign in.</h1>
                <Email/>
                <Password/>
                <div className='justify-self-end mt-10'>
                    {(!isAuthenticated)? <button
                    type={'submit'}
                    className={styleBtn}
                > Continue </button>
                        : <button
                            onClick={handleLogout}
                            className= {styleBtn}
                        > Log Out </button>
                    }
                </div>
                <ToastContainer/>
            </form>
        </FormProvider>
    );
};

