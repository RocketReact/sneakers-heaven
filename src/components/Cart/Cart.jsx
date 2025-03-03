import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity, clearCart } from "../../store/cart/cartSlice.js";
import { FaTrash } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import generateProductLink from "../../generateURL/generateURL.js";
import noImage from "../../img/no-image.jpg";
import {Helmet} from "react-helmet-async";



function Cart () {
    const dispatch = useDispatch();
    const {cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);
    const navigate = useNavigate();


    if (!cartItems.length) {
        return <h2 className='text-center'>Cart is empty</h2>
    }

    return (

        <div className="cart mb-10 ml-20 mr-20 min-h-screen">
            <Helmet>
                <title> Cart</title>
                <meta name='robots' content='noindex, nofollow' />
            </Helmet>
            <hr className="mt-4 mb-6 border-t-2 border-gray-300" />

            {/* Контейнер Flexbox для вывода колонок */}
            <div className="flex flex-col md:flex-row md:space-x-10">
                {/* Блок Bag */}
                <div className="flex-2 w-full md:w-2/3">
                    <h1 className="text-2xl mb-5">Bag</h1>
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
                                        <h4>{product.title}</h4>
                                    </Link>
                                    {/* Цена */}
                                    <p className="text-2xl mb-2 mt-2">{product.price} $</p>
                                    {/* Количество */}
                                    <p>Quantity: {product.quantity}</p>
                                    {/* Кнопки управления */}
                                    <div className="space-x-2">
                                        <button
                                            className="btn "
                                            onClick={() => dispatch(addToCart(product))}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="btn "
                                            onClick={() => dispatch(decreaseQuantity(product.id))}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="btnDelete"
                                            onClick={() => dispatch(removeFromCart(product.id))}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div>
                        {/* Кнопка Очистить корзину */}
                        <button
                            className="flex mt-5 p-2 border rounded-md hover:cursor-pointer hover:bg-red-400 hover:text-white w-30"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart <FaTrash size={15} className="ml-2 mt-1" />
                        </button>
                    </div>
                </div>

                {/* Блок Summary */}
                <div className="flex-1 text-2xl max-w-md">
                    <h2 className="mb-5">Summary</h2>
                    <h3>Total Price: {totalPrice?.toFixed(2)} $</h3>
                    <h4>Total Quantity: {totalQuantity}</h4>
               <button
                   onClick={() => navigate('/checkout')}
                   className='
               p-3 bg-black text-white
               rounded-full font-extralight text-xl mt-3
               hover:cursor-pointer hover:bg-gray-400 active:scale-90 duration-150'> Checkout </button>
                </div>
            </div>



            <hr className="mt-4 mb-6 border-t-2 border-gray-300" />
        </div>



)

}

export default Cart