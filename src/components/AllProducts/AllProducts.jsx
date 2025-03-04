import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import { fetchProducts } from "../../store/productSlice/productSlice.js";
import { Link, useNavigate } from "react-router-dom";
import generateProductLink from "../../generateURL/generateURL.js";
import noImage from "../../img/no-image.jpg";
import ProductRating from "../ProductsRaiting/ ProductRating.jsx";
import { addToCart } from "../../store/cart/cartSlice.js";

export default function AllProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, status, error, filteredCategory } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Состояние для управления номером текущей страницы
    const [currentPage, setCurrentPage] = useState(1);

    // Количество товаров на одной странице
    const itemsPerPage = 12;

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Failed: {error}</p>;
    if (status === "succeeded" && products.length === 0) return <p>No products found.</p>;

    // Фильтрация продуктов по категории
    const categories = [...new Set(products.map((product) => product.category))];
    const filteredProducts = filteredCategory
        ? products.filter((product) => product.category === filteredCategory)
        : products;

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Вычисляем, какие товары показывать на текущей странице
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage, // начальный индекс
        currentPage * itemsPerPage        // конечный индекс
    );

    // Логика для обработки добавления товара в корзину
    const handleRedirect = (product) => {
        const productInCart = cartItems.find((item) => item.id === product.id);
        !productInCart
            ? dispatch(addToCart({ ...product, quantity: 1 }))
            : dispatch(addToCart({ ...productInCart, quantity: productInCart.quantity + 1 }));

        navigate("/cart"); // Перенаправляем на страницу корзины
    };

    // Функция для переключения страниц
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Устанавливаем текущую страницу
    };

    return (
        <div className="text-1xl text-center m-7 lg:mr-20 lg:ml-20 xl:mr-20 xl:ml-20 ">
            {/* Панель фильтров */}
            <ProductFilter categories={categories} />

            {/* Сетка товаров */}
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 lg:m-20 xl:m20">
                <h2 className="sr-only">Products</h2>
                {currentProducts.map((product) => (
                    <div key={product.id} className="group">
                        <Link to={generateProductLink(product)} className="block">
                            <img
                                alt={product.title || "No image available"}
                                src={Array.isArray(product.image) ? product.image[0] : product.image || noImage}
                                className="w-full h-auto max-h-96 object-contain rounded-lg p-2"
                            />
                            <h3 className="mt-4 text-sm text-gray-700 hover:underline">{product.title}</h3>
                            <ProductRating rating={product.rating} />
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
                        </Link>
                        <button
                            onClick={() => handleRedirect(product)}
                            className="inline-block cursor-pointer px-4 py-2 mt-2 text-lg font-medium text-red-500
                                       border border-blue-600 rounded hover:bg-blue-600 hover:text-white
                                       focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Постраничная навигация */}
            <div className="pagination-controls flex justify-center items-center space-x-2 mt-8 ">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="hover:cursor-pointer hover:scale-104 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                {/* Отображение номеров страниц */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`hover:cursor-pointer hover:scale-104 px-3 py-1 rounded ${
                            currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "border bg-gray-100 text-gray-600"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="hover:cursor-pointer hover:scale-104 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}