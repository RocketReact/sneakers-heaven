import {useParams} from "react-router-dom";
import data from "../../src/data/data.js"

export default function ProductSingle() {
    const {id} = useParams();
    const product = data.find(product => product.id ===id);

    if (!product) {
        return <h2 className='text-center text-xl'>Товар не найден</h2>
    }
    return (
        <div className='container mx-auto px-4 py-12'>
            <div className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg'>
                <img src={product.image} alt={product.model} className='w-full rounded-lg'/>
                <h2 className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg'>{product.brand}</h2>
                <p className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg'>{product.price}</p>
                <p></p>

                <div className="mt-4">
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
                <button className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                    Добавить в корзину
                </button>

            </div>



        </div>
    );
}

