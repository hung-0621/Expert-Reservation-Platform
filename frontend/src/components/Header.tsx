import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { asyncGet, asyncPost } from "../utils/fetch";
import { auth_api } from "../api/api";
import LoginModals from "../modals/LoginModals";
import RegisterModals from "../modals/RegisterModals";

function Header() {
    const navigator = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // login state
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
                    navigator('/');
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error("Error checking login status:", error);
            }
        };

        checkLoginStatus();
    } , []);

    // show login modal while user registered successfully
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
                console.error("Logout failed:", response.message);
            }
        } catch (error) {
            alert('登出過程中發生錯誤，請稍後再試。');
            console.error("Error during logout:", error);
        }
    }

    return (
        <>
            <header>
                <Row>
                    <Col lg={3} className="text-center my-3">
                        <h1>NexusLink</h1>
                    </Col>
                    <Col lg={6} className="text-center my-3">
                        {/* nav links here */}
                    </Col>
                    {(!isLoggedIn) ? (
                        <Col lg={3} className="text-center my-3 gap-2 d-flex justify-content-center">
                            <Button
                                onClick={() => setShowLoginModal(true)}
                            >登入
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => setShowRegisterModal(true)}
                            >註冊
                            </Button>
                        </Col>
                    ) : (
                        <Col lg={3} className="text-center my-3">
                            <Button
                                onClick={() => handleLogout()}
                            >登出
                            </Button>
                        </Col>
                    )}
                </Row>
            </header>

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