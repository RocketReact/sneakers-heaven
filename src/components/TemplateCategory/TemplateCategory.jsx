import {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import generateProductLink from "../../generateURL/generateURL.js";
import ProductRating from "../ProductsRaiting/ProductRating.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice/cartSlice.js";
import noImage from "../../../src/assets/img/no-image.jpg";
import {fetchProducts} from "../../store/productSlice/productSlice.js";
import {Helmet} from "react-helmet-async";

/**
 * Category page component
 * Displays all products filtered by category from URL parameter
 */
export default function TemplateCategory() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);

    // SEO description for the category
    const metaDescription = `Buy ${id} in our online-store. 
                                    We offer everyday items as well as 
                                    exclusive goods with fast delivery.`

    // Fetch products if not already loaded
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // Filter products by current category from URL
    const productByCategory = products.filter((product) => String(product.category) === String(id));

    // Add product to cart with quantity of 1
    const handleAddToCart = (product) => {
        if (!product) return;

        const productWithQuantity = {
            ...product,
            quantity: 1,
            id: product.id,
        };

        dispatch(addToCart(productWithQuantity));
    };

    return (
        <>
            {/* SEO metadata */}
            <Helmet>
                <title>{id}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={`${id} - Online Store`} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://sneakerheaven/products/${id}`} />
            </Helmet>

            <div>
                <h1 className="text-3xl font-bold text-center my-6">{id}</h1>

                {/* Products grid */}
                <div className="grid grid-cols-2 gap-6
                    lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 m-6 md:m-20 ">

                    {/* Loading state */}
                    {status === 'loading' &&
                        <p className="text-center text-gray-500">Loading products...</p>
                    }

                    {/* Products or empty state */}
                    {status === 'succeeded' && productByCategory.length > 0 ? (
                        productByCategory.map((product) => (
                            <div key={product.id} className="group justify-content-center justify-items-center">
                                {/* Product details with link */}
                                <Link to={generateProductLink(product)} className="block">
                                    <img
                                        alt={product.title || "No image available"}
                                        src={Array.isArray(product.image) ? product.image[0] : product.image || noImage}
                                        className="w-full h-auto max-h-96 object-contain rounded-lg p-2"
                                    />
                                    <h3 className="text-center mt-4 font-extralight text-lg text-gray hover:underline">{product.title}</h3>
                                    <ProductRating rating={product.rating} />
                                    <p className="text-center mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
                                </Link>

                                {/* Add to cart button */}
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="inline-block cursor-pointer mt-3 px-2 py-2 md:px-6 md:py-3 text-sm md:text-lg font-medium text-red-500
                                               border border-blue-600 rounded hover:bg-blue-600 hover:text-white
                                               focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                >
                                    Add to cart
                                </button>
                            </div>
                        ))
                    ) : status === 'succeeded' ? (
                        <p className="text-center text-gray-500">No products found for this category.</p>
                    ) : status === 'failed' ? (
                        <p className='text-center text-red-500'>Failed to load products.</p>
                    ) : null}
                </div>
            </div>
        </>
    );
}