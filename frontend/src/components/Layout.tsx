import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style/component/Layout.css"
import { Container } from "react-bootstrap";

function Layout() {
    return (
        <Container fluid className="site-container">
            <Header />
            <main className="main-container">
                <Outlet />
            </main>
            <Footer />
        </Container>
    )
}

export default Layout;