import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    FRONT_END_BASE_URL = os.getenv('FRONT_END_BASE_URL')
    SECRET_KEY = os.getenv('SECRET_KEY')
    COOKIE_SECURE = os.getenv('FLASK_DEBUG') == '0'  # Set to True in production with HTTPS
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    AVATARS_FOLDER = os.getenv('AVATARS_FOLDER')
    
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_SECURE = os.getenv('FLASK_DEBUG') == '0'  # Set to True in production with HTTPS
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_COOKIE_SECURE = 'Lax'
    JWT_ACCESS_CSRF_HEADER_NAME = 'X-CSRF-TOKEN'
