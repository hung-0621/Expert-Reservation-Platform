import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

function Header() {
    return (
        <header>
            <Row>
                <Col lg={3} className="text-center my-3">
                    <h1>NexusLink</h1>
                </Col>
                <Col lg={6} className="text-center my-3">
                    {/* nav links here */}
                </Col>
                <Col lg={3} className="text-center my-3 gap-2 d-flex justify-content-center">
                    <Button>登入</Button>
                    <Button variant="secondary">註冊</Button>
                </Col>
            </Row>
        </header>
    )
}

export default Header;