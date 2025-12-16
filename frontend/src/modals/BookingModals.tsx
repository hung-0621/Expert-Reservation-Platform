import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { asyncPost } from "../utils/fetch";
import { booking_api } from "../api/api";
import type { Expert } from "../interface/Expert";

interface BookingModalsProps {
    expert: Expert;
    showModal: boolean;
    handleClose: () => void;
}

interface BookingFormProps {
    expert: Expert;
    handleClose: () => void;
}

interface BookingFormData {
    expert_id: number;
    start_time: string;
    end_time: string;
}


function BookingForm({ expert, handleClose }: BookingFormProps) {

    const [formData, setFormData] = useState<BookingFormData>({
        expert_id: expert.expert_id,
        start_time: "",
        end_time: ""
    });

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Booking data:", formData);

        try {
            const response = await asyncPost(booking_api.CREATE, formData);
            if (response.code === 200) {
                alert('預約成功！');
            } else {
                alert(`預約失敗: ${response.message}`);
            }   
        } catch (error) {
            console.error("Error during booking:", error);
            alert('預約過程中發生錯誤，請稍後再試。');
        }
        handleClose();
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formStartTime">
                <Form.Label>開始時間</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleFormChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndTime">
                <Form.Label>結束時間</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleFormChange}
                    required
                />
            </Form.Group>
            <hr></hr>
            <Button variant="primary" type="submit">
                確認預約
            </Button>
        </Form>
    )
}


function BookingModals({ expert, showModal, handleClose }: BookingModalsProps) {
    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>預約專家 - {expert.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BookingForm expert={expert} handleClose={handleClose} />
            </Modal.Body>
        </Modal>
    );
}

export default BookingModals;