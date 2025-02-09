import {Link, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/productSlice/productSlice.js';
import ProductRating from "../ProductsRaiting/ ProductRating.jsx";
import generateProductLink from "../../generateURL/generateURL.js";
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import {addToCart} from "../../store/cart/cartSlice.js";

export default function ProductsGrid() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { products, status, error, filteredCategory } = useSelector((state) => state.products);
    const product = products.find(product => product.id === Number(id));

    const handleAddToCart = () => {
        const productWithQuantity = {...product, quantity: 1};
        dispatch(addToCart(productWithQuantity));
    }


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Failed: {error}</p>;
    if (status === 'succeeded' && products.length === 0) return <p>No products found.</p>;

    const categories = [...new Set(products.map((product) => product.category))];

    const filteredProducts = filteredCategory
        ? products.filter((product) => product.category === filteredCategory)
        : products;
    return (
        <div className="bg-white">
            <div className="m-0 gap-x-0.5 px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
                <h2 className="sr-only">Products</h2>

                <ProductFilter categories={categories}/>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group">
                            <Link to={generateProductLink(product)} className="block">
                                <img
                                    alt={product.title || 'No image available'}
                                    src={Array.isArray(product.image) ? product.image[0] : product.image|| require('../images/no-image.png')}
                                    className="w-full h-auto max-h-96 object-contain rounded-lg  p-2"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                <ProductRating rating={product.rating}/>
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
                            </Link>


                                <button
                                    onClick={handleAddToCart}
                                    className="
                                        inline-block cursor-pointer px-6 py-3 text-lg font-medium text-red-500
                                        border border-blue-600 rounded hover:bg-blue-600 hover:text-white
                                        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                >
                                    Add to cart
                                </button>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}