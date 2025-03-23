import { Email, Name } from '../../TextInput/TextInputHtml.jsx';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import {notifySuccess} from "../../Notification/Notification.jsx";
import {Helmet} from "react-helmet-async";

/**
 * Contact form with email, name and message inputs
 */
export default function ContactForm() {
    // Initialize form with default values
    const methods = useForm({
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            message: '',
        },
    });

    // Extract form methods and state
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = methods;

    // Handle form submission
    const onSubmit = (data) => {
        reset()
        notifySuccess ('' +
            'We received your message, ' +
            'we respond asap!:)')
    };

    return (
        <FormProvider {...methods}>
            <div className='flex flex-col mr-10 ml-10 items-center justify-center'>
                {/* SEO metadata */}
                <Helmet>
                    <title>Contact Us | Sneakers Heaven</title>
                    <meta name="description" content="Contact us - we respond asap!" />
                </Helmet>

                <form
                    className="max-h-screen mt-10 flex flex-col max-w-xl justify-self-center items-center "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-2xl font-extralight">Please Contact Us:</h1>

                    {/* Email and Name fields */}
                    <div>
                        <Email />
                        <Name />
                    </div>

                    {/* Message textarea with validation */}
                    <Controller
                        name="message"
                        control={control}
                        rules={{
                            required: 'Message is required',
                            minLength: {
                                value: 50,
                                message: 'Message must be at least 50 characters long'
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <textarea
                                    {...field}
                                    className= {`${fieldState?.error? 'border-red-500' : 'border-gray-300'} 
                                    text-gray-600 border-2 h-30 w-full rounded-lg mt-5`}
                                    placeholder="Your message"
                                />
                                {fieldState?.error && (
                                    <p className="text-red-500 text-sm ">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </>
                        )}
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="flex p-3 text-center pr-5 pl-5 mt-5 max-w-30 bg-black text-white rounded-full font-extralight hover:scale-105 duration-200 hover:cursor-pointer active:scale-100"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </FormProvider>
    );
}