import { FiSearch } from "react-icons/fi";


function App() {

  return (
    <>
        <div className="header-top">
        <div className="container">
            <div className="header-top-row">
                <a href="">
                    <img className="burger"  src="../src/img/burger.svg" alt="burger"/>
                </a>
            </div>
            <div className="center">
                <a href="">
                    <img className="logo"  src="../src/img/logo.png" alt="logo"/>
                </a>
            </div>

                <ul className="nav">
                    <li><a href="">New Arrival</a></li>
                    <li><a href="">Men</a></li>
                    <li><a href="">Women</a></li>
                    <li><a href="">Kids</a></li>
                </ul>

            <div className="png-row">
                    <FiSearch size={32} alt="Search"/>
                    <img
                        className="account"
                        src="../src/img/account.png" alt="account"/>
                    <img
                        className="cart"
                         src="../src/img/cart.png" alt="cart"/>
                </div>

        </div>
        </div>

    </>
  )
}

export default App
