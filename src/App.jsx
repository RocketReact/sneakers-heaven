import HeaderTop from "../components/Header-Top/Header-Top.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSingle from "../components/ProductSingle/ProductSingle.jsx";
import Home from "../components/Pages/Home/Home.jsx";
import About from "../components/Pages/About/About.jsx";
import Contact from "../components/Pages/Contact/Contact.jsx";
import Men from "../components/Pages/Men/Men.jsx";
import Jewelery from "../components/Pages/Jewelery/Jewelery.jsx";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid.jsx";
import CartPage from "../components/Cart/CartPage.jsx";


function App() {

  return (
       <Router>
             <HeaderTop/>

           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/man" element={<Men/>} />
               <Route path="/woman" element={<Jewelery />} />
               <Route path="/shop-all" element={<ProductsGrid/>} />
               <Route path="/product/:id/:words?" element={<ProductSingle/>}/>
               <Route path="/cart" element={<CartPage/>} />
           </Routes>
       </Router>

  )
}

export default App
