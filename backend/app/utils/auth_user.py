from flask import jsonify, wrappers
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from app.models.user_model import User
from app.models.expert_model import Expert

# return (user_id, error_message, status_code)
def get_auth_user() -> tuple[str | None, wrappers.Response | None, int | None]:
    try:
        verify_jwt_in_request(locations=['cookies'])
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user:
            return user, None, None
        else:
            return None, jsonify({"message": "Unauthorized: User not found"}), 401
    
    except Exception as e:
        print(f"Error in auth_user: {e}")
        return None, jsonify({"message": "Unauthorized: Invalid or missing token"}), 401