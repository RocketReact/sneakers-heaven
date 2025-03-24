import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchProductsSearch, setSearchQuery } from "../../store/searchSlice/searchSlice.js";
import generateProductLink from "../../generateURL/generateURL.js";
import { Link } from "react-router-dom";

/**
 * Search component with real-time filtering and result display
 * @param {Function} closeSearch - Function to close search dropdown
 */
export default function ProductSearch({ closeSearch }) {
    const dispatch = useDispatch();
    const { searchingItems, searchQuery, status } = useSelector((state) => state.filter);

    // Ref for tracking search component area
    const searchContainer = useRef(null);

    // Fetch search data on component load
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProductsSearch());
        }
    }, [dispatch, status]);

    // Handle search input change
    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    // Close search when clicking outside component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainer.current && !searchContainer.current.contains(event.target)) {
                closeSearch();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeSearch]);

    return (
        <div ref={searchContainer}>
            {/* Search input */}
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-1 mb-1 mt-2 border-e-emerald-300 rounded-md min-w-full"
            />

            {/* Loading state or search results */}
            {status === "loading" ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {searchingItems.length > 0 ? (
                        searchingItems.map((product) => (
                            <div key={product.id} className="border-b-blue-600 pt-1 pb-1">
                                <Link to={generateProductLink(product)} onClick={closeSearch}>
                                    <h3 className="hover:cursor-pointer hover:underline p-2 hover:bg-emerald-300 rounded-md">
                                        {product.title}
                                        <p>{product.price} $</p>
                                    </h3>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No results</p>
                    )}
                </div>
            )}
        </div>
    );
}