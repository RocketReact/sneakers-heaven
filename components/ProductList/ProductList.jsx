import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../../src/store/productSlice/productSlice.js";


const ProductList = () => {


    return (
        <div>
            <h2> Список товаров </h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}

            </ul>

        </div>
    )

};

export default ProductList;