import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../../src/store/productSlice/productSlice.js";
import ProductRating from "../ProductsRaiting/ ProductRating.jsx";
import {addToCart, decreaseQuantity, removeFromCart} from "../../src/store/cart/cartSlice.js";
import {useNavigate} from "react-router-dom";


export default function ProductSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {products, status} = useSelector((state) => state.products);

    useEffect(() => {
        if (status === "idle" && products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [status, products.length, dispatch]);

    if (status === "loading") {
        return <h2 className="text-center text-xl">Loading...</h2>;
    }

    const product = products.find(product => product.id === Number(id));


    if (!product) {
        return <h2 className='text-center text-xl'>Товар не найден</h2>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(products));
        navigate("/cart");
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 bg-white p-6 rounded-lg shadow-lg">
                {/* Изображения товара слева */}
                <div className="mb-6 lg:mb-0">
                    <div className="flex flex-wrap gap-4">
                        {Array.isArray(product.image) && product.image.length > 0? (
                            product.image.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={product.title}
                                    className="w-full h-auto rounded-lg object-cover"
                                />
                            ))
                        ) : (
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full max-h-96 object-contain rounded-lg "

                            />
                        )}
                    </div>
                </div>

                {/* Контент товара справа */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h2>

                    {/* Описание товара */}
                    <div
                        className="text-gray-700 mb-6"> {product.description}
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mb-4">{product.price} $ </p>

                    <ProductRating rating={product.rating} count={product.count} />

                    <div className="flex flex-wrap gap-4 p-3 border-2 border-gray-200 width=50 px-6 py-3">
                        <button onClick={() => dispatch(addToCart(item))} className='hover:cursor-pointer hover:scale-150 '> + </button>
                        <button onClick={() => dispatch(decreaseQuantity(item))} className='hover:cursor-pointer hover:scale-150'> - </button>
                        <button onClick={() => dispatch(removeFromCart(item))} className='hover:cursor-pointer  hover:scale-110'> Delete </button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}