import { useParams } from "react-router-dom";
import data from "../../src/data/data.js";

export default function ProductSingle() {
    const { slug } = useParams();

    // Проверяем localStorage на наличие выбранного товара
    const savedProduct = localStorage.getItem(slug);
    let product = savedProduct ? JSON.parse(savedProduct) : data.find(product => product.slug === slug);

    // Если товар не найден, показываем сообщение
    if (!product) {
        return <h2 className='text-center text-xl'>Товар не найден</h2>;
    }

    // Сохраняем товар в localStorage на случай его изменения
    localStorage.setItem(slug, JSON.stringify(product));

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 bg-white p-6 rounded-lg shadow-lg">
                {/* Изображения товара слева */}
                <div className="mb-6 lg:mb-0">
                    <div className="flex flex-wrap gap-4">
                        {Array.isArray(product.image) ? (
                            product.image.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={product.model}
                                    className="w-full h-auto rounded-lg object-cover"
                                />
                            ))
                        ) : (
                            <img
                                src={product.image}
                                alt={product.model}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Контент товара справа */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.model}</h2>

                    {/* Описание товара */}
                    <div
                        className="text-gray-700 mb-6"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />

                    <p className="text-2xl font-bold text-gray-900 mb-4">{product.price}</p>
                    <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}