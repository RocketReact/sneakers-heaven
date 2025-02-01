import './Header-Top.css';
import {FiSearch} from "react-icons/fi";
import {Link} from "react-router-dom";



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
                    <li><Link to="/woman">Woman</Link></li>
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

        </div>
    ) ;
};

export default HeaderTop;


