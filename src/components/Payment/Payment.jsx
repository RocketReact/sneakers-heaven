import Checkbox from "../Checkout/Checkbox.jsx";
import payPal from "../../img/paypal_PNG1.png";
import {FaApplePay} from "react-icons/fa";
import GPay from "../../img/google-pay.webp";
import {useState} from "react";



export default function Payment() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(prevMethod => prevMethod === method ? null : method);
    };
    const [isCVVVisible, setIsCVVVisible] = useState(false);

    return <div>
        <hr className="  border-t-2 border-gray-300 mt-10"/>
        <div className=' flex flex-col max-w-60 '>
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
                <div className='flex flex-row gap-3 mb-5 justify-between'>
                    <label>
                        <input
                            type="text"
                            placeholder='Card Number'
                            className=' mt-5 py-4 pr-40 pl-4 border border-gray-300 rounded-md'
                            required={true}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='MM/YY'
                            className='mt-5 py-4 px-3 border border-gray-300 rounded-md'
                        />

                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='CVV'
                            className='mt-5 py-4 px-3 border border-gray-300 rounded-md'

                        />

                    </label>


                </div>


                <div className='flex flex-col relative'>
                    <button
                        className=' self-end underline underline-offset-4 hover:cursor-pointer'
                        onClick={() => setIsCVVVisible (!isCVVVisible)}
                    >Where is my CVV?</button>

                    {isCVVVisible && (
                        <div className='self-end absolute z-10 flex-col p-4 -mb-7 bg-black text-white'>
                            <p>Find your CVV</p>
                        </div>)
                    }
                </div>

            </div>
        )
        }

    </div>
}