import { useEffect, useState } from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { asyncGet, asyncPost } from "../utils/fetch";
import { auth_api } from "../api/api";
import LoginModals from "../modals/LoginModals";
import RegisterModals from "../modals/RegisterModals";
import "../style/component/Header.css"; // 引入樣式

function Header() {
    const navigator = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await asyncGet(auth_api.ME, {});
                if (response.code === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    localStorage.removeItem('access_token_cookie');
                    localStorage.removeItem('csrf_access_token');
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error("Error checking login status:", error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleRegisterSuccess = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    const handleLogout = async () => {
        try {
            const response = await asyncPost(auth_api.LOGOUT, {});
            if (response.code === 200) {
                localStorage.removeItem('access_token_cookie');
                localStorage.removeItem('csrf_access_token');
                setIsLoggedIn(false);
                alert('已登出');
                navigator('/');
            } else {
                alert(`登出失敗: ${response.message}`);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }
    return (
        <>
            <Navbar className="header-section" bg="light" data-bs-theme="light">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="/">
                        <h3 className="brand-logo">NexusLink</h3>
                    </Navbar.Brand>

                    {(isLoggedIn) ? (
                        <Nav className="d-none d-md-flex gap-4">
                            <Nav.Link href="/expert"><span className="nav-font">專家列表</span></Nav.Link>
                            <Nav.Link href="/category"><span className="nav-font">平台介紹</span></Nav.Link>
                            <Nav.Link href="/about-zzy"><span className="nav-font">關於子儀</span></Nav.Link>
                        </Nav>) : (
                        <Nav className="d-none d-md-flex gap-4" />
                    )}

                    <Nav className="d-flex gap-3 align-items-center">
                        {(!isLoggedIn) ? (
                            <div className="d-flex gap-2">
                                <Button
                                    className="header-btn btn-login"
                                    onClick={() => setShowLoginModal(true)}
                                >
                                    登入
                                </Button>

                                <Button
                                    className="header-btn btn-register"
                                    onClick={() => setShowRegisterModal(true)}
                                >
                                    註冊
                                </Button>
                            </div>
                        ) : (
                            <Button
                                className="header-btn btn-logout"
                                onClick={() => handleLogout()}
                            >
                                登出
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <LoginModals
                showModal={showLoginModal}
                handleClose={() => setShowLoginModal(false)}
                setIsLoggedIn={setIsLoggedIn}
            />

            <RegisterModals
                showModal={showRegisterModal}
                handleClose={() => setShowRegisterModal(false)}
                onRegisterSuccess={handleRegisterSuccess}
            />
        </>
    )
}

export default Header;