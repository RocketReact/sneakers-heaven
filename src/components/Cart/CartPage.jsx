import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Cart from "../Cart/Cart.jsx";


export default function CartPage () {
    const cartItems = useSelector ((state) => state.cart.cartItems)
    const navigate = useNavigate();
console.log(cartItems);
    return (
        <div className='text-center'>
            <h1 className=' text-3xl mt-4 font-extralight'> Your Cart</h1>
            {cartItems && cartItems.length===0?  (
                <div>

                    <p className='mt-5 text-black'> Cart is empty </p>
                    <button
                        onClick={() => navigate('/')}
                        className='
                py-3 px-4 bg-black text-white rounded-full mt-5
                hover:cursor-pointer hover:scale-105 duration-200
                active:scale-95
                '> Go to purchases</button>
                </div>
            ) : (
                <Cart/>
            )}

        </div>
    )
}