from app.extensions import db
from app.utils.time_format import get_current_tw_time

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=get_current_tw_time, nullable=False)
    
    # relationships
    expert_profile = db.relationship('Expert', backref='user', uselist=False)
    bookings = db.relationship('Booking', backref='user', lazy=True)