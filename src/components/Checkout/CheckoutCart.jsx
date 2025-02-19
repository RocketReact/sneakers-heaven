import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity } from "../../store/cart/cartSlice.js";
import { Link } from "react-router-dom";
import generateProductLink from "../../generateURL/generateURL.js";
import noImage from "../../img/no-image.jpg";



export default function CheckoutCart () {
    const dispatch = useDispatch();
    const {cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);


    if (!cartItems.length) {
        return <h2 className='text-center'>Cart is empty</h2>
    }

    return (

        <div className="min-h-screen">
            <hr className="mt-10 mb-6 border-t-2 border-gray-300" />

            <ul>
                {cartItems.map((product, index) => (
                    <li
                        key={`${product.id}-${index}`}
                        className="cartItem mb-10 text-lg flex items-start space-x-4" // Flexbox для горизонтального размещения
                    >
                        <div className="shrink-0"> {/* Контейнер для изображения */}
                            <img
                                src={product.image || noImage}
                                alt={product.title || "Product image"}
                                width="40" // Размер изображения
                                className="object-cover rounded-md" // Дополнительные стили изображения
                            />
                        </div>

                        <div className="flex flex-col text-left space-y-2"> {/* Текстовые элементы */}
                            {/* Название продукта */}
                            <Link to={generateProductLink(product)} className="hover:underline font-semibold">
                                <h4 className="text-lg">{product.title}</h4>
                            </Link>


                            <p className="mb-1 text-gray-700">{product.price} $</p>

                            <p className="text-gray-600">Quantity: {product.quantity}</p>

                            <div className="flex space-x-2">
                                <button
                                    className="btn"
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
                                    className="btnDelete "
                                    onClick={() => dispatch(removeFromCart(product.id))}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <hr className="mt-4 mb-6 border-t-2 border-gray-300" />

            <div className="text-lg">
                <h3>Total Price: {totalPrice?.toFixed(2)} $</h3>
                <h4>Total Quantity: {totalQuantity}</h4>
            </div>
        </div>
    )
}

