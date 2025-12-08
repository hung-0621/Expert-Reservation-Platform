from app.extensions import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'
    booking_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    expert_id = db.Column(db.Integer, db.ForeignKey('experts.expert_id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum('pending', 'confirmed', 'cancelled'), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)