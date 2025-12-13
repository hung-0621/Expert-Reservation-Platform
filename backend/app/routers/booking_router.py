from datetime import timedelta, timezone, datetime
from flask import Blueprint, request, jsonify, make_response
from app.extensions import db
from app.models.user_model import User
from app.models.expert_model import Expert
from app.models.booking_model import Booking
from app.config import Config
from app.utils.auth_user import get_auth_user
from app.utils.time_format import validate_isoformat

booking_bp = Blueprint('booking', __name__, url_prefix='/api/booking')

@booking_bp.route('/create', methods=['POST'])
def create_booking():
    try:
        user, error, status_code = get_auth_user()
        if error:
            return error, status_code
        
        request_data = request.get_json()
        user_id = user.user_id
        expert_id = request_data.get('expert_id')
        start_time = request_data.get('start_time')
        end_time = request_data.get('end_time')
        
        if expert_id is None or start_time is None or end_time is None:
            return jsonify({"message": "BadRequest: Missing required fields"}), 400
        
        expert = Expert.query.get(expert_id)
        if not expert:
            return jsonify({"message": "BadRequest: Expert not found"}), 400
        
        if expert.user_id == user_id:
            return jsonify({"message": "BadRequest: Cannot book yourself as an expert"}), 400
        
        if not isinstance(start_time, str) or not isinstance(end_time, str):
                return jsonify({"message": "BadRequest: Time fields must be strings"}), 400
            
        # time format validation
        start_time = datetime.fromisoformat(start_time)
        end_time = datetime.fromisoformat(end_time)
        
        if not validate_isoformat(start_time) or not validate_isoformat(end_time):
            return jsonify({"message": "BadRequest: Invalid time format"}), 400
        
        if start_time >= end_time:
            return jsonify({"message": "BadRequest: Invalid time range"}), 400
        
        time_zone_utc_plus_8 = timezone(timedelta(hours=8))
        date_time_aware = datetime.now(time_zone_utc_plus_8)
        
        new_booking = Booking(
            user_id=user_id,
            expert_id=expert_id,
            start_time=start_time,
            end_time=end_time,
            status='pending',
            created_at=date_time_aware
        )
        
        db.session.add(new_booking)
        db.session.commit()
        
        return jsonify({"message": "Booking created successfully"}), 200
        
    except Exception as e:
        print(f"Error in create_booking: {e}")
        return jsonify({"message": "ServerError: Booking creation failed"}), 500
    
@booking_bp.route('/view', methods=['GET'])
def view_booking():
    try:
        user, error, status_code = get_auth_user()
        if error:
            return error, status_code
        
        bookings = Booking.query.filter_by(user_id=user.user_id).all()
        booking_list = []
        for booking in bookings:
            booking_list.append({
                "booking_id": booking.booking_id,
                "expert_id": booking.expert_id,
                "start_time": booking.start_time.isoformat(),
                "end_time": booking.end_time.isoformat(),
                "status": booking.status,
                "created_at": booking.created_at.isoformat()
            })
        
        return jsonify({"bookings": booking_list}), 200
    except Exception as e:
        print(f"Error in view_booking: {e}")
        return jsonify({"message": "ServerError: Booking retrieval failed"}), 500
    
@booking_bp.route('/cancel', methods=['DELETE'])
def cancel_booking():
    try:
        user, error, status_code = get_auth_user()
        if error:
            return error, status_code
        
        request_data = request.get_json()
        booking_id = request_data.get('booking_id')
        if booking_id is None:
            return jsonify({"message": "BadRequest: Missing booking_id"}), 400
        
        booking = Booking.query.filter_by(booking_id=booking_id, user_id=user.user_id).first()
        if not booking:
            return jsonify({"message": "BadRequest: Booking not found"}), 400
        
        db.session.delete(booking)
        db.session.commit()
        
        return jsonify({"message": "Booking cancelled successfully"}), 200
    except Exception as e:
        print(f"Error in cancel_booking: {e}")
        return jsonify({"message": "ServerError: Booking cancellation failed"}), 500