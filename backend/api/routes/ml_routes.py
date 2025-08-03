"""
Machine Learning API Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from api.dependencies import get_ml_service
from business.services.ml_service import MLService
from common.exceptions import ValidationError, PredictionError

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

# Pydantic Models for Request/Response
class TrainingData(BaseModel):
    data: List[Dict[str, Any]]

class PredictionRequest(BaseModel):
    features: List[float]

class PredictionResponse(BaseModel):
    success: bool
    message: str
    data: Dict[str, Any]
    timestamp: str

@router.get("/status")
async def get_model_status(
    ml_service: MLService = Depends(get_ml_service)
) -> Dict[str, Any]:
    """Get the status of all ML models"""
    try:
        return ml_service.get_model_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/train/classification")
async def train_classification(
    training_data: TrainingData,
    ml_service: MLService = Depends(get_ml_service)
) -> Dict[str, Any]:
    """Train the classification model"""
    try:
        return ml_service.train_classification_model(training_data.data)
    except (ValidationError, PredictionError) as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/train/regression")
async def train_regression(
    training_data: TrainingData,
    ml_service: MLService = Depends(get_ml_service)
) -> Dict[str, Any]:
    """Train the regression model"""
    try:
        return ml_service.train_regression_model(training_data.data)
    except (ValidationError, PredictionError) as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/classification")
async def predict_classification(
    prediction_request: PredictionRequest,
    ml_service: MLService = Depends(get_ml_service)
) -> Dict[str, Any]:
    """Make a classification prediction"""
    try:
        return ml_service.predict_classification(prediction_request.features)
    except (ValidationError, PredictionError) as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/regression")
async def predict_regression(
    prediction_request: PredictionRequest,
    ml_service: MLService = Depends(get_ml_service)
) -> Dict[str, Any]:
    """Make a regression prediction"""
    try:
        return ml_service.predict_regression(prediction_request.features)
    except (ValidationError, PredictionError) as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint"""
    return {"status": "healthy", "service": "ML API"}
