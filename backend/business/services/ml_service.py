"""
Machine Learning Service Layer
"""
import numpy as np
import pandas as pd
from typing import Dict, List, Any
from infrastructure.ml.base_models import ClassificationModel, RegressionModel
from common.exceptions import ValidationError, PredictionError
from common.utils import format_response
import logging

logger = logging.getLogger(__name__)


class MLService:
    """Machine Learning Service"""
    
    def __init__(self):
        self.classification_model = ClassificationModel()
        self.regression_model = RegressionModel()
        
    def train_classification_model(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Train classification model with provided data"""
        try:
            # Convert data to DataFrame
            df = pd.DataFrame(data)
            
            if df.empty:
                raise ValidationError("Training data cannot be empty")
                
            # Assuming last column is target variable
            if len(df.columns) < 2:
                raise ValidationError(
                    "Data must have at least 2 columns (features and target)"
                )
                
            X = df.iloc[:, :-1].values
            y = df.iloc[:, -1].values
            
            # Train the model
            training_results = self.classification_model.train(X, y)
            
            logger.info(
                f"Classification model trained with accuracy: "
                f"{training_results['accuracy']}"
            )
            
            return format_response(
                training_results,
                "Classification model trained successfully"
            )
            
        except Exception as e:
            logger.error(f"Error training classification model: {str(e)}")
            raise PredictionError(f"Failed to train model: {str(e)}")
    
    def train_regression_model(
        self, data: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Train regression model with provided data"""
        try:
            # Convert data to DataFrame
            df = pd.DataFrame(data)
            
            if df.empty:
                raise ValidationError("Training data cannot be empty")
                
            # Assuming last column is target variable
            if len(df.columns) < 2:
                raise ValidationError(
                    "Data must have at least 2 columns (features and target)"
                )
                
            X = df.iloc[:, :-1].values
            y = df.iloc[:, -1].values
            
            # Train the model
            training_results = self.regression_model.train(X, y)
            
            logger.info(
                f"Regression model trained with MSE: {training_results['mse']}"
            )
            
            return format_response(
                training_results,
                "Regression model trained successfully"
            )
            
        except Exception as e:
            logger.error(f"Error training regression model: {str(e)}")
            raise PredictionError(f"Failed to train model: {str(e)}")
    
    def predict_classification(self, features: List[float]) -> Dict[str, Any]:
        """Make classification prediction"""
        try:
            if not self.classification_model.is_trained:
                raise ValidationError("Classification model is not trained yet")
                
            X = np.array([features])
            prediction = self.classification_model.predict(X)
            
            return format_response(
                {"prediction": int(prediction[0])},  # Convert to Python int
                "Classification prediction completed"
            )
            
        except Exception as e:
            logger.error(f"Error making classification prediction: {str(e)}")
            raise PredictionError(f"Failed to make prediction: {str(e)}")
    
    def predict_regression(self, features: List[float]) -> Dict[str, Any]:
        """Make regression prediction"""
        try:
            if not self.regression_model.is_trained:
                raise ValidationError("Regression model is not trained yet")
                
            X = np.array([features])
            prediction = self.regression_model.predict(X)
            
            return format_response(
                {"prediction": float(prediction[0])},
                "Regression prediction completed"
            )
            
        except Exception as e:
            logger.error(f"Error making regression prediction: {str(e)}")
            raise PredictionError(f"Failed to make prediction: {str(e)}")
    
    def get_model_status(self) -> Dict[str, Any]:
        """Get status of all models"""
        return format_response({
            "classification_model": {
                "is_trained": self.classification_model.is_trained,
                "model_type": "RandomForestClassifier"
            },
            "regression_model": {
                "is_trained": self.regression_model.is_trained,
                "model_type": "LinearRegression"
            }
        }, "Model status retrieved successfully")
