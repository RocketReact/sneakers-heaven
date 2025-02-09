import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../src/store/cart/cartSlice.js";


export default function Checkout () {
    const dispatch = useDispatch();
    const {totalPrice, cartItems} = useSelector((state) => state.cart);

    const handleCheckout = () => {
        if (!cartItems.length) {
            alert('There are no cart items!');
            return;
        }
        alert(`Total Order Price ${totalPrice.toFixed(2)} $`)
        dispatch(clearCart());
    }

    return (
        <div>
            <h2>Order Checkout</h2>
            <h3> Total Order Value: {totalPrice.toFixed(2)} $</h3>
            <button onClick={handleCheckout}> Checkout </button>
        </div>
    )
}