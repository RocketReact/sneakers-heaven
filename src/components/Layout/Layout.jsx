import HeaderTop from "../Header-Top/Header-Top.jsx";
import Footer from "../Footer/Footer.jsx";


export default function Layout ({children}) {
    return <div className='flex flex-col min-h-screen'>
        <HeaderTop />
        <main className='flex-grow'>
            {children}
        </main>
        <Footer/>
    </div>
}