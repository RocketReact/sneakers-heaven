import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import '../../index.css';
import { FormProvider, useForm } from "react-hook-form";
import TextInputHtml from "../TextInput/TextInputHtml.jsx";
import TextInput from "../TextInput/TextInput.jsx";
import {useSelector} from "react-redux";
import CheckoutCart from "./CheckoutCart.jsx";

const Checkout = () => {
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
        },
    });

    const { handleSubmit } = methods; // Деконструкция handleSubmit для использования

    const handleClick = (buttonType) => {
        setActiveButton(activeButton === buttonType ? null : buttonType);
    };

    // Функция для обработки отправки данных
    const onSubmit = (data) => {
        console.log("Form Data:", data); // В консоль выводим данные формы
        alert("Checkout Successful!"); // Информируем пользователя
        // Здесь можно добавить код для отправки данных на сервер
    };

    // Функция для обработки ошибок, если они есть
    const onError = (errors) => {
        console.log("Form Errors:", errors); // Лог ошибок
    };

    return (
        <FormProvider {...methods}>
            <div className="text-center">
                <h1 className="text-2xl mt-3">Checkout</h1>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 m-20 text-2xl">
                    <div className="flex-2 p-4">
                        <div className="flex flex-col relative h-[400px]
">
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

                            {activeButton === "ship" &&

                                <TextInputHtml/>
                            }
                            {activeButton === "pickup"
                                &&
                                <div>
                                <h4 className='font-light text-xl mt-3'>Select a store location</h4>
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
                            }
                            {/* Кнопка Submit */}
                            <div className="mt-6 ">
                                <button
                                    type="submit"
                                    onClick={handleSubmit(onSubmit, onError)} // Связываем handleSubmit с функциями
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
                    {/* Модуль "In your bag" */}
                    <div className="flex-1 p-4">
                        <h2>In your bag</h2>
                        <CheckoutCart/>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default Checkout;