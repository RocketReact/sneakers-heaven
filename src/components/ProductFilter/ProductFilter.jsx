import {useDispatch, useSelector} from "react-redux";
import {setCategoryFilter} from "../../store/productSlice/productSlice.js";

/**
 * Category filter dropdown component
 * @param {string[]} categories - Available product categories
 */
export default function ProductFilter({categories}) {
    const dispatch = useDispatch();
    // Get currently selected category from Redux store
    const selectedCategory = useSelector((state) => state.products.filteredCategory)

    // Update filter when selection changes
    const handleFilterChangeCategory = (e) => {
        dispatch(setCategoryFilter(e.target.value));
    }

    return (
        <div className='mb-4'>
            <label className='block text-xl font-medium
            text-gray-700'> Filter by Category</label>
            <select
                value={selectedCategory || ''}
                onChange={handleFilterChangeCategory}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'>

                {/* Default option shows all products */}
                <option value=''> All Category </option>

                {/* Map through available categories */}
                {categories.map(category => (
                    <option key={category} value={category}> {category}</option>
                ))}
            </select>
        </div>
    );
};