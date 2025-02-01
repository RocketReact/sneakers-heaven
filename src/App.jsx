import HeaderTop from "../components/Header-Top/Header-Top.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid.jsx";
import ProductSingle from "../components/ProductSingle/ProductSingle.jsx";


function App() {

  return (
       <Router>
             <HeaderTop/>
           <Routes>
               <Route path='/' element={<ProductsGrid/>}/>
               <Route path='product/:id' element={<ProductSingle/>}/>
           </Routes>
       </Router>

  )
}

export default App
