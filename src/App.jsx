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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HelmetProvider} from "react-helmet-async";
import Notification from "./components/Notification/Notification.jsx";
import Layout from "./components/Layout/Layout.jsx";

/**
 * Main application component with routing configuration
 */
export default function App() {
    // Authentication state for login/protected features
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <HelmetProvider>
            <Router>
                {/* Global notifications listener */}
                <Notification/>

                <Layout>

                {/* Application routes */}
                <Routes>
                    {/* Main pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactForm/>} />

                    {/* Category pages - note: all use the same URL pattern */}
                    <Route path="/products/:id" element={<Men/>} />
                    <Route path="/products/:id" element={<Women/>} />
                    <Route path='/products/:id' element={<Jewelery />} />
                    <Route path="/products/:id" element={<Electronics/>} />

                    {/* Product pages */}
                    <Route path="/shop-all" element={<AllProducts/>} />
                    <Route path="/product/:id/:words?" element={<ProductSingle/>}/>
                    <Route path="/products/ProductsSearch" element={<ProductSearch/>} />

                    {/* User account pages */}
                    <Route path="/login" element={<Login
                        isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />

                    {/* Checkout flow */}
                    <Route path="/cart" element={<CartPage isAuthenticated={isAuthenticated}/>} />
                    <Route path="/checkout" element={<Checkout/>} />
                    <Route path="/payment" element={<Payment/>} />

                    {/* Fallback for unknown routes */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                </Layout>

                {/* Toast notifications container */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Router>
        </HelmetProvider>
    )
}
