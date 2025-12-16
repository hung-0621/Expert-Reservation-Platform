import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import type { Expert } from "../interface/Expert";
import BookingModals from "../modals/BookingModals";
import "../style/component/ExpertCard.css";

interface ExpertCardProps {
    experts: Array<Expert>;
}

function ExpertCard({ experts }: ExpertCardProps) {

    const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
    const handleBooking = (expert: Expert) => {
        setSelectedExpert(expert);
    };


    if (!experts || experts.length === 0) {
        return (
            <div className="w-100 d-flex flex-column justify-content-center align-items-center text-muted" style={{ minHeight: '300px' }}>
                <h4 className="mb-3">沒有找到符合條件的專家</h4>
                <p>請嘗試調整您的搜尋條件或篩選器</p>
            </div>
        );
    }

    return (
        <div className="expert-card-container">
            {experts.map((expert, index) => (
                <Card key={expert.expert_id || index} className="expert-card">
                    <div className="expert-card-img-wrapper">
                        <Card.Img
                            variant="top"
                            src={expert.image_url}
                            className="expert-card-img"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=No+Image';
                            }}
                        />
                    </div>
                    <Card.Body className="expert-card-body">
                        <div className="expert-card-header">
                            <Card.Title className="expert-name">{expert.name}</Card.Title>
                            <span className="expert-category">{expert.category}</span>
                        </div>

                        <Card.Text className="expert-bio">
                            {expert.bio}
                        </Card.Text>

                        <div className="expert-card-footer">
                            <div className="expert-rate">
                                <span className="rate-label">時薪</span>
                                <span className="rate-value">${expert.hourly_rate}</span>
                            </div>
                            <Button className="book-btn" onClick={() => handleBooking(expert)}>立即預約</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            {selectedExpert &&
                <BookingModals
                    expert={selectedExpert}
                    showModal={true}
                    handleClose={() => setSelectedExpert(null)}
                />
            }
        </div>
    )
}

export default ExpertCard;