import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProductsSearch, setSearchQuery} from "../../store/searchSlice/searchSlice.js";

export default function ProductSearch() {
    const dispatch = useDispatch();
    const {searchingItems, searchQuery, status} =
        useSelector ((state) => state.filter);


useEffect(() => {
    if (status === "idle") {
        dispatch(fetchProductsSearch());
    }
}, [dispatch, status]);

const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
}

return (
    <div>
        <h1> Searching Results </h1>

        <input type="text"
               placeholder="Search..."
               value={searchQuery}
               onChange={handleSearch}
               className='p-1 mb-1 border-e-emerald-300 rounded-md min-w-full'
        />

        {status === "loading"? (
            <p> Loading...</p>
        ) : (
            <div>
                {searchingItems.length > 0 ? (
                    searchingItems.map((product) => (
                        <div key={product.id} className="border-b-blue-600 pt-1 pb-1">
                            <h3>{product.title}</h3>
                            <p>{product.price} $ </p>
                        ></div>
                    ))
                ): (
                    <p> No results </p>
                )}
            </div>
        )}
    </div>
)
}
