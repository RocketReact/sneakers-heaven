import { Email, Name } from '../../TextInput/TextInputHtml.jsx';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

export default function ContactForm() {
    const [message, setMessage] = useState('');
    const methods = useForm({
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            message: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Отправленные данные:', data);
        setMessage('');
    };

    return (
        <FormProvider {...methods}>
            <form
                className="max-h-screen mt-10 flex flex-col max-w-xl justify-self-center items-center"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-extralight">Please Contact Us:</h1>
                <div className="w-full">
                    <Email />
                    <Name />
                </div>
                <div className="mt-5 w-100">
                    <Controller
                        name="message"
                        control={methods.control}
                        rules={{ required: 'Message is required' }}
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
                                        {fieldState?.error.message}
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
            </form>
        </FormProvider>
    );
}