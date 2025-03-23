import "./Banner.css";
import {useNavigate} from "react-router-dom";

//Banner on Main Page

const Banner = () => {
    const navigate = useNavigate();

    return (
            <div className="banner-container">

                <div className="banner-content">
                    <h2> Buy the best running sneakers </h2>
                    <p>  We are present in Germany 10 years </p>
                    <button
                        onClick= {() => navigate('/shop-all')}
                        className="banner-button">Shop</button>
                </div>
            </div>


    );
};

export default Banner;