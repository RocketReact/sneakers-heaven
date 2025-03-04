import { Helmet } from "react-helmet-async";
import {useNavigate} from "react-router-dom";

export default function NotFoundPage () {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col text-center mt-5 font-extralight">
            <Helmet>
                <title>Page Not Found | YourSite</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="description" content="Oops! The page you are looking for does not exist." />
                <meta property="og:title" content="404 Not Found" />
                <meta property="og:description" content="This page was not found on our website." />
            </Helmet>
            <h1 className='text-4xl'> Page Not Found </h1>
            <div>
                <button
                    className='mt-5 py-3 px-2 bg-black text-white rounded-full
                     hover:cursor-pointer hover:bg-gray-400 hover:scale-105
                     duration-200 active:scale-95'
                    onClick={() => navigate ('/shop-all')}

                >Go Shopping</button>
            </div>
        </div>
    )

}