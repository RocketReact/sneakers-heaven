import { useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import '../../index.css';
import { FormProvider, useForm } from "react-hook-form";
import TextInputHtml from "../TextInput/TextInputHtml.jsx";
import TextInput from "../TextInput/TextInput.jsx";
import { addUserData } from "../../data/userRegisterData.js";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import {Bag, Summary} from "../Cart/Cart.jsx";
import {Helmet} from "react-helmet-async";


export default function Checkout({isAuthenticated}) {
    const [customerData, setCustomerData ] = useState(null)
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('ship');
    const methods = useForm({
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            postalCode: "",
            phoneNumber: "",
        }
    });

    const { handleSubmit } = methods;

    useEffect(() => {
        const storeData = localStorage.getItem("userRegisterData");
   if (storeData) {
       setCustomerData(JSON.parse(storeData));
   } else {
       setCustomerData({});
   }
    }, []);


    const handleClick = (buttonType) => {
        setActiveButton(activeButton === buttonType ? null : buttonType);
    };

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        setCustomerData(data);
        addUserData(data);
        navigate('/payment'); // Редирект после успешной отправки формы
    };




    return (
        <FormProvider {...methods}>
            <Helmet>
                <title> Checkout </title>
                <meta name='robots' content='noindex, nofollow' />
            </Helmet>
            <div className="text-center min-h-[1000px] w-full">
                <h1 className="text-2xl mt-3">Checkout</h1>
                <form onSubmit={handleSubmit(onSubmit )}>
                    <div className="flex flex-col md:flex-col lg:flex-row space-y-4
                    md:space-y-0 md:space-x-4 m-2 md:m-15 lg:m-20 text-2xl">
                        <div className="flex-2 p-4">
                            <div className="flex flex-col relative">
                                <h2>Delivery Options</h2>
                                <div className="flex flex-row space-x-3 ">

                                    <button
                                        type="button"
                                        onClick={() => handleClick("ship")}
                                        className={`
                                            btnDelivery
                                            ${activeButton === "ship" ? "border-black border-2" : "border-gray-300 border-1"}
                                        `}
                                    >
                                        <FaShippingFast size="25" /> Ship
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleClick("pickup")}
                                        className={`
                                            btnDelivery
                                            ${activeButton === "pickup" ? "border-black border-2" : "border-gray-300 border-1"}
                                        `}
                                    >
                                        <MdLocationOn size="25" /> Pick UP
                                    </button>
                                </div>

                                {activeButton === "ship" && <TextInputHtml />}
                                {activeButton === "pickup" && (
                                    <div>
                                        <h4 className="font-light text-xl mt-3">Select a store location</h4>
                                        <div className="w-full">
                                            <TextInput
                                                id="storeLocation"
                                                name="storeLocation"
                                                label="Store Location*"
                                                rules={{
                                                    required: "Enter your store location",
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                            </div>
                            <Button
                                onClick={ () => navigate("/login")}
                                isAuthenticated={isAuthenticated}
                                loginText="Login"
                            />

                        </div>

                        {/* Модуль "In your bag" */}
                        <div className="flex-1 p-4 md:mt-10 sm:mt-10 lg:mt-0 xl:mt-0">
                            <h2>In your bag</h2>
                            <hr className="mt-4 mb-6 border-t-2 border-gray-300" />

                               <Bag textTitle='text-lg' textPrice='text-lg' textBtn=''/>

                            <hr className="mt-4 mb-6 border-t-2 border-gray-300" />

                              <Summary textSize='text-lg'/>

                            {/* Кнопка Submit */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="
                                        w-50 bg-black text-white py-3 px-2 rounded-full
                                        hover:bg-gray-400 transition-all hover:cursor-pointer font-extralight
                                        text-xl mb-3
                                    "
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};