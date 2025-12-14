import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { asyncGet, asyncPost } from '../utils/fetch';
import { auth_api } from '../api/api';

interface LoginModalsProps {
    showModal: boolean;
    handleClose: () => void;
}

interface LoginFormData {
    email: string;
    password: string;
}

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>, formData: LoginFormData) {
        event.preventDefault();

        const body = {
            ...formData
        };

        try {
            const response = await asyncPost(auth_api.LOGIN, body);
            if (response.code === 200) {
                try {
                    const meResponse = await asyncGet(auth_api.ME);
                    if (meResponse.code === 200 || meResponse.data.user) {
                        console.log("驗證 Cookie 成功，使用者資料：", meResponse);
                    } else {
                        console.error("驗證失敗：", meResponse);
                    }
                } catch (e) {
                    console.error("Cookie 驗證失敗，後端拒絕存取");
                }
            } else {
                alert(`登入失敗: ${response.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('登入過程中發生錯誤，請稍後再試。');
        }


    }

    return (
        <Form onSubmit={(e) => handleFormSubmit(e, formData)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => { handleFormChange(e, setFormData) }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>密碼</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleFormChange(e, setFormData)}
                />
            </Form.Group>
            <hr></hr>
            <Button variant="primary" type="submit" >
                登入
            </Button>
        </Form>
    )
}

// main component
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

export default LoginModals;