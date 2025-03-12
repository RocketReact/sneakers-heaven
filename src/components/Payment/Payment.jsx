import Checkbox from "../Checkout/Checkbox.jsx";
import payPal from "../../img/paypal_PNG1.png";
import {FaApplePay} from "react-icons/fa";
import GPay from "../../img/google-pay.webp";
import {useEffect, useRef, useState} from "react";



export default function Payment() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(prevMethod => prevMethod === method ? null : method);
    };
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const tooltipRef = useRef(null);
    const infoRef = useRef(null);
    const toggleTooltip = () => {
        setTooltipVisible(prev =>!prev)
    }
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(e.target) &&
                infoRef.current &&
                !infoRef.current.contains(e.target)
            ) {
                setTooltipVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return <div>
        <hr className="border-t-2 border-gray-300 mt-10"/>
        <div className='flex flex-col max-w-60'>
            <div className='flex flex-col justify-start items-start gap-3'>
                <h2 className='mt-8'>Payment</h2>
                <p className='text-base mb-3'>Select payment method</p>
            </div>


            <Checkbox

                checked={selectedPaymentMethod === "Card"}
                onChange={() => handlePaymentMethodChange ("Card")}
            />


            <div className='flex flex-row hover:cursor-pointer '>
                <Checkbox

                    iconCheckbox={null}
                    textLabel={null}
                    checked={selectedPaymentMethod === "PayPal"}
                    onChange={() => handlePaymentMethodChange ("PayPal")}
                />
                <img
                    onClick={() => handlePaymentMethodChange("PayPal")}
                    src={payPal}
                    className='w-20 h-14 -ml-1 -mb-1'
                    alt="PayPal"/>
            </div>


            <Checkbox
                NewText={null}
                textLabel={null}
                iconSize={41}
                iconCheckbox={FaApplePay}
                checked={selectedPaymentMethod === "ApplePay"}
                onChange={() => handlePaymentMethodChange ("ApplePay")}
            />

            <div className='flex flex-row hover:cursor-pointerg '>
                <Checkbox
                    NewText={null}
                    textLabel={null}
                    iconCheckbox={null}
                    checked={selectedPaymentMethod === "GooglePay"}
                    onChange={() => handlePaymentMethodChange ("GooglePay")}
                />
                <img

                    onClick={() => handlePaymentMethodChange("GooglePay")}
                    src={GPay}
                    className='w-11 h-10.5 hover:cursor-pointer '
                    alt="GooglePay"/>
            </div>

        </div>

        {selectedPaymentMethod === "Card" && (

            <div className='flex flex-col mt-5 w-full rounded-md
                                          p-5 border-2 border-gray-300 justify-between
                                          font-extralight text-base'>
                <p className='font-normal self-start'>Add Card</p>
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5'>
                    <label className='sm:col-span-2'>
                        <input
                            type="text"
                            placeholder='Card Number'
                            className='mt-5 py-4 px-4 w-full  pl-4 border border-gray-300 rounded-md'
                            required={true}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='MM/YY'
                            className='mt-5 py-4 px-4 w-full pl-4 border border-gray-300 rounded-md'
                        />

                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='CVV'
                            className='mt-5 py-4 px-4 w-full pl-4 border border-gray-300 rounded-md'

                        />

                    </label>
                </div>

                <div className='relative inline-block text-end'>
                    <button
                        ref={infoRef}
                        onClick={toggleTooltip}
                        className='relative hover:cursor-pointer text-sm underline underline-offset-4 text-gray-500 hover:text-black'

                    >
                        Where is my CVV?
                    </button>

                    {tooltipVisible && (
                        <div
                            ref={tooltipRef}
                            className='text-center absolute -mb-.5 mt-1 right-0 z-10 w-80 p-4 py-13 bg-black text-white rounded-md shadow-md text-xs'>
                            <p>The CVV is a 3-digit number on the back of your card,
                                usually next to the signature strip.
                            </p>
                        </div>)
                    }

                </div>

            </div>
        )
        }

    </div>
}