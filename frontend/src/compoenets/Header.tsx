import { useState } from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import RegisterModals from "../modals/RegisterModals";
import LoginModals from "../modals/LoginModals";

function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

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
                </Row>
            </header>

            <LoginModals
                showModal={showLoginModal}
                handleClose={() => setShowLoginModal(false)}
            />

            <RegisterModals
                showModal={showRegisterModal}
                handleClose={() => setShowRegisterModal(false)}
            />
        </>
    )
}

export default Header;