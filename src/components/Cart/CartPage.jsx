import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Cart from "../Cart/Cart.jsx";

/**
 * CartPage component - Handles cart state display logic
 *
 * Displays empty cart message with navigation button when cart is empty
 * Otherwise renders the full Cart component with items
 *
 * @returns {JSX.Element} Rendered cart page
 */
export default function CartPage () {
    // Get cart items from Redux store
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    return (
        <div className='text-center'>
            <h1 className='text-3xl mt-4 font-extralight'>Your Cart</h1>

            {/* Conditional rendering based on cart state */}
            {cartItems && cartItems.length === 0 ? (
                // Empty cart view with navigation option
                <div>
                    <p className='mt-5 text-black'>Cart is empty</p>
                    <button
                        onClick={() => navigate('/')}
                        className='
                            py-3 px-4 bg-black text-white rounded-full mt-5
                            hover:cursor-pointer hover:scale-105 duration-200
                            active:scale-95
                        '
                    >
                        Go to purchases
                    </button>
                </div>
            ) : (
                // Non-empty cart view - render full Cart component
                <Cart/>
            )}
        </div>
    );
}