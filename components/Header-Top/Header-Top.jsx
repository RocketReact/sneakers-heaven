import './Header-Top.css';
import {FiSearch} from "react-icons/fi";
import {Link, Route, Routes} from "react-router-dom";
import Home from "../Pages/Home/Home.jsx";
import About from "../Pages/About/About.jsx";
import Man from "../Pages/Man/Man.jsx";
import Woman from "../Pages/Woman/Woman.jsx";
import ShopAll from "../Pages/Shop All/ShopAll.jsx";
import Contact from "../Pages/Contact/Contact.jsx";


const HeaderTop = () => {

    return (

        <div className="header-top">
            <nav className="container">
                <div className="center">
                    <Link to="/">
                        <img className="logo" src="../../src/img/logo.png" alt="logo" />
                    </Link>
                </div>

                <ul className="nav">
                    <li><Link to ="/"> Home </Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/man">Man</Link></li>
                    <li><Link to="/wooman">Woman</Link></li>
                    <li><Link to="/shop-all">Shop All</Link></li>

                </ul>

                <div className="png-row">

                    <FiSearch className="search" fontSize={32} alt="Search"/>
                    <img
                        className="account"
                        src="../../src/img/account.png" alt="account"/>
                    <img
                        className="cart"
                        src="../../src/img/cart.png" alt="cart"/>
                    <div className="header-top-row">
                        <Link to="">
                            <img className="burger"  src="../../src/img/burger.svg" alt="burger"/>
                        </Link>
                    </div>
                </div>
            </nav>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/man" element={<Man/>} />
                <Route path="/woman" element={<Woman />} />
                <Route path="/shop-all" element={<ShopAll/>} />

            </Routes>



        </div>
    ) ;
};

export default HeaderTop;


