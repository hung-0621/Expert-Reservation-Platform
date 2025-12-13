import { Modal, Button, Form } from 'react-bootstrap';

interface LoginModalsProps {
    showModal: boolean;
    handleClose: () => void;
}

function LoginModals({ showModal, handleClose }: LoginModalsProps) {
    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>登入</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm />
            </Modal.Body>
        </Modal>
    )
}

function LoginForm() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>密碼</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <hr></hr>
            <Button variant="primary" type="submit" >
                登入
            </Button>
        </Form>
    )
}

export default LoginModals;