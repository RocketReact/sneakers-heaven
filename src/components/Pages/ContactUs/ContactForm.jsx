import { Email, Name } from '../../TextInput/TextInputHtml.jsx';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import {notifySuccess, notifyError} from "../../Notification/Notification.jsx";
import {ToastContainer} from "react-toastify";



export default function ContactForm() {
    const methods = useForm({
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            message: '',
        },
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = methods;

    const onSubmit = (data) => {
        console.log('Отправленные данные:', data);
        reset()
        notifySuccess ('' +
            'We received your message, ' +
            'we respond asap!:)')

    };

    return (
        <FormProvider {...methods}>
            <form
                className="max-h-screen mt-10 flex flex-col max-w-xl justify-self-center items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-extralight">Please Contact Us:</h1>
                <div className="w-full">
                    <Email />
                    <Name />
                </div>
                <div className="mt-5 w-100">
                    <Controller
                        name="message"
                        control={control}
                        rules={{
                            required: 'Message is required',
                            minLength: {
                               value:50,
                                message: 'Message must be at least 50 characters long'
                        } }}
                        render={({ field, fieldState }) => (
                            <>
                                <textarea
                                    {...field}
                                    className= {`${fieldState?.error? 'border-red-500' : 'border-gray-300'} 
                                    text-gray-600 border-2  w-full h-30 rounded-lg`}
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
                </div>

                <button
                    type="submit"
                    className="flex p-3 text-center pr-5 pl-5 mt-5 max-w-30 bg-black text-white rounded-full font-extralight hover:scale-105 duration-200 hover:cursor-pointer active:scale-100"
                >
                    Submit
                </button>
                <ToastContainer/>
            </form>
        </FormProvider>
    );
}