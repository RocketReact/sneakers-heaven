import HeaderTop from "./components/Header-Top/Header-Top.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSingle from "./components/ProductSingle/ProductSingle.jsx";
import Home from "./components/Pages/Home/Home.jsx";
import About from "./components/Pages/About/About.jsx";
import Contact from "./components/Pages/Contact/Contact.jsx";
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
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
function App() {

  return (
       <Router>
             <HeaderTop/>

           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/products/:id" element={<Men/>} />
               <Route path="/products/:id" element={<Women/>} />
               <Route path='/products/:id' element={<Jewelery />} />
               <Route path="/products/:id" element={<Electronics/>} />
               <Route path="/shop-all" element={<AllProducts/>} />
               <Route path="/product/:id/:words?" element={<ProductSingle/>}/>
               <Route path="/products/ProductsSearch" element={<ProductSearch/>} />
               <Route path='/register' element={<RegisterForm />} />
               <Route path="/login" element={<Login/>} />
               <Route path="/cart" element={<CartPage/>} />
               <Route path="/checkout" element={<Checkout/>} />
               <Route path="*" element={<NotFoundPage />} />


           </Routes>
       </Router>

  )
}

export default App
