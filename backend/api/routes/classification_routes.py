"""
Classification API routes for department classification
"""
from fastapi import APIRouter, HTTPException
from api.models.classification_models import (
    ClassificationRequest, ClassificationResponse,
    TrainingRequest, TrainingResponse,
    ModelStatusResponse, DepartmentsResponse, ModelsResponse
)
from business.services.classification_service import classification_service
from business.services.training_data import get_training_data

router = APIRouter()


@router.post("/classify-question", response_model=ClassificationResponse)
async def classify_question(request: ClassificationRequest):
    """
    Classify a question to determine which department it belongs to.
    Uses the classification service for predictions.
    """
    try:
        # Use the classification service
        result = classification_service.classify_question(
            question=request.question,
            model_name=request.model
        )
        
        return ClassificationResponse(
            question=result["question"],
            predicted_department=result["predicted_department"],
            model_used=result["model_used"],
            predictions=result["predictions"],
            confidence=result["confidence"],
            is_mock=result.get("is_mock", True)
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Classification error: {str(e)}"
        )


@router.post("/train-models", response_model=TrainingResponse)
async def train_models(request: TrainingRequest):
    """
    Train classification models with provided data
    """
    try:
        if len(request.questions) != len(request.departments):
            raise HTTPException(
                status_code=400,
                detail="Questions and departments must have the same length"
            )
        
        if len(request.questions) < 10:
            raise HTTPException(
                status_code=400,
                detail="Need at least 10 samples for training"
            )
        
        # Use the classification service to train models
        result = classification_service.train_models(
            questions=request.questions,
            departments=request.departments
        )
        
        return TrainingResponse(
            success=result["success"],
            message=result["message"],
            results=result["results"]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Training error: {str(e)}"
        )


@router.get("/departments")
async def get_departments():
    """Get list of available departments"""
    try:
        departments = classification_service.get_departments()
        return {"departments": departments}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting departments: {str(e)}"
        )


@router.get("/models")
async def get_available_models():
    """Get list of available ML models"""
    try:
        models = classification_service.get_available_models()
        return {"models": models}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting models: {str(e)}"
        )


@router.get("/model-status")
async def get_model_status():
    """Get status of all models"""
    try:
        status = classification_service.get_model_status()
        return status
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting model status: {str(e)}"
        )


@router.post("/save-models")
async def save_models():
    """Save trained models to disk"""
    try:
        result = classification_service.save_models()
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=500, detail=result["message"])
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error saving models: {str(e)}"
        )


@router.post("/load-models")
async def load_models():
    """Load trained models from disk"""
    try:
        result = classification_service.load_models()
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=500, detail=result["message"])
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error loading models: {str(e)}"
        )


@router.post("/train-with-sample-data")
async def train_with_sample_data():
    """Train models with sample data for testing"""
    try:
        sample_data = get_training_data()
        
        result = classification_service.train_models(
            questions=sample_data["questions"],
            departments=sample_data["departments"]
        )
        
        return TrainingResponse(
            success=result["success"],
            message=result["message"],
            results=result["results"]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error training with sample data: {str(e)}"
        )
