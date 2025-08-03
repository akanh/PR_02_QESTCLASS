"""
Classification API Models - Request and Response schemas
"""
from pydantic import BaseModel
from typing import Dict, List


class ClassificationRequest(BaseModel):
    """Request model for question classification"""
    question: str
    model: str = "MultinomialNB"


class ClassificationResponse(BaseModel):
    """Response model for question classification"""
    question: str
    predicted_department: str
    model_used: str
    predictions: Dict[str, float]
    confidence: float
    is_mock: bool = True


class TrainingRequest(BaseModel):
    """Request model for training ML models"""
    questions: List[str]
    departments: List[str]


class TrainingResponse(BaseModel):
    """Response model for training results"""
    success: bool
    message: str
    results: Dict[str, Dict]


class ModelStatusResponse(BaseModel):
    """Response model for model status"""
    models: Dict[str, Dict]
    vectorizer_fitted: bool
    total_departments: int
    departments: List[str]


class DepartmentsResponse(BaseModel):
    """Response model for available departments"""
    departments: List[str]


class ModelsResponse(BaseModel):
    """Response model for available models"""
    models: List[Dict[str, str]]
