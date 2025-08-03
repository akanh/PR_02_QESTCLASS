"""
Infrastructure - Base Machine Learning Models
Generic ML model implementations using scikit-learn
"""
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, mean_squared_error
from typing import Tuple, Any
import joblib
import os


class MLModel:
    """Base ML Model class"""
    
    def __init__(self):
        self.model = None
        self.is_trained = False
        
    def train(self, X: np.ndarray, y: np.ndarray) -> dict:
        """Train the model"""
        raise NotImplementedError
        
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Make predictions"""
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        return self.model.predict(X)
        
    def save_model(self, path: str):
        """Save the trained model"""
        if self.model is not None:
            joblib.dump(self.model, path)
            
    def load_model(self, path: str):
        """Load a trained model"""
        if os.path.exists(path):
            self.model = joblib.load(path)
            self.is_trained = True


class ClassificationModel(MLModel):
    """Random Forest Classification Model"""
    
    def __init__(self, n_estimators: int = 100, random_state: int = 42):
        super().__init__()
        self.model = RandomForestClassifier(
            n_estimators=n_estimators, 
            random_state=random_state
        )
        
    def train(self, X: np.ndarray, y: np.ndarray) -> dict:
        """Train the classification model"""
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        self.model.fit(X_train, y_train)
        self.is_trained = True
        
        # Calculate accuracy
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        return {
            "model_type": "classification",
            "accuracy": float(accuracy),  # Convert to Python float
            "train_size": int(len(X_train)),  # Convert to Python int
            "test_size": int(len(X_test))  # Convert to Python int
        }


class RegressionModel(MLModel):
    """Linear Regression Model"""
    
    def __init__(self):
        super().__init__()
        self.model = LinearRegression()
        
    def train(self, X: np.ndarray, y: np.ndarray) -> dict:
        """Train the regression model"""
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        self.model.fit(X_train, y_train)
        self.is_trained = True
        
        # Calculate MSE
        y_pred = self.model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        
        return {
            "model_type": "regression",
            "mse": float(mse),  # Convert to Python float
            "train_size": int(len(X_train)),  # Convert to Python int
            "test_size": int(len(X_test))  # Convert to Python int
        }
