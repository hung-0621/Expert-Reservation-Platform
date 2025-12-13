from flask import Blueprint, request, jsonify, make_response
from app.extensions import db
from app.models.user_model import User
from app.config import Config
from app.models.expert_model import Expert
from app.utils.auth_user import get_auth_user

expert_bp = Blueprint('expert', __name__, url_prefix='/api/expert')
avatars_folder = Config.AVATARS_FOLDER

# list all experts
@expert_bp.route('/list', methods=['GET'])
def list_experts():
    try:
        user, error, status_code = get_auth_user()
        if error:
            return error, status_code
        
        experts = Expert.query.all()
        experts_list = []
        for expert in experts:
            expert_data = {
                "expert_id": expert.expert_id,
                "user_id": expert.user_id,
                "category": expert.category,
                "bio": expert.bio,
                "hourly_rate": expert.hourly_rate,
                "image_url": expert.image_name
            }
            experts_list.append(expert_data)
        
        return jsonify({"experts": experts_list}), 200
    
    except Exception as e:
        print(f"Error in list_experts: {e}")
        return jsonify({"message": "ServerError: Unable to retrieve experts"}), 500

# get expert details by expert_id
@expert_bp.route('/<expert_id>', methods=['GET'])
def get_expert(expert_id):
    try:    
        user, error, status_code = get_auth_user()
        if error:
            return error, status_code
        
        expert = Expert.query.get(expert_id)
        if not expert:
            return jsonify({"message": "NotFound: Expert not found"}), 404
        
        expert_data = {
            "expert_id": expert.expert_id,
            "user_id": expert.user_id,
            "category": expert.category,
            "bio": expert.bio,
            "hourly_rate": expert.hourly_rate,
            "image_url": expert.image_name
        }
        
        return jsonify({"expert": expert_data}), 200
        
    except Exception as e:
        print(f"Error in get_expert: {e}")
        return jsonify({"message": "ServerError: Unable to retrieve expert details"}), 500

# user applies to become an expert
@expert_bp.route('/apply_to_expert', methods=['POST'])
def apply_to_expert():
    try:
        user, error, status_code = get_auth_user()
        if error:
            return error, status_code
        
        user_id = user.user_id
        existing_expert = Expert.query.filter_by(user_id=user_id).first()
        if existing_expert:
            return jsonify({"message": "Conflict: User is already an expert"}), 409
        
        request_data = request.get_json()
        category = request_data.get('category')
        bio = request_data.get('bio')
        hourly_rate = request_data.get('hourly_rate')
        image_name = request_data.get('image_name')
        
        if not category or not bio or not hourly_rate or not image_name:
            return jsonify({"message": "BadRequest: Missing required fields"}), 400
        
        if image_name not in ['boss', 'dish_washer', 'doctor', 'lawyer', 'moon_owner', 'Professor_Zhang', 'so_bad', 'so_fucking_rich']:
            return jsonify({"message": "BadRequest: Invalid image choice"}), 400
        
        new_expert = Expert(
            user_id=user_id,
            category=category,
            bio=bio,
            hourly_rate=hourly_rate,
            image_name=image_name
        )
        
        db.session.add(new_expert)
        db.session.commit()
        
        return jsonify({"message": "Success: Applied to become an expert"}), 201
    
    except Exception as e:
        print(f"Error in apply_to_expert: {e}")
        return jsonify({"message": "ServerError: Unable to apply to expert"}), 500