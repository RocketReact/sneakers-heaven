import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

const HeaderTop = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <img className="logo" width="40" src="../../src/img/logo.png" alt="logo" />
                    </Link>
                </div>

                {/* Основное меню для больших экранов */}
                <ul className="hidden md:flex space-x-8">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/man">Man</Link></li>
                    <li><Link to="/woman">Woman</Link></li>
                    <li><Link to="/shop-all">Shop All</Link></li>
                </ul>

                <div className="flex items-center space-x-8 relative">
                    <FiSearch className="text-gray-600" fontSize={32} alt="Search" />
                    <img className="w-6 h-6" src="../../src/img/account.png" alt="account" />
                    <img className="w-6 h-6" src="../../src/img/cart.png" alt="cart" />

                    {/* Иконка гамбургера для мобильных устройств */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden hover:cursor-pointer w-9 h-9 flex justify-center items-center"
                    >
                        {isMenuOpen ? (
                            <span className="absolute -top-1 right-2 text-4xl text-black hover:text-gray-600 transition-transform transform hover:scale-110">
                                &times;
                            </span>
                        ) : (
                            <img className="w-9 h-9" src="../../src/img/burger.svg" alt="burger" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Мобильное меню с фиксированным положением */}
            {isMenuOpen && (
                <div className="md:hidden fixed top-16 right-0 h-[calc(100%-4rem)] w-[50vw] bg-white z-50 p-4 shadow-lg">
                    <ul className="space-y-4 text-black text-lg mt-8">
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                        <li><Link to="/man" onClick={toggleMenu}>Man</Link></li>
                        <li><Link to="/woman" onClick={toggleMenu}>Woman</Link></li>
                        <li><Link to="/shop-all" onClick={toggleMenu}>Shop All</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HeaderTop;