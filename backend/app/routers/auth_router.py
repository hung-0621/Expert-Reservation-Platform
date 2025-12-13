from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies
from app.extensions import db
from app.models.user_model import User
from app.config import Config
from app.utils.auth_user import get_auth_user

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:        
        body = request.get_json()
        if not body:
            return jsonify({"message": "BadRequest: No data provided"}), 400
        
        name = body.get('name')
        email = body.get('email')
        password = body.get('password')
        if not name or not email or not password:
            return jsonify({"message": "BadRequest: Missing required fields"}), 400
        
        email_already_registered = User.query.filter_by(email=email).first()
        if email_already_registered:
            return jsonify({"message": "Conflict: Email already registered"}), 409
        
        hashed_password = generate_password_hash(password)
        new_user = User(name=name, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Register successfully"}), 200
    
    except Exception as e:
        print(f"Error in register: {e}")
        return jsonify({"message": "SeverError: Registration failed"}), 500
    

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        if not body:
            return jsonify({"message": "BadRequest: No data provided"}), 400
        
        email = body.get('email')
        password = body.get('password')
        if not email or not password:
            return jsonify({"message": "BadRequest: Missing required fields"}), 400
        
        user: User = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=str(user.user_id))
        
            resp = jsonify({
                "message": "Login successfully",
                "user": {
                    "name": user.name,
                    "email": user.email
                }
            })
            
            set_access_cookies(resp, access_token)
        
            return resp, 200
        else:
            return jsonify({"message": "Unauthorized: Invalid credentials"}), 401
    
    except Exception as e:
        print(f"Error in login: {e}")
        return jsonify({"message": "SeverError: Login failed"}), 500
    
@auth_bp.route('/logout', methods=['POST'])
def logout():
    resp = make_response(jsonify({"message": "Logout successfully"}), 200)
    resp.delete_cookie('access_token_cookie', path='/', httponly=True, samesite='Lax', secure=Config.COOKIE_SECURE)
    resp.delete_cookie('csrf_access_token', path='/', httponly=False, samesite='Lax', secure=Config.COOKIE_SECURE)
    return resp

@auth_bp.route('/me', methods=['GET'])
def me():
    try:
        user, error ,status_code = get_auth_user()
        
        if error:
            return error, status_code
        
        return jsonify({
            "user": {
                "name": user.name,
                "email": user.email
            }
        })
    except Exception as e:
        print(f"Error in me: {e}")
        return jsonify({"message": "ServerError: Unable to retrieve user information"}), 500