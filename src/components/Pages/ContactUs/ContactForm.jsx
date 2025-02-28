import {Email, Name} from '../../TextInput/TextInputHtml.jsx'
import { FormProvider, useForm } from "react-hook-form";

export default function ContactForm () {
    const methods = useForm({
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Отправленные данные:", data);
    };
   return (


    <FormProvider {...methods}>
        <form className=' mt-20 flex flex-col max-w-xl justify-self-center items-center'
              onSubmit={methods.handleSubmit(onSubmit)}

        >
            <h1 className='text-2xl font-extralight'>Please Contact Us:</h1>
            <div className='w-full '>
                <Email/>
                <Name/>
            </div>
            <div className='mt-5 w-100'>

                <input className='border-2 border-gray-300 '
                       type="text"
                       placeholder='Message'


                />
            </div>


        <button
            type='submit'
            className='flex p-3 text-center pr-5 pl-5 mt-5 max-w-30 bg-black
            text-white rounded-full font-extralight hover:scale-105
            duration-200 hover:cursor-pointer
            active:scale-100'
        >
            Submit
        </button>



        </form>
       </FormProvider>

   )

}