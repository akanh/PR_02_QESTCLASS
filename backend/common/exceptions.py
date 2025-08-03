"""
Custom exceptions for the application
"""
from fastapi import HTTPException, status


class ValidationError(HTTPException):
    """Custom validation error"""
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST, detail=detail
        )


class ModelNotFoundError(HTTPException):
    """Model not found error"""
    def __init__(self, detail: str = "Model not found"):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND, detail=detail
        )


class PredictionError(HTTPException):
    """Prediction error"""
    def __init__(self, detail: str = "Error occurred during prediction"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail
        )
