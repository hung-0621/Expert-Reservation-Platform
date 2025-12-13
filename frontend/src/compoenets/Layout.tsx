import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style/component/Layout.css"

function Layout() {
    return (
        <div className="site-container">
            <Header />
            <main className="main-container">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;