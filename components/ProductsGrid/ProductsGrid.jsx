import {Link} from 'react-router-dom'
import data from '../../src/data/data.js'


export default function ProductsGrid() {
    return (
        <div className="bg-white">
            <div className="m-0 gap-x-0.5 px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {data.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="group">
                            <img
                                alt={product.model}
                                src={product.image}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                            <button
                                onClick={() => window.location.href = 'https://example.com'}
                                className="inline-block cursor-pointer px-6 py-3 text-lg font-medium text-red-500 border-1 border-blue-600 rounded hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                            >
                                Visit Example
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}