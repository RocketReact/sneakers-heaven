import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/productSlice/productSlice.js";
import ProductRating from "../ProductsRaiting/ProductRating.jsx";
import { addToCart, decreaseQuantity, removeFromCart } from "../../store/cartSlice/cartSlice.js";
import noImage from "../../../src/assets/img/no-image.jpg";
import {Helmet} from "react-helmet-async";
import generateProductLink from "../../generateURL/generateURL.js";
import BuyNowShakingBtn from "./BuyNowShakingBtn";

/**
 * Product detail page component
 * Displays single product information and cart controls
 */
export default function ProductSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Find current product and cart quantities
    const product = products.find((product) => product.id === Number(id));
    const productInCart = cartItems.find((item) => item.id === product?.id);
    const productQuantity = productInCart ? productInCart.quantity : 0;

    // Fetch products if not already loaded
    useEffect(() => {
        if (status === "idle" && products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [status, products.length, dispatch]);

    // Cart item quantity handlers
    const handleIncreaseQuantity = () => {
        if (product) {
            dispatch(addToCart({...product, quantity: 1}));
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

    // Loading and error states
    if (status === "loading") {
        return <h2 className="text-center text-xl">Loading...</h2>;
    }

    if (!product) {
        return <h2 className="text-center text-xl">Product not found</h2>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* SEO metadata */}
            <Helmet>
                <title>{product ? product.title : "Product not found"}</title>
                <meta name="description" content={product.description?.substring(0, 160) || "No description available."}/>
                <meta property="og:title" content={product.title || "Product"} />
                <meta property="og:description" content={product.description || "There is no description for this product."} />
                <meta property="og:image" content={Array.isArray(product.image) ? product.image[0] : product.image || noImage} />
                <meta property="og:image:alt" content={product.title} />
                <meta property="og:url" content={generateProductLink(product)} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product.title || "Product"} />
                <meta name="twitter:description" content={product.description || "There is no description for this product."} />
                <meta name="twitter:image" content={Array.isArray(product.image) ? product.image[0] : product.image || noImage} />
            </Helmet>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12
            bg-white p-6 rounded-lg shadow-lg
            ">
                {/* Product images gallery */}
                <div className=" mb-6 lg:mb-0 ">
                    <div className="flex gap-4 ">
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

                {/* Product details section */}
                <div className='m-7 text-left '>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {product.title || "No title"}
                    </h2>

                    {/* Product description */}
                    <div className="text-gray-700 mb-6">{product.description || "No descriptions"}</div>

                    <p className="text-2xl font-bold text-gray-900 mb-4">
                        {product.price?.toFixed(2)} $
                    </p>

                    <ProductRating rating={product.rating} count={product.count} mainRatingDiv='items-left' />

                    <div className="mb-3 mt-3 mr-3"> Quantity </div>

                    {/* Quantity controls */}
                    <div className="
                    flex flex-row gap-4 border-2 items-center justify-center
                    border-gray-200 max-w-50  py-2 mb-3 rounded-full">
                        <button
                            onClick={handleIncreaseQuantity}
                            className="btn "
                        >
                            +
                        </button>

                        <p>{productQuantity || 0}</p>

                        <button
                            onClick={handleDecreaseQuantity}
                            className="btn"
                            disabled={!productInCart || productQuantity <= 1}
                        >
                            -
                        </button>

                        <button
                            onClick={handleRemoveFromCart}
                            className="text-md btnDelete"
                            disabled={!productInCart}
                        >
                            Delete
                        </button>
                    </div>

                    {/* Call-to-action button */}
                    <BuyNowShakingBtn/>
                </div>
            </div>
        </div>
    );
}