import "./Banner.css";
import {useState} from "react";

const Banner = () => {
    const [addPlus, setAddPlus] = useState(true)

    const isAddPlus = () => {
        setAddPlus(!addPlus)
    }
    return (
            <div className="banner-container">

                <button onClick={isAddPlus} className="plus"> + </button>

                <div className="banner-content">
                    <h2> Buy the best running sneakers </h2>
                    <p> We are present in Germany 10 years </p>
                    <button className="banner-button">Shop</button>
                </div>
            </div>


    );
};

export default Banner;