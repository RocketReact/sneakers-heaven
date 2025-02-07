import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity, clearCart } from "../../src/store/cart/cartSlice.js";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import generateProductURL from "../../src/generateProductURL/generateProductURL.js";

function Cart () {
    const dispatch = useDispatch();
    const {cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);



    if (!cartItems.length) {
        return <h2 className='text-center'>Cart is empty</h2>
    }

    return (

        <div className='cart mb-10 ml-20 mr-20'>
            <hr className="mt-4 mb-6 border-t-2 border-gray-300 "/>

            <ul>
                {cartItems.map(product => (
                    <li key={product.id} className='cartItem mb-10'>

                        <img src={product.image} alt={product.title} width="50"/>
                        <Link to={generateProductURL(product)} className='hover:underline'> <h4 > {product.title} </h4> </Link>
                        <p className='text-2xl mb-2 mt-2'>  {product.price} $</p>
                        <p >Quantity: {product.quantity}</p>

                        <div className='flex space-x-4 border-1 max-w-30
                                        mb-3 p-2
                                        hover *:cursor-pointer
                                        rounded-md justify-center'>
                            <button className='hover:scale-150'
                                    onClick={() => dispatch(addToCart(product))}> +
                            </button>

                            <button className='hover:scale-180'
                                    onClick={() => dispatch(decreaseQuantity(product.id))}> -
                            </button>

                            <button
                                className='hover:scale-110 '
                                onClick={() => dispatch(removeFromCart(product.id))}> Delete </button>
                        </div>
                    </li>
                ))}
            </ul>


            <button
                className = 'flex mt-5 p-2 border-1 rounded-md hover:cursor-pointer
                             hover:bg-red-400 hover:text-white w-30'

                onClick={() =>
                dispatch (clearCart ())}> Clear Cart <FaTrash size={15} className='ml-2 mt-1'/> </button>

            <hr className="mt-4 mb-6 border-t-2 border-gray-300 "/>

            <div className='justify-items-end text-2xl'>
                <h3>Total Price: {totalPrice.toFixed(2)} $</h3>
                <h4>Total Quantity: {totalQuantity}</h4>
            </div>

        </div>




)

}

export default Cart