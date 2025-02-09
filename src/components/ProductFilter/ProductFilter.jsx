import {useDispatch, useSelector} from "react-redux";
import {setCategoryFilter} from "../../store/productSlice/productSlice.js";

export default function ProductFilter  ({categories}) {
    const dispatch = useDispatch();
    const selectedCategory = useSelector ((state) => state.products.filteredCategory)

    const handleFilterChangeCategory = (e) => {
        dispatch(setCategoryFilter(e.target.value));
    }

    return (
        <div className='mb-4'>
            <label className='block text-sm font-medium
            text-gray-700'> Filter by Category</label>
            <select
                value={selectedCategory}
                onChange={handleFilterChangeCategory}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'>

                <option value=''> All Category </option>
                {categories.map(category => (
                    <option key={category} value={category}> {category}</option>
                ))}


            </select>

        </div>
    );
};

