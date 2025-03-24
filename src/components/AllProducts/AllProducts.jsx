import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import { fetchProducts } from "../../store/productSlice/productSlice.js";
import { Link, useNavigate } from "react-router-dom";
import generateProductLink from "../../generateURL/generateURL.js";
import noImage from "../../../src/assets/img/no-image.jpg";
import ProductRating from "../ProductsRaiting/ProductRating.jsx";
import { addToCart } from "../../store/cartSlice/cartSlice.js";

/**
 * AllProducts component - Displays product catalog with filtering and pagination
 * Fetches products from the store, handles category filtering and pagination
 * Allows adding products to cart and navigating to product details
 */
export default function AllProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, status, error, filteredCategory } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Current page state for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Number of products to display per page
    const itemsPerPage = 12;

    // Fetch products on component mount if not already loaded
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // Reset to first page when category filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredCategory]);

    // Handle different loading states
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Failed: {error}</p>;
    if (status === "succeeded" && products.length === 0) return <p>No products found.</p>;

    // Extract unique categories and filter products by selected category
    const categories = [...new Set(products.map((product) => product.category))];
    const filteredProducts = filteredCategory
        ? products.filter((product) => product.category === filteredCategory)
        : products;

    // Calculate total number of pages based on filtered products
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Get products for current page
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    /**
     * Handle adding product to cart and navigate to cart page
     * If product already exists in cart, increment quantity
     */
    const handleRedirect = (product) => {
        const productInCart = cartItems.find((item) => item.id === product.id);

        // Dispatch action and then navigate after it's processed
        const action = !productInCart
            ? dispatch(addToCart({ ...product, quantity: 1 }))
            : dispatch(addToCart({ ...productInCart, quantity: productInCart.quantity + 1 }));

        // For async action creators, you can use Promise.then()
        if (action.then) {
            action.then(() => navigate("/cart"));
        } else {
            navigate("/cart");
        }
    };

    // Update current page when user clicks on pagination controls
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="text-xl text-center m-7 lg:mx-20">
            {/* Product filter panel */}
            <ProductFilter categories={categories} />

            {/* Product grid layout */}
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 lg:m-20 xl:m-20">
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
                            {/* Pass a default rating if product.rating is undefined */}
                            <ProductRating rating={product.rating || {}} />
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
                        </Link>
                        <button
                            onClick={() => handleRedirect(product)}
                            className="inline-block cursor-pointer mt-3 px-2 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium text-red-500
                                       border border-blue-600 rounded hover:bg-blue-600 hover:text-white
                                       focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination controls - only show if there are products */}
            {totalPages > 0 && (
                <div className="flex justify-center items-center space-x-2 mt-8 ">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="hover:cursor-pointer hover:scale-105 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {/* Page number buttons */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`hover:cursor-pointer hover:scale-105 px-3 py-1 rounded ${
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
                        className="hover:cursor-pointer hover:scale-105 px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}