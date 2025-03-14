import Checkbox from "../Checkout/Checkbox.jsx";
import {useEffect, useRef, useState} from "react";
import payPal from "../../img/paypal_PNG1.png";
import {FaApplePay} from "react-icons/fa";
import GPay from "../../img/google-pay.webp";
import { BsFillShieldLockFill } from "react-icons/bs";
import cvvVisa from '../../img/ch4_securityCardVisa.png';
import cvvAmex from '../../img/ch4_securityCardAmex.png';




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
    const [cardNumber, setCardNumber] = useState('');

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

    const formatCardNumber =(value) => {
        return value
            .replace(/\D/g, '')
            .slice(0, 16)
            .replace(/(.{4})/g, '$1 ')
            .trim()
    }


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



                    <label className='relative sm:col-span-2'>
                        <input
                            type="text"
                            placeholder='Card Number'
                            className='mt-5 py-4 px-4 w-full pr-12 border border-gray-300 rounded-md'
                            required={true}
                            value={cardNumber}
                            onChange={(e)=> {
                                const formatted = formatCardNumber(e.currentTarget.value);
                                setCardNumber (formatted);
                            }}
                        >
                        </input>
                        <BsFillShieldLockFill
                            className='absolute text-emerald-400 bottom-2 right-4
                            transform -translate-y-1/2 text-xl sm:text-lg lg:text-xl'
                            size={20}
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
                        type='button'
                        ref={infoRef}
                        onClick={toggleTooltip}
                        className='relative hover:cursor-pointer text-sm underline underline-offset-4 text-gray-500 hover:text-black'

                    >
                        Where is my CVV?
                    </button>

                    {tooltipVisible && (

                        <div
                            ref={tooltipRef}
                            className='flex flex-col text-center absolute -mb-.5 mt-1
                            right-0 z-10 w-70 sm:w-110  p-4 py-7 bg-black
                            text-white rounded-md shadow-md text-xs '>

                            <p >The CVV is a 3-digit number on the back of your card,
                                usually next to the signature strip.
                            </p>

                            <div className='flex flex-col sm:flex-row mt-4'>
                            <img src={cvvVisa} alt="cvvVisa"/>
                            <img src={cvvAmex} alt="cvvAmex"/>
                           </div>
                        </div>)
                    }

                </div>

            </div>
        )
        }

    </div>
}