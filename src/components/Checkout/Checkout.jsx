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
import {useSelector} from "react-redux";


export default function Checkout({isAuthenticated}) {
    const [customerData, setCustomerData ] = useState([])
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('ship');
    const [isActiveEdit, setIsActiveEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const methods = useForm({
        defaultValues: {
            id: Date.now(),
            email: "",
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            postalCode: "",
            phoneNumber: "",
        }
    });
    const {totalQuantity, totalPrice } = useSelector((state) => state.cart);

    const { handleSubmit } = methods;

    const handleClick = (buttonType) => {
        setActiveButton(activeButton === buttonType ? null : buttonType);
    };

    const onSubmit = (data) => {
        const cleanedData = {
            id: Date.now(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country,
            city: data.city,
            postalCode: data.postalCode,
            phoneNumber: data.phoneNumber,
        };
        setCustomerData([cleanedData])
        addUserData(cleanedData);
        setIsActiveEdit(false)

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
                                <h2 className='mb-5'>Delivery Options</h2>
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

                                <Button
                                    onClick={ () => navigate("/login")}
                                    isAuthenticated={isAuthenticated}
                                    loginText="Login"
                                />

                                {activeButton === "ship" && (

                                    ((customerData.length === 0) || isActiveEdit)
                                        ? <TextInputHtml />
                                        : <div className='flex flex-col
                                            p-5 mt-3 border-2 border-gray-500 hover:border-gray-700 rounded-md items-start justify-start'>
                                            <div className='self-end text-sm font-bold text-gray-400 hover:text-gray-500'>
                                                <button
                                                    onClick={() => setIsActiveEdit(true)}
                                                    className='hover:cursor-pointer underline underline-offset-3'> Edit </button>
                                            </div>

                                            {customerData && customerData.length > 0 && (
                                                <ul className='flex flex-col font-extralight text-base text-left '>
                                                    {customerData.map((item) => (
                                                        <li key={item.id}>
                                                            <div>{item.email}</div>
                                                            <div>{item.firstName}</div>
                                                            <div>{item.lastName}</div>
                                                            <div>{item.country}</div>
                                                            <div>{item.city}</div>
                                                            <div>{item.postalCode}</div>
                                                            <div>{item.phoneNumber}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                )}
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

                                <div className='mt-6'>
                                        <button
                                            type="submit"
                                            className="
                                        w-50 bg-black text-white py-3 px-2 rounded-full
                                        hover:bg-gray-400 transition-all hover:cursor-pointer font-extralight
                                        text-xl mb-3
                                    "
                                        >
                                            Save & Continue
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
                                (<hr className="lg:hidden mb-10 border-t-2 border-gray-300 w-full"/>)}
                           </div>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};