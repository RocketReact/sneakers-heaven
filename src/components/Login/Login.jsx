import { FormProvider, useForm } from "react-hook-form";
import {Email, Password} from '../TextInput/TextInputHtml.jsx'
import {addUserData} from "../../data/userRegisterData.js";
import {notifySuccess, notifyError} from "../Notification/Notification.jsx";
import Button from "../Button/Button.jsx";
import {Helmet} from "react-helmet-async";


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

    const logOut = () => {
        setIsAuthenticated(false);
        notifySuccess("You successfully logged out!");
    };



    return (

        <FormProvider {...methods} >
            <Helmet>
                <title> Login </title>
                <meta name='robots' content='noindex, nofollow' />
            </Helmet>

            <form onSubmit={handleSubmit(onSubmit, onError)}
                  className='w-100 justify-self-center mt-20'>
                <h1 className='text-2xl'>Enter your email and password to join us or sign in.</h1>
                <Email/>
                <Password/>
                <Button
                    isAuthenticated={isAuthenticated}
                    onLogOut={logOut}


                />

            </form>
        </FormProvider>
    );
};

