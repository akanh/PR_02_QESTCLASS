"""
Configuration settings for the application
"""
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings"""
    
    def __init__(self):
        # API Configuration
        self.api_version: str = os.getenv("API_VERSION", "v1")
        self.host: str = os.getenv("HOST", "localhost")
        self.port: int = int(os.getenv("PORT", "8000"))
        
        # CORS Configuration
        cors_env = os.getenv("CORS_ORIGINS")
        if cors_env:
            self.cors_origins: List[str] = [
                origin.strip() for origin in cors_env.split(",")
            ]
        else:
            # Default CORS origins
            self.cors_origins: List[str] = [
                "http://localhost:3000",
                "http://frontend:3000"
            ]
        
        # Environment
        self.environment: str = os.getenv("ENVIRONMENT", "development")


settings = Settings()
