import HeaderTop from "../components/Header-Top/Header-Top.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSingle from "../components/ProductSingle/ProductSingle.jsx";
import Home from "../components/Pages/Home/Home.jsx";
import About from "../components/Pages/About/About.jsx";
import Contact from "../components/Pages/Contact/Contact.jsx";
import Man from "../components/Pages/Man/Man.jsx";
import Woman from "../components/Pages/Woman/Woman.jsx";
import ShopAll from "../components/Pages/Shop All/ShopAll.jsx";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid.jsx";


function App() {

  return (
       <Router>
             <HeaderTop/>

           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/man" element={<Man/>} />
               <Route path="/woman" element={<Woman />} />
               <Route path="/shop-all" element={<ProductsGrid/>} />
               <Route path="product/:slug" element={<ProductSingle/>}/>
           </Routes>
       </Router>

  )
}

export default App
