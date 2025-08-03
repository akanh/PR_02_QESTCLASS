"""
Dependency injection for FastAPI
"""
from business.services.ml_service import MLService

# Global service instances
ml_service = MLService()

def get_ml_service() -> MLService:
    """Get ML Service instance"""
    return ml_service
