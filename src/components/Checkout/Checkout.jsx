import { useState, useEffect } from "react";
import { FaShippingFast, FaApplePay} from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
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
import {useSelector} from "react-redux";
import Checkbox from "./Checkbox.jsx";
import payPal from '../../img/paypal_PNG1.png'
import GPay from '../../img/google-pay.webp'
import { v4 as uuidv4 } from 'uuid';


const freeShipping = 'Free shipping, Arrives by Mon, Jun 17'
const paidShipping = "$20.00 Shipping, Arrives by Wed, Jun 12"

export default function Checkout({isAuthenticated}) {
    const [customerData, setCustomerData ] = useState([])
    const [activeBtnShipPickUp, setActiveBtnShipPickUp] = useState('ship');
    const [isContinueToPayment, setIsContinueToPayment] = useState(false);
    const [activeBtnShippingMethod, setActiveBtnShippingMethod] = useState(freeShipping);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isActiveEdit, setIsActiveEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isCVVVisible, setIsCVVVisible] = useState(false);
    const methods = useForm({
        defaultValues: {
            id: uuidv4(),
            email: "",
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            postalCode: "",
            phoneNumber: "",
            shippingMethod:''
        }
    });
    const {totalQuantity, totalPrice } = useSelector((state) => state.cart);
    const { handleSubmit } = methods;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const navigate = useNavigate();


    const handleClickShipPickUp = (buttonType) => {
        setActiveBtnShipPickUp(activeBtnShipPickUp === buttonType ? null : buttonType);
    };

    const handleClickChooseShippingMethod = (buttonType) => {
        setActiveBtnShippingMethod (activeBtnShippingMethod===buttonType ? null : buttonType);
    }

    useEffect(() => {
        if (isActiveEdit) {
            setIsContinueToPayment(false);
            setIsSubmitted(false)

        }
    }, [isActiveEdit]);


    const onSubmit = (data) => {

        if (!isSubmitted) {

            const cleanedData = {
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                country: data.country,
                city: data.city,
                postalCode: data.postalCode,
                phoneNumber: data.phoneNumber,
                shippingMethod: activeBtnShippingMethod

            };
            setCustomerData([cleanedData])
            addUserData(cleanedData);
            setIsSubmitted(true)
            setIsContinueToPayment(true);
            setIsActiveEdit(false)


        }


    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);

    }, [setIsOpen]);

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(prevMethod => prevMethod === method ? null : method);
    };


    return (
        <FormProvider {...methods}>
            <Helmet>
                <title> Checkout </title>
                <meta name='robots' content='noindex, nofollow' />
            </Helmet>
            <div className="text-center min-h-screen w-full">
                <h1 className="text-2xl mt-5">Checkout</h1>
                <span className='font-extralight '>
                    {totalQuantity} items {`${(totalPrice).toFixed(2)} $`}

                </span>
                <form onSubmit={handleSubmit(onSubmit )}>
                    <div className="flex flex-col justify-center items-center m-5 md:flex-col
                    lg:flex-row lg:items-start space-y-4 md:space-y-0 md:space-x-4 md:mx-15 my-5  lg:mx-20 text-2xl">

                        <div className="flex-2 order-2 lg:order-1 p-4 w-full">
                            <div className="flex flex-col relative ">
                                {!isContinueToPayment && <>
                                    <h2 className='mb-5'>Delivery Options </h2>

                                    <div className="flex flex-row space-x-3 ">

                                        <button
                                            type="button"
                                            onClick={() => handleClickShipPickUp("ship")}
                                            className={`
                                            btnDelivery
                                            ${activeBtnShipPickUp === "ship" ? "border-black border-2" : "border-gray-300 border-1"}
                                        `}
                                        >
                                            <FaShippingFast size="25"/> Ship
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleClickShipPickUp("pickup")}
                                            className={`
                                            btnDelivery
                                            ${activeBtnShipPickUp === "pickup" ? "border-black border-2" : "border-gray-300 border-1"}
                                        `}
                                        >
                                            <MdLocationOn size="25"/> Pick UP
                                        </button>
                                    </div>

                                    <Button
                                        onClick={ () => navigate("/login")}
                                        isAuthenticated={isAuthenticated}
                                        loginText="Login"
                                    />
                                </>}

                                {activeBtnShipPickUp === "ship" && (

                                    (customerData.length === 0)  || isActiveEdit
                                        ? <TextInputHtml />
                                        :  <div className={`${isContinueToPayment? 'border-none' : 'flex flex-col p-5 ' +
                                            'border-2 border-gray-500 hover:border-gray-700 rounded-md items-between justify-between'}`}
                                        >
                                            <div className="flex flex-row justify-between mb-3">

                                                <div className='flex flex-row gap-3 max-w-100'><h2>Delivery Options </h2> <FcCheckmark className='text-emerald-400' size={20} />
                                                </div>

                                                <div className='self-end text-sm font-bold text-gray-400 hover:text-gray-500'>
                                                    <button
                                                        onClick={() => {
                                                            setIsActiveEdit(!isActiveEdit);

                                                        }}
                                                        className=' hover:cursor-pointer underline underline-offset-3'> Edit </button>
                                                </div>
                                            </div>

                                            {customerData && customerData.length > 0 && (
                                                <ul className='flex flex-col font-extralight text-base text-left '>
                                                    {customerData.map((item) => (
                                                        <li key={item.id}>

                                                            <p className='font-normal'>Shipping Address</p>
                                                            <div>{item.email}</div>
                                                            <div>{item.firstName}</div>
                                                            <div>{item.lastName}</div>
                                                            <div>{item.country}</div>
                                                            <div>{item.city}</div>
                                                            <div>{item.postalCode}</div>
                                                            <div>{item.phoneNumber}</div>
                                                            {isContinueToPayment && (
                                                                <>
                                                                    <p className='font-normal mt-2'>Shipping Speed</p>
                                                                    <div>{item.shippingMethod}</div>
                                                                </>
                                                            )}

                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                        </div>
                                )}


                                {activeBtnShipPickUp === "pickup" && (
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

                                { !(customerData && customerData.length > 0 ) || isActiveEdit  && (<div className='mt-3 flex flex-col justify-start items-start
                                self-start text-base w-full'>
                                    <p className='font-normal mb-3'>Select your shipping speed</p>

                                    <button
                                        type="button"
                                        onClick={() => handleClickChooseShippingMethod (freeShipping)}
                                        className={`flex flex-col p-4 border-2 rounded-md
                                    hover:cursor-pointer hover:border-gray-500 w-full text-left
                                    font-normal ${activeBtnShippingMethod === freeShipping ? "border-black" : "border-gray-300"}
                                        `}>

                                        Free shipping
                                        <p className='text-sm font-extralight pt-1'>Arrives by Mon, Jun 17</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleClickChooseShippingMethod (paidShipping)}
                                        className={`mt-2 flex flex-col p-4 border-2 rounded-md
                                    hover:cursor-pointer hover:border-gray-500 w-full text-left
                                    font-normal ${activeBtnShippingMethod === paidShipping ? "border-black" : "border-gray-300"}
                                        `}>
                                        $20.00 Shipping
                                        <p className='text-sm font-extralight pt-1'>Arrives by Wed, Jun 12</p>
                                    </button>

                                </div>)

                                }

                                {isContinueToPayment &&
                                    <div>
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
                                                textLabel={null}
                                                iconSize={41}
                                                iconCheckbox={FaApplePay}
                                                checked={selectedPaymentMethod === "ApplePay"}
                                                onChange={() => handlePaymentMethodChange ("ApplePay")}
                                            />

                                            <div className='flex flex-row hover:cursor-pointerg '>
                                                <Checkbox
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


                                <div className='mt-6'>
                                    <button
                                        type="submit"
                                        className="
                                        w-50 bg-black text-white py-3 px-2 rounded-full
                                        hover:bg-gray-400 transition-all hover:cursor-pointer font-extralight
                                        text-xl mb-3
                                    "
                                    >
                                        {!isContinueToPayment ? 'Save & Continue'
                                            : (selectedPaymentMethod ? 'Place Order' : 'Continue to Payment')}


                                    </button>
                                </div>




                            </div>
                        </div>

                        <div className='flex-1 order-1 lg:order-2 w-full'>

                            <hr className=" lg:hidden  border-t-2 border-gray-300 mx-4"/>

                            <div className=" p-4 lg:self-start w-full">
                                <div
                                    className='flex flex-row items-center justify-between lg:justify-center
                               gap-5 mb-5
                               '>

                                    <h2>In your bag</h2>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(prev => !prev)}
                                        className={`${isOpen ? "rotate-180" : "rotate-0"}
                                text-gray-400 hover:text-gray-600 hover:cursor-pointer mt-1
                                lg:hidden 
                                `}
                                    > ▼

                                    </button>
                                </div>


                                <div className={`${isOpen? 'block' : 'hidden'} lg:block`}>
                                    <div className='flex flex-col items-center'>
                                        <Bag textTitle='text-lg' textPrice='text-lg' textBtn=''/>

                                        <Summary textSize='text-lg'/>
                                    </div>
                                </div>
                                {!isOpen &&
                                    (<hr className="lg:hidden  border-t-2 border-gray-300 w-full"/>)}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

