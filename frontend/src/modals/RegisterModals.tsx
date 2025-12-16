import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { auth_api } from '../api/api';
import { asyncPost } from '../utils/fetch';

interface RegisterModalsProps {
    showModal: boolean;
    handleClose: () => void;
    onRegisterSuccess: () => void;
}

interface RegisterFormProps {
    onRegisterSuccess: () => void;
    handleClose: () => void;
}

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function RegisterForm({ onRegisterSuccess, handleClose }: RegisterFormProps) {

    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>, formData: RegisterFormData) {
        event.preventDefault();

        const body = {
            ...formData
        };

        try {
            const response = await asyncPost(auth_api.REGISTER, body)
            if (response.code === 200) {
                alert('註冊成功，請登入！');
                onRegisterSuccess();
                handleClose();
            } else {
                alert(`註冊失敗: ${response.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('註冊過程中發生錯誤，請稍後再試。');
        }
    }

    return (
        <Form onSubmit={(event) => handleFormSubmit(event, formData)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>名稱</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="請輸入名稱"
                    name="name"
                    value={formData.name}
                    onChange={(event) => handleFormChange(event, setFormData)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>電子郵件</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="請輸入電子郵件"
                    name="email"
                    value={formData.email}
                    onChange={(event) => handleFormChange(event, setFormData)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>密碼</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="請輸入密碼"
                    name="password"
                    value={formData.password}
                    onChange={(event) => handleFormChange(event, setFormData)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>確認密碼</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="請再次輸入密碼"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(event) => handleFormChange(event, setFormData)}
                    required
                />
            </Form.Group>
            <hr></hr>
            <Button variant="primary" type="submit" >
                註冊
            </Button>
        </Form>
    )
}

function RegisterModals({ showModal, handleClose, onRegisterSuccess }: RegisterModalsProps) {
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
                <RegisterForm
                    onRegisterSuccess={onRegisterSuccess}
                    handleClose={handleClose}
                />
            </Modal.Body>
        </Modal>
    )
}

export default RegisterModals;