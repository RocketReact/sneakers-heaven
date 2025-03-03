import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity, clearCart } from "../../store/cart/cartSlice.js";
import { FaTrash } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import generateProductLink from "../../generateURL/generateURL.js";
import noImage from "../../img/no-image.jpg";
import {Helmet} from "react-helmet-async";

export const Bag = ({textBag, textTitle, textPrice, textBtn}) => {
    const {cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    if (!cartItems.length) {
        return <h2 className='text-center'>Cart is empty</h2>
    }
    return <div className="flex-2 w-full md:w-2/3 mb-7">
        <h1 className={`${textBag || 'text-base'} text-2xl mb-5`}>Bag</h1>
        <ul>
            {cartItems.map((product, index) => (
                <li
                    key={`${product.id}-${index}`}
                    className="cartItem mb-10 flex items-center space-x-4"
                >
                    {/* Фото */}
                    <img
                        src={product.image || noImage}
                        alt={product.title || "Product image"}
                        width="50"
                        className="object-cover rounded-md"
                    />
                    {/* Информация о продукте */}
                    <div className="flex flex-col">
                        {/* Название */}
                        <Link
                            to={generateProductLink(product)}
                            className="hover:underline"
                        >
                            <h4 className={`${textTitle || 'text-base'} text-xl text-start`}>{product.title}</h4>
                        </Link>

                        {/* Цена */}
                        <p className={`${textPrice || 'text-base'} text-2xl mb-2 mt-2 text-start `}>{product.price} $</p>
                        {/* Количество */}
                        <p className={`${textPrice || 'text-base'} text-2xl mb-2 mt-2 text-start `}>Quantity: {product.quantity}</p>
                        {/* Кнопки управления */}
                        <div className="space-x-2 text-start">
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

    </div>
}
export const Summary = ({textSize}) => {
    const {totalQuantity, totalPrice } = useSelector((state) => state.cart);

    return <div className={`${textSize || 'text-base'} flex-1 text-2xl max-w-md`}>
        <h2 className="mb-5 ">Summary</h2>
        <h3>Total Price: {totalPrice?.toFixed(2)} $</h3>
        <h4>Total Quantity: {totalQuantity}</h4>

    </div>
}

function Cart () {
    const navigate = useNavigate();
    return (

        <div className="cart mb-10 ml-20 mr-20 min-h-screen font-extralight ">

            <Helmet>
                <title> Cart</title>
                <meta name='robots' content='noindex, nofollow' />
            </Helmet>


            <hr className="mt-4 mb-6 border-t-2 border-gray-300" />
            <div className="flex flex-col md:flex-row md:space-x-35 ">


                <div className='mb-10'>
                    <Bag/>
                    {/* Кнопка Очистить корзину */}
                    <button
                        className="flex mt-5 p-2 border rounded-md hover:cursor-pointer hover:bg-red-400 hover:text-white w-30"
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear Cart <FaTrash size={15} className="ml-2 mt-1" />
                    </button>
                </div>
                <div className="flex-1 text-2xl max-w-md">
                <Summary/>
                <button
                    onClick={() => navigate('/checkout')}
                    className='
               p-3 bg-black text-white
               rounded-full font-extralight text-xl mt-10
               hover:cursor-pointer hover:bg-gray-400 active:scale-90 duration-150'> Checkout </button>
                </div>
            </div>
            <hr className="mt-4 mb-6 border-t-2 border-gray-300" />
        </div>



)

}

export default Cart