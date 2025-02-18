import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import '../../index.css';
import TextInput from "../TextInput/TextInput.jsx";
import { FormProvider, useForm } from "react-hook-form";

const Checkout = () => {
    const [activeButton, setActiveButton] = useState(null);
    const form = useForm(); // Инициализация react-hook-form

    const handleClick = (buttonType) => {
        setActiveButton(activeButton === buttonType ? null : buttonType);
    };

    return (
        <FormProvider {...form}> {/* Оборачиваем всю форму в FormProvider */}
            <div className="text-center">
                <h1 className="text-2xl mt-3">Checkout</h1>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 m-20 text-2xl">
                    <div className="flex-2 p-4">
                        <div className="flex flex-col">
                            <h2>Delivery Options</h2>
                            <div className="flex flex-row space-x-3">
                                <button
                                    onClick={() => handleClick("ship")}
                                    className={`
                                    btnDelivery
                                    ${activeButton === "ship" ? "border-black border-2" : "border-gray-300 border-1"} 
                                `}
                                >
                                    <FaShippingFast size="25"/> Ship
                                </button>

                                <button
                                    onClick={() => handleClick("pickup")}
                                    className={`
                                    btnDelivery
                                    ${activeButton === "pickup" ? "border-black border-2" : "border-gray-300 border-1"} 
                                `}
                                >
                                    <MdLocationOn size="25"/> Pick UP
                                </button>
                            </div>

                            {/* Поле Email, теперь управляется через react-hook-form */}
                            <TextInput
                                id="email"
                                name="email"
                                label="Email*"
                                rules={{ required: "Введите email" }}
                            />
                        </div>
                    </div>

                    <div className="flex-1 p-4">
                        <h2>In your bag</h2>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default Checkout;