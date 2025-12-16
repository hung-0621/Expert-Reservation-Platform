from flask import Blueprint, request
from app.extensions import db
from app.models.user_model import User
from app.config import Config
from app.models.expert_model import Expert
from app.utils.auth_user import get_auth_user
from app.utils.generate_response import generate_response

expert_bp = Blueprint('expert', __name__, url_prefix='/api/expert')
BACKEND_BASE_URL = Config.BACKEND_BASE_URL

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
            user = User.query.get(expert.user_id)
            if not user:
                continue
        
            image_path = f"/static/images/{expert.image_name}.png"
            image_url = f"{BACKEND_BASE_URL}{image_path}"
            
            expert_data = {
                "expert_id": expert.expert_id,
                "name": user.name,
                "category": expert.category,
                "bio": expert.bio,
                "hourly_rate": expert.hourly_rate,
                "image_url": image_url
            }
            
            experts_list.append(expert_data)
        
        return generate_response(200, "Experts retrieved successfully", {"experts": experts_list})
    
    except Exception as e:
        print(f"Error in list_experts: {e}")
        return generate_response(500, "ServerError: Unable to retrieve experts")
    
# get expert details by expert_id
@expert_bp.route('/<expert_id>', methods=['GET'])
def get_expert(expert_id):
    try:    
        user, error, status_code = get_auth_user()
        if error:
            return error, status_code
        
        expert = Expert.query.get(expert_id)
        if not expert:
            return generate_response(404, "NotFound: Expert not found")
        
        user = User.query.get(expert.user_id)
        if not user:
            return generate_response(404, "NotFound: User not found")

        image_path = f"/static/images/{expert.image_name}.png"
        image_url = f"{BACKEND_BASE_URL}{image_path}"
        
        expert_data = {
            "expert_id": expert.expert_id,
            "name": user.name,
            "category": expert.category,
            "bio": expert.bio,
            "hourly_rate": expert.hourly_rate,
            "image_url": image_url
        }
        
        return generate_response(200, "Expert retrieved successfully", {"expert": expert_data})
        
    except Exception as e:
        print(f"Error in get_expert: {e}")
        return generate_response(500, "ServerError: Unable to retrieve expert details")
    
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
            return generate_response(409, "Conflict: User is already an expert")
        
        request_data = request.get_json()
        category = request_data.get('category')
        bio = request_data.get('bio')
        hourly_rate = request_data.get('hourly_rate')
        image_name = request_data.get('image_name')
        
        if not category or not bio or not hourly_rate or not image_name:
            return generate_response(400, "BadRequest: Missing required fields")
        
        if image_name not in ['boss', 'dish_washer', 'doctor', 'lawyer', 'moon_owner', 'Professor_Zhang', 'so_bad', 'so_fucking_rich']:
            return generate_response(400, "BadRequest: Invalid image choice")
        
        new_expert = Expert(
            user_id=user_id,
            category=category,
            bio=bio,
            hourly_rate=hourly_rate,
            image_name=image_name
        )
        
        db.session.add(new_expert)
        db.session.commit()
        
        return generate_response(201, "Success: Applied to become an expert")
    
    except Exception as e:
        print(f"Error in apply_to_expert: {e}")
        return generate_response(500, "ServerError: Unable to apply to expert")