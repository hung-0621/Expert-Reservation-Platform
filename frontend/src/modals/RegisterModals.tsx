import { Modal, Button, Form } from 'react-bootstrap';

interface RegisterModalsProps {
    showModal: boolean;
    handleClose: () => void;
}

function RegisterModals({ showModal, handleClose }: RegisterModalsProps) {
    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>註冊</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegisterForm />
            </Modal.Body>
        </Modal>
    )
}

function RegisterForm() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>名稱</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>密碼</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>確認密碼</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <hr></hr>
            <Button variant="primary" type="submit" >
                註冊
            </Button>
        </Form>
    )
}

export default RegisterModals;