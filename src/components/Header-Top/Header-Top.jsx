import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import logo from "../../img/logo.png"
import burger from "../../img/burger.svg"
import ProductSearch from "../ProductSearch/ProductSearch.jsx";
import {useSelector} from "react-redux";


const HeaderTop = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    // Функция для переключения меню
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-white shadow-md">
            <nav className="container flex justify-between items-center py-4 px-6">
                {/* Логотип */}
                <div>
                    <Link to="/">
                        <img className="logo" width="40" src={logo} alt="logo" />
                    </Link>
                </div>


               <div className='md:hidden lg:flex'>
                {/* Основное меню для больших экранов */}
                <ul className="hidden md:flex space-x-8">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">ContactUs</Link></li>
                    <li><Link to="/products/men's clothing">Men</Link></li>
                    <li><Link to="/products/women's clothing">Women</Link></li>
                    <li><Link to="/products/electronics">Electronics</Link></li>
                    <li><Link to="/products/jewelery">Jewelery</Link></li>
                    <li ><Link to="/shop-all">Shop All</Link></li>
                </ul>
               </div>

                <div className="flex items-center space-x-8 relative">

                    <button onClick ={toggleSearch} className='ml-auto'>
                        <FiSearch className="text-gray-600 hover:cursor-pointer"
                                  fontSize={32} alt="Search" /> </button>
                    <div >
                    {isSearchOpen && (
                        <div className=" absolute top-12 right-0.5
                        bg-white shadow-lg p-2 rounded-md z-50
                        max-h-120 w-85 lg:w-96
">
                            <ProductSearch closeSearch={() =>
                                setIsSearchOpen(false)} />
                            </div>
                    )}
                    </div>

                    <Link to='/login'> <RiAccountCircleFill size='30' alt='Login' /> </Link>


                    <Link to='/cart'>
                        <FaShoppingCart  className='relative' size="30" alt="Cart"/>
                        {totalQuantity > 0 && (
                            <span className='
                            absolute
                            -top-0.5 right-15
                            sm:top-0 sm:right-15
                            md:-top-0.5 md:right-15
                            lg:right-6 -lg:top-1
                            bg-red-500 text-white
                            rounded-full pt-1 pb-1 pr-2 pl-2
                            text-xs font-bold

                            '>
                                {totalQuantity}

                            </span>

                        ) }

                    </Link>

                    {/* Иконка гамбургера для мобильных устройств */}
                    <button
                        onClick={toggleMenu}
                        className=" lg:hidden hover:cursor-pointer w-9 h-9 flex justify-center items-center"
                    >
                        {isMenuOpen ? (
                            <span className="absolute -top-1 right-2 text-4xl text-black hover:text-gray-600 transition-transform transform hover:scale-110">
                                &times;
                            </span>
                        ) : (
                            <img className="w-9 h-9" src={burger} alt="burger" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Мобильное меню с фиксированным положением */}
            {isMenuOpen && (
                <div className=" fixed top-16 right-0 h-[calc(100%-4rem)] w-[50vw] bg-white z-50 p-4 shadow-lg">
                    <ul className="space-y-4 text-black text-lg mt-8">
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                        <li><Link to="/contact" onClick={toggleMenu}>ContactUs</Link></li>
                        <li><Link to="/products/men's%20clothing" onClick={toggleMenu}>Man</Link></li>
                        <li><Link to="/products/women's%20clothing" onClick={toggleMenu}>Woman</Link></li>
                        <li><Link to="/shop-all" onClick={toggleMenu}>Shop All</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HeaderTop;