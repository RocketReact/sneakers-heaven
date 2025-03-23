import { FormProvider, useForm } from "react-hook-form";
import {Email, Password} from '../TextInput/TextInputHtml.jsx'
import {addUserData} from "../../data/userRegisterData.js";
import {notifySuccess, notifyError} from "../Notification/Notification.jsx";
import Button from "../Button/Button.jsx";
import {Helmet} from "react-helmet-async";

/**
 * Login/Registration form
 * Handling both auth and new accounts
 * @param {boolean} isAuthenticated - Auth state
 * @param {Function} setIsAuthenticated - Auth state setter
 */
export default function Login ({isAuthenticated, setIsAuthenticated}) {
    // Form initialization
    const methods = useForm();
    const {handleSubmit, reset} = methods;

    // Get stored users
    const storedData = JSON.parse(localStorage.getItem("userRegisterData")) || [];

    // Form submission handler
    const onSubmit = (data) => {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return notifyError('Invalid email format!');
        }

        const newUser = {
            id: Date.now(),
            email: data.email,
            password: data.password
        };

        // Check for existing account
        const findUser = (storedData.find(user => user.email === newUser.email));

        if (findUser) {
            // Login flow
            if (findUser.password === newUser.password) {
                notifySuccess('You successfully logged!');
                setIsAuthenticated(true);
                reset();
            } else {
                notifyError('THIS EMAIL ADDRESS ALREADY EXISTS!');
            }
        } else {
            // Registration flow
            addUserData(newUser);

            try {
                localStorage.setItem("userRegisterData", JSON.stringify([...storedData, newUser]));
                reset();
                notifySuccess('🎉 Your email was successfully ' +
                    'registered!Check your mailbox to complete registration.');
            } catch (error) {
                console.error('Error saving user data.', error);
                notifyError('Failed to save user data. Please try again.');
            }
        }
    }

    // Validation error handler
    const onError = (errors) => {
        console.log("Form Errors:", errors);
    };

    // Logout handler
    const logOut = () => {
        setIsAuthenticated(false);
        notifySuccess("You successfully logged out!");
    };

    return (
        <FormProvider {...methods}>
            {/* SEO */}
            <Helmet>
                <title>Login</title>
                <meta name='robots' content='noindex, nofollow' />
            </Helmet>

            <form onSubmit={handleSubmit(onSubmit, onError)}
                  className='w-100 justify-self-center mt-20'>
                <h1 className='text-2xl'>Enter your email and password to join us or sign in.</h1>

                {/* Form inputs */}
                <Email/>
                <Password/>

                {/* Auth button */}
                <Button
                    isAuthenticated={isAuthenticated}
                    onLogOut={logOut}
                />
            </form>
        </FormProvider>
    );
};