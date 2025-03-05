import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

    export default function BuyNowShakingBtn () {
    const [isShaking, setIsShaking] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const startShaking = () => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 300)

        };
        startShaking();
        const interval = setInterval(startShaking, 6000)
        return () => clearInterval(interval)

    },[]);

    return (
        <button

            className={`w-full px-6 py-3 text-white
                        bg-blue-600 rounded-lg hover:bg-blue-700
                        transition hover:cursor-pointer hover:scale-105
                        duration-200 active:scale-95 ${isShaking ? "animate-shake" : ""}`}
            onClick={() => navigate ("/cart")}
        >
            Buy now
        </button>
    )

    }


