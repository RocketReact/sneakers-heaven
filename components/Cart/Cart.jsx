import {useDispatch, useSelector} from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity, clearCart } from "../../src/store/cart/cartSlice.js";

function Cart () {
    const dispatch = useDispatch();
    const {cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);



    if (!cartItems.length) {
        return <h2 className='text-center'>Cart is empty</h2>
    }

    return (
        <div className='cart'>
            <ul>
                {cartItems.map(product => (
                    <li key={product.id} className='cartItem'>

                        <img src={product.image} alt={product.title} width="50"/>
                        <h4>{product.title}</h4>
                        <p>{product.price} $</p>
                        <p>Quantity: {product.quantity}</p>
                        <button onClick={() => dispatch(addToCart(product))}> + </button>
                        <button onClick={() => dispatch(decreaseQuantity(product))}> - </button>
                        <button onClick={() => dispatch(removeFromCart(product))}> Delete </button>

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

export default Cart