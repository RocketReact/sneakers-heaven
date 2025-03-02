import HeaderTop from "./components/Header-Top/Header-Top.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSingle from "./components/ProductSingle/ProductSingle.jsx";
import Home from "./components/Pages/Home/Home.jsx";
import About from "./components/Pages/About/About.jsx";
import ContactForm from "./components/Pages/ContactUs/ContactForm.jsx";
import Men from "./components/Pages/Men/Men.jsx";
import Women from "./components/Pages/Women/Women.jsx";
import Jewelery from "./components/Pages/Jewelery/Jewelery.jsx";
import Electronics from "./components/Pages/Electronics/Electronics.jsx";
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import CartPage from "./components/Cart/CartPage.jsx";
import NotFoundPage from "./components/NotFound/NotFoundPage.jsx";
import Login from "./components/Login/Login.jsx";
import ProductSearch from "./components/ProductSearch/ProductSearch.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Payment from "./components/Payment/Payment.jsx";
import {useState} from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log(isAuthenticated);
  return (
       <Router>
             <HeaderTop/>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<ContactForm/>} />
               <Route path="/products/:id" element={<Men/>} />
               <Route path="/products/:id" element={<Women/>} />
               <Route path='/products/:id' element={<Jewelery />} />
               <Route path="/products/:id" element={<Electronics/>} />
               <Route path="/shop-all" element={<AllProducts/>} />
               <Route path="/product/:id/:words?" element={<ProductSingle/>}/>
               <Route path="/products/ProductsSearch" element={<ProductSearch/>} />
               <Route path="/login" element={<Login
                   isAuthenticated ={isAuthenticated} setIsAuthenticated ={setIsAuthenticated}/>} />

               <Route path="/cart" element={<CartPage isAuthenticated={isAuthenticated}/>} />
               <Route path="/checkout" element={<Checkout/>} />
               <Route path="/payment" element={<Payment/>} />
               <Route path="*" element={<NotFoundPage />} />
           </Routes>
       </Router>

  )
}

export default App
