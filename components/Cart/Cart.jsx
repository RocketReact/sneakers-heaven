import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity, clearCart } from "../src/store/cart/cartSlice.js";

export default function Cart () {
    const dispatch = useDispatch();
    const {cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);

    if (!cartItems.length) {
        return <h2 className='text-center'>Cart is empty</h2>
    }

    return (
        <div className='cart'>
            <h2>Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id} className='cartItem'>
                        <img src={item.image} alt={item.title} width="50"/>
                        <h4>{item.title}</h4>
                        <p>{item.price} $</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => dispatch(addToCart(item))}> + </button>
                        <button onClick={() => dispatch(decreaseQuantity(item))}> - </button>
                        <button onClick={() => dispatch(removeFromCart(item))}> Delete </button>
                    </li>
                ))}
            </ul>

            <h3>Total Price: {totalPrice.toFixed(2)} $</h3>
            <h4>Total Quantity: {totalQuantity}</h4>
            <button onClick={() =>
                dispatch (clearCart ())}> Clear Cart </button>

        </div>
    )

}