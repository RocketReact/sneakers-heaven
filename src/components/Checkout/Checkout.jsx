import {useEffect, useRef} from 'react';
import { FaShippingFast} from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { MdLocationOn } from 'react-icons/md';
import '../../index.css';
import { FormProvider, useForm } from 'react-hook-form';
import TextInputHtml from '../TextInput/TextInputHtml.jsx';
import TextInput from '../TextInput/TextInput.jsx';
import { addUserData } from '../../data/userRegisterData.js';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import {Bag, Summary} from '../Cart/Cart.jsx';
import {Helmet} from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Payment from '../Payment/Payment.jsx';
import ShippingAddress from './ShippingAddress.jsx';
import  {setStep, setShippingMethod, setDeliverySpeed, setCustomerData,
    toggleEditingDelivery, setOpenToggleWhatInBag} from '../../store/checkoutSlice/checkoutSlice.js'


const freeShipping = 'Free shipping, Arrives by Mon, Jun 17'
const paidShipping = '$20.00 Shipping, Arrives by Wed, Jun 12'

/**
 * Multistep checkout flow component
 * @param {boolean} isAuthenticated - User auth status
 */
export default function Checkout({isAuthenticated}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const paymentRef = useRef(null);
    const {totalQuantity, totalPrice } = useSelector((state) => state.cart);
    const { step, shippingMethod, deliverySpeed, customerData, isEditingDelivery, isOpenToggleWhatInBag } = useSelector
    ((state) => state.checkout);
    const selectedPaymentMethod = useSelector((state) => state.paymentSlice.selectedPaymentMethod);

    // Form setup with defaults
    const methods = useForm({
        defaultValues: {id: uuidv4(), email: '',firstName: '',lastName: '',country: '',
            city: '',postalCode: '',phoneNumber: '',deliverySpeed: freeShipping
        }
    });
    const {handleSubmit} = methods;

    // Reset to shipping step when editing
    useEffect(() => {
        if (isEditingDelivery) {
            dispatch (setStep ('shipping'));
        }
    }, [isEditingDelivery]);

    // Load saved data when editing
    useEffect(() => {
        if (isEditingDelivery && customerData.length>0) {
            methods.reset(customerData[0])
        }
    }, [isEditingDelivery, customerData, methods]);

    // Handle form submission for each step
    const onSubmit = (data) => {
        if (step === 'shipping') {
            if (customerData.length === 0 || isEditingDelivery) {
                const cleanedData = {...data, id: uuidv4(), deliverySpeed};
                dispatch(setCustomerData([cleanedData]));
                addUserData(cleanedData);
                dispatch(toggleEditingDelivery(false));
                dispatch(setStep('continue to order review'));
            }
        } else if (step === 'continue to order review' ) {
            if (paymentRef.current) {
                const isPaymentValid = paymentRef.current.handleSubmit();
                if (isPaymentValid && customerData.length > 0 && selectedPaymentMethod) {
                    dispatch(setStep('confirm order & processing payment'));
                }
            }
        }
    }

    // Handle responsive cart display
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpenToggleWhatInBag(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpenToggleWhatInBag]);

    // Button text for different steps
    const buttonTextMap = {
        'continue to order review': 'Continue to Order Review',
        'confirm order & processing payment': 'Processing Payment',
        'shipping': 'Save & Continue',
    };

    return (
        <FormProvider {...methods}>
            {/* SEO */}
            <Helmet>
                <title> Checkout </title>
                <meta name='robots' content='noindex, nofollow' />
            </Helmet>
            <div className='text-center mb-20 w-full'>
                <h1 className='text-2xl mt-5'>Checkout</h1>
                <span className='font-extralight '>
                    {totalQuantity} items {`${(totalPrice).toFixed(2)} $`}
                </span>
                <form onSubmit={handleSubmit(onSubmit )}>
                    <div className='flex flex-col justify-center items-center m-5 md:flex-col
                    lg:flex-row lg:items-start space-y-4 md:space-y-0 md:space-x-4 md:mx-15 my-5 lg:mx-20 text-2xl'>

                        {/* Main checkout area */}
                        <div className='flex-2 order-2 lg:order-1 p-4 w-full'>
                            <div className='flex flex-col relative '>
                                {/* Delivery options */}
                                {(step!== 'continue to order review') && <>
                                    <h2 className='mb-5'>Delivery Options </h2>

                                    <div className='flex flex-row space-x-3 '>
                                        {/* Ship option */}
                                        <button
                                            type='button'
                                            onClick={() => dispatch(setShippingMethod ('ship'))}
                                            className={`
                                            btnDelivery
                                            ${shippingMethod === 'ship' ? 'border-black border-2' : 'border-gray-300 border-1'}
                                        `}
                                        >
                                            <FaShippingFast size='25'/> Ship
                                        </button>

                                        {/* Pickup option */}
                                        <button
                                            type='button'
                                            onClick={() => dispatch(setShippingMethod ('pickup'))}
                                            className={`
                                            btnDelivery
                                            ${shippingMethod === 'pickup' ? 'border-black border-2' : 'border-gray-300 border-1'}
                                        `}
                                        >
                                            <MdLocationOn size='25'/> Pick UP
                                        </button>
                                    </div>

                                    <Button
                                        onClick={ () => navigate('/login')}
                                        isAuthenticated={isAuthenticated}
                                        loginText='Login'
                                    />
                                </>}

                                {/* Shipping address input or display */}
                                {shippingMethod === 'ship' && (
                                    (customerData.length === 0)  || isEditingDelivery
                                        ? <TextInputHtml />
                                        : <div className='border-none flex flex-col pt-5 items-between justify-between'>
                                            <div className='flex flex-row justify-between mb-3'>
                                                <div className='flex flex-row gap-3 max-w-100'>
                                                    <h3>Delivery Options </h3>
                                                    <FcCheckmark className='text-emerald-400' size={20} />
                                                </div>

                                                <div className='self-end text-sm font-bold text-gray-400 hover:text-gray-500'>
                                                    <button
                                                        onClick={() => {
                                                            dispatch(toggleEditingDelivery(true));
                                                        }}
                                                        className=' hover:cursor-pointer underline underline-offset-3'>
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>

                                            {customerData && customerData.length > 0 && (
                                                <ShippingAddress/>
                                            )}
                                        </div>
                                )}

                                {/* Store pickup option */}
                                {shippingMethod === 'pickup' && (
                                    <div>
                                        <h4 className='font-light text-xl mt-3'>Select a store location</h4>
                                        <div className='w-full'>
                                            < TextInput
                                                id='storeLocation'
                                                name='storeLocation'
                                                label='Store Location*'
                                                rules={{
                                                    required: 'Enter your store location',
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Shipping speed selection */}
                                { !(customerData && customerData.length > 0 ) || isEditingDelivery && (
                                    <div className='mt-3 flex flex-col justify-start items-start self-start text-base w-full'>
                                        <p className='font-normal mb-3'>Select your shipping speed</p>

                                        {/* Free shipping */}
                                        <button
                                            type='button'
                                            onClick={() => dispatch(setDeliverySpeed(freeShipping))}
                                            className={`flex flex-col p-4 border-2 rounded-md
                                                hover:cursor-pointer hover:border-gray-500 w-full text-left
                                                font-normal ${deliverySpeed === freeShipping ? 'border-black' : 'border-gray-300'}
                                            `}>
                                            Free shipping
                                            <p className='text-sm font-extralight pt-1'>Arrives by Mon, Jun 17</p>
                                        </button>

                                        {/* Express shipping */}
                                        <button
                                            type='button'
                                            onClick={() => dispatch(setDeliverySpeed(paidShipping))}
                                            className={`mt-2 flex flex-col p-4 border-2 rounded-md
                                                hover:cursor-pointer hover:border-gray-500 w-full text-left
                                                font-normal ${deliverySpeed === paidShipping ? 'border-black' : 'border-gray-300'}
                                            `}>
                                            $20.00 Shipping
                                            <p className='text-sm font-extralight pt-1'>Arrives by Wed, Jun 12</p>
                                        </button>
                                    </div>
                                )}

                                {/* Payment section for review/confirm steps */}
                                {(step === 'continue to order review' || step==='confirm order & processing payment') &&
                                    <Payment
                                        ref={paymentRef}
                                        currentStep={step}
                                    />
                                }

                                {/* Action button */}
                                <div className='mt-6'>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (step === 'shipping') {
                                                handleSubmit(onSubmit)();
                                            } else if (step === 'continue to order review') {
                                                if (paymentRef.current) {
                                                    const isPaymentValid = paymentRef.current.handleSubmit();
                                                    if (isPaymentValid) {
                                                        dispatch(setStep('confirm order & processing payment'));
                                                    }
                                                }
                                            }
                                        }}
                                        className='min-w-50 bg-black text-white py-3 px-2 rounded-full
                                                hover:bg-gray-400 transition-all hover:cursor-pointer font-extralight
                                                text-xl mb-3'
                                    >
                                        {buttonTextMap[step]}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order summary sidebar */}
                        <div className='flex-1 order-1 lg:order-2 w-full'>
                            <hr className='lg:hidden border-t-2 border-gray-300 mx-4'/>

                            <div className='p-4 lg:self-start w-full'>
                                <div className='flex flex-row items-center justify-between lg:justify-center gap-5 mb-5'>
                                    <h2>In your bag</h2>

                                    {/* Mobile toggle for cart items */}
                                    <button
                                        type='button'
                                        onClick={() => dispatch(setOpenToggleWhatInBag(true))}
                                        className={`${isOpenToggleWhatInBag ? 'rotate-180' : 'rotate-0'}
                                            text-gray-400 hover:text-gray-600 hover:cursor-pointer mt-1
                                            lg:hidden 
                                        `}
                                    >
                                        ▼
                                    </button>
                                </div>

                                {/* Cart contents */}
                                <div className={`${isOpenToggleWhatInBag ? 'block' : 'hidden'} lg:block`}>
                                    <div className='flex flex-col items-center'>
                                        <Bag textTitle='text-lg' textPrice='text-lg' textBtn=''/>
                                        <Summary textSize='text-lg'/>
                                    </div>
                                </div>

                                {!isOpenToggleWhatInBag && (
                                    <hr className='lg:hidden border-t-2 border-gray-300 w-full'/>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    )
}