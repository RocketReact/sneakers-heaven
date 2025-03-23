import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

/**
 * Call-to-action button with periodic shake animation
 * Navigates to cart on click
 */
export default function BuyNowShakingBtn() {
    // Track animation state
    const [isShaking, setIsShaking] = useState(false);
    const navigate = useNavigate();

    // Set up recurring shake animation every 2 seconds
    useEffect(() => {
        const startShaking = () => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 300)
        };

        startShaking(); // Initial animation
        const interval = setInterval(startShaking, 2000)

        // Clean up interval on unmount
        return () => clearInterval(interval)
    }, []);

    return (
        <button
            className={`w-full px-6 py-3 text-white
                      bg-blue-600 rounded-lg hover:bg-blue-700
                      hover:cursor-pointer hover:scale-105
                      duration-200 active:scale-95 transition ${isShaking ? "animate-shake" : ""}`}
            onClick={() => navigate("/cart")}
        >
            Buy now
        </button>
    )
}