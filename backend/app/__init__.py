from flask import Flask
from flask_jwt_extended import JWTManager
from app.config import Config
from app.extensions import db, cors, migrate
from app.routers.auth_router import auth_bp
from app.routers.expert_router import expert_bp
from app.routers.booking_router import booking_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    jwt = JWTManager(app)

    # Initialize extensions
    db.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": Config.FRONT_END_BASE_URL}}, supports_credentials=True)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(expert_bp)
    app.register_blueprint(booking_bp)
    
    @app.route('/')
    def index():
        return "Welcome to the Expert Reservation Platform API"

    return app