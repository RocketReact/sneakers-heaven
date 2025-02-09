import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProductsSearch, setSearchQuery} from "../../store/searchSlice/searchSlice.js";
import generateProductLink from "../../generateURL/generateURL.js";
import {Link} from "react-router-dom";


export default function ProductSearch({closeSearch}) {
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
        <input type="text"
               placeholder="Search..."
               value={searchQuery}
               onChange={handleSearch}
               className='p-1 mb-1 mt-2 border-e-emerald-300 rounded-md min-w-full'
        />

        {status === "loading"? (
            <p> Loading...</p>
        ) : (
            <div>
                {searchingItems.length > 0 ? (
                    searchingItems.map((product) => (
                        <div key={product.id} className="border-b-blue-600 pt-1 pb-1">

                             <Link to={generateProductLink (product)}
                                   onClick={closeSearch}>
                                 <h3
                                     className='hover:cursor-pointer,
                                     hover:underline'>{product.title}
                                 </h3> </Link>
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
