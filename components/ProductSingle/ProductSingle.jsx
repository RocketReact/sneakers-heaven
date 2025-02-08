import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../src/store/productSlice/productSlice.js";
import ProductRating from "../ProductsRaiting/ ProductRating.jsx";
import { addToCart, decreaseQuantity, removeFromCart } from "../../src/store/cart/cartSlice.js";
import noImage from "../../src/img/no-image.jpg";

export default function ProductSingle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.cartItems);

    const product = products.find((product) => product.id === Number(id));
    const productInCart = cartItems.find((item) => item.id === product?.id);
    const productQuantity = productInCart ? productInCart.quantity : 1;

    // Загружаем список продуктов
    useEffect(() => {
        if (status === "idle" && products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [status, products.length, dispatch]);

    // Функции для изменений количества товара в корзине
    const handleIncreaseQuantity = () => {
        if (product) {
            dispatch(addToCart({ ...product, quantity: 1 })); // Увеличиваем количество товара
        }
    };

    const handleDecreaseQuantity = () => {
        if (product && productInCart && productQuantity > 1) {
            dispatch(decreaseQuantity(product.id));
        }
    };

    const handleRemoveFromCart = () => {
        if (product && productInCart) {
            dispatch(removeFromCart(product.id));
        }
    };

    // Логика обработки кнопки "Купить"
    const handleRedirect = () => {
        if (!productInCart) {
            dispatch(addToCart({ ...product, quantity: 1 })); // Добавляем товар в корзину, если его там ещё нет
        }
        navigate("/cart"); // Перенаправляем на страницу корзины
    };

    if (status === "loading") {
        return <h2 className="text-center text-xl">Loading...</h2>;
    }

    if (!product) {
        return <h2 className="text-center text-xl">Товар не найден</h2>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6 lg:mb-0">
                    <div className="flex flex-wrap gap-4">
                        {Array.isArray(product.image) && product.image.length ? (
                            product.image.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={product.title || "Product image"}
                                    className="w-full h-auto rounded-lg object-cover"
                                />
                            ))
                        ) : (
                            <img
                                src={product.image || noImage}
                                alt={product.title || "Product image"}
                                className="w-full max-h-96 object-contain rounded-lg"
                            />
                        )}
                    </div>
                </div>

                {/* Контент товара */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {product.title || "No title"}
                    </h2>

                    {/* Описание товара */}
                    <div className="text-gray-700 mb-6">{product.description || "No descriptions"}</div>

                    <p className="text-2xl font-bold text-gray-900 mb-4">
                        {product.price?.toFixed(2)} $
                    </p>

                    <ProductRating rating={product.rating} count={product.count} />

                    <div className="mb-3 mt-3 mr-3"> Quantity </div>

                    <div className="flex flex-wrap gap-4 pr-1 border-2 border-gray-200 max-w-50 px-6 py-3 mb-3">
                        <button
                            onClick={handleIncreaseQuantity}
                            className="hover:cursor-pointer hover:scale-150"
                        >
                            +
                        </button>

                        <p>{productQuantity}</p>

                        <button
                            onClick={handleDecreaseQuantity}
                            className="hover:cursor-pointer hover:scale-150"
                            disabled={!productInCart || productQuantity <= 1}
                        >
                            -
                        </button>

                        <button
                            onClick={handleRemoveFromCart}
                            className="hover:cursor-pointer hover:scale-150"
                            disabled={!productInCart}
                        >
                            Delete
                        </button>
                    </div>

                    <button
                        onClick={handleRedirect}
                        className="min-w-50 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
                    >
                        Купить
                    </button>
                </div>
            </div>
        </div>
    );
}