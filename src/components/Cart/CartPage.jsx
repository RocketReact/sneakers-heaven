import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Cart from "./Cart";


export default function CartPage () {
    const {cartItems} = useSelector ((state) => state.cart.cartItems)

    return (
        <div>
            <h1 className='text-3xl justify-self-center mt-4'> Your Cart</h1>
            {cartItems === 0? (
                <p> Cart is empty <Link to='/'> Go to purchases</Link></p>
            ) : (
                <Cart/>
            )}

        </div>
    )
}