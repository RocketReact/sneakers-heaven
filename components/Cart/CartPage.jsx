import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Cart from "./Cart";


export default function CartPage () {
    const {totalQuantity} = useSelector ((state) => state.cart)

    return (
        <div>
            <h1>Cart</h1>
            {totalQuantity > 0? (
                <p> Cart is empty <Link to='/'> Go to purchases</Link></p>
            ) : (
                <Cart/>
            )}

        </div>
    )
}