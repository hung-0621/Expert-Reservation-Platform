from app.extensions import db

class Expert(db.Model):
    __tablename__ = 'experts'
    expert_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), unique=True, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.Text)
    hourly_rate = db.Column(db.Numeric(10, 2), nullable=False)
    image_name = db.Column(db.String(500))
    
    bookings = db.relationship('Booking', backref='expert', lazy=True)