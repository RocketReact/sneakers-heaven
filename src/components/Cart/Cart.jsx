import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity, clearCart } from "../../store/cartSlice/cartSlice.js";
import { FaTrash } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import generateProductLink from "../../generateURL/generateURL.js";
import noImage from "../../img/no-image.jpg";
import {Helmet} from "react-helmet-async";

/**
 * Bag Co-located component - Displays all items in the cart with quantity controls
 *
 * @param {Object} props - Component props
 * @param {string} props.textTitle - Optional class for title text styling
 * @param {string} props.textPrice - Optional class for price text styling
 * @param {string} props.textBtn - Optional class for button text styling
 * @returns {JSX.Element} - Rendered component
 */
export const Bag = ({ textTitle, textPrice, textBtn}) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    return <div className="flex-2 w-full mb-7">
        <ul className='mt-7'>
            {cartItems.map((product, index) => (
                <li
                    key={`${product.id}-${index}`}
                    className="cartItem mb-10 flex items-center space-x-4 "
                >
                    {/* Product image */}
                    <img
                        src={product.image || noImage}
                        alt={product.title || "Product image"}
                        width="50"
                        className="object-cover rounded-md"
                    />
                    {/* Product details container */}
                    <div className="flex flex-col ">
                        {/* Product title with link to product page */}
                        <Link
                            to={generateProductLink(product)}
                            className="hover:underline"
                        >
                            <h4 className={`${textTitle || 'text-base'} text-xl text-start`}>{product.title}</h4>
                        </Link>

                        {/* Product price */}
                        <p className={`${textPrice || 'text-base'} text-2xl mb-2 mt-2 text-start `}>{product.price} $</p>

                        {/* Product quantity */}
                        <p className={`${textPrice || 'text-base'} text-2xl mb-2 mt-2 text-start `}>Quantity: {product.quantity}</p>

                        {/* Quantity control buttons */}
                        <div className="space-x-2 text-start ">
                            <button
                                className={`${textBtn || 'text-base'} text-md btn `}
                                onClick={() => dispatch(addToCart(product))}
                            >
                                +
                            </button>
                            <button
                                className={`${textBtn || 'text-base'} text-md btn `}
                                onClick={() => dispatch(decreaseQuantity(product.id))}
                            >
                                -
                            </button>
                            <button
                                className={`${textBtn || 'text-base'} text-md btnDelete `}
                                onClick={() => dispatch(removeFromCart(product.id))}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        <hr className=" border-t-2 border-gray-300" />
    </div>
}


/**
 * Summary Co-located components - Displays order summary with total price and quantity
 *
 * @param {Object} props - Component props
 * @param {string} props.textSize - Optional class for text sizing
 * @returns {JSX.Element} - Rendered component
 */
export const Summary = ({textSize}) => {
    const {totalQuantity, totalPrice } = useSelector((state) => state.cart);

    return <div className={`${textSize || 'text-base'} flex-1 text-2xl max-w-md mt-5 ml:mt-0 `}>
        <h2 className="mb-5 ">Summary</h2>
        <h3>Total Price: {totalPrice?.toFixed(2)} $</h3>
        <h4>Total Quantity: {totalQuantity}</h4>
    </div>
}


/**
 * Cart component - Main shopping cart page
 * Combines Bag and Summary components with additional controls
 * Provides clear cart functionality and checkout navigation
 *
 * @returns {JSX.Element} - Rendered component
 */
export default function Cart () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col mb-10 ml-20 mr-20 min-h-screen font-extralight ">
            {/* SEO optimization with Helmet */}
            <Helmet>
                <title>Cart</title>
                <meta name='robots' content='noindex, nofollow'/>
            </Helmet>

            <div className="flex flex-col items-center justify-start md:flex-row md:space-x-35">
                {/* Cart items section with clear cart button */}
                <div className='mb-7 justify-items-center'>
                    <Bag />
                    <button
                        className="flex justify-center mt-5 p-2 border
                        rounded-md hover:cursor-pointer hover:bg-red-400
                        hover:text-white w-30 "
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear Cart <FaTrash size={15} className="ml-2 mt-1"/>
                    </button>
                </div>

                {/* Order summary section with checkout button */}
                <div className="flex-1 text-2xl max-w-md md:self-start">
                    <Summary/>
                    <button
                        onClick={() => navigate('/checkout')}
                        className='
                        p-3 bg-black text-white
                        rounded-full font-extralight text-xl mt-10
                        hover:cursor-pointer hover:bg-gray-400 active:scale-90 duration-150'
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};