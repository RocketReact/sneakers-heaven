import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../../src/store/productSlice/productSlice.js";


export default function ProductSingle() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const {products, status} = useSelector((state) => state.products);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const product = products.find(product => String (product.id) === id);


    if (!product) {
        return <h2 className='text-center text-xl'>Товар не найден</h2>;
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
                                className="w-full h-auto rounded-lg object-cover"
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


                    <p className="text-2xl font-bold text-gray-900 mb-4">{product.price}</p>
                    <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}