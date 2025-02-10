import {useDispatch, useSelector} from 'react-redux';
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import TemplateProductCategory from "../TemplateCategory/TemplateCategory.jsx";
import {useEffect} from "react";
import {fetchProducts} from "../../store/productSlice/productSlice.js";


export default function ProductsGrid() {
    const dispatch = useDispatch();
    const { products, status, error, filteredCategory } = useSelector((state) => state.products);

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
                    {filteredProducts?.map((product) => (
                        <TemplateProductCategory/>
                    ))}
            </div>
        </div>
    );
}