from datetime import timedelta
from flask import Blueprint, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies
from app.extensions import db
from app.models.user_model import User
from app.config import Config
from app.utils.auth_user import get_auth_user
from app.utils.generate_response import generate_response

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:        
        body = request.get_json()
        if not body:
            return generate_response(400, "BadRequest: No data provided")
        
        name = body.get('name')
        email = body.get('email')
        password = body.get('password')
        if not name or not email or not password:
            return generate_response(400, "BadRequest: Missing required fields")
        
        email_already_registered = User.query.filter_by(email=email).first()
        if email_already_registered:
            return generate_response(409, "Conflict: Email already registered")
        
        hashed_password = generate_password_hash(password)
        new_user = User(name=name, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return generate_response(200, "Register successfully")
    
    except Exception as e:
        print(f"Error in register: {e}")
        return generate_response(500, "SeverError: Registration failed")
    

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        if not body:
            return generate_response(400, "BadRequest: No data provided")
        
        email = body.get('email')
        password = body.get('password')
        if not email or not password:
            return generate_response(400, "BadRequest: Missing required fields")
        
        user: User = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            expires_delta=timedelta(days=1)
            access_token = create_access_token(identity=str(user.user_id), expires_delta=expires_delta)

            resp = generate_response(200, "Login successfully", {
                "user": {
                    "name": user.name,
                    "email": user.email
                }
            })
            
            set_access_cookies(resp, access_token)
        
            return resp
        else:
            return generate_response(401, "Unauthorized: Invalid credentials")
    
    except Exception as e:
        print(f"Error in login: {e}")
        return generate_response(500, "SeverError: Login failed")
    
@auth_bp.route('/logout', methods=['POST'])
def logout():
    resp = generate_response(200, "Logout successfully")
    resp.delete_cookie('access_token_cookie', path='/', httponly=True, samesite='Lax', secure=Config.COOKIE_SECURE)
    resp.delete_cookie('csrf_access_token', path='/', httponly=False, samesite='Lax', secure=Config.COOKIE_SECURE)
    return resp

@auth_bp.route('/me', methods=['GET'])
def me():
    try:
        user, error ,status_code = get_auth_user()
        
        if error:
            return error, status_code
        
        resp = generate_response(200, "User information retrieved successfully", {
            "user": {
                "name": user.name,
                "email": user.email
            }
        })
        
        return resp
    
    except Exception as e:
        print(f"Error in me: {e}")
        return generate_response(500, "ServerError: Unable to retrieve user information")