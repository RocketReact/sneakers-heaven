import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../src/store/productSlice/productSlice.js';

export default function ProductsGrid() {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Failed: {error}</p>;
    if (status === 'succeeded' && products.length === 0) return <p>No products found.</p>;

    return (
        <div className="bg-white">
            <div className="m-0 gap-x-0.5 px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <Link to={`/product/${product.id}`} className="block">
                                <img
                                    alt={product.title}
                                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
                            </Link>

                            {/* Кнопка для внешнего сайта */}
                            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                                <button
                                    className="
                                        inline-block cursor-pointer px-6 py-3 text-lg font-medium text-red-500
                                        border border-blue-600 rounded hover:bg-blue-600 hover:text-white
                                        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                >
                                    Visit Example
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}