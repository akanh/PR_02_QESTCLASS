"""
ML Infrastructure - Classification Algorithms
"""
import numpy as np
from typing import Dict, List, Any, Optional
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier as SklearnRandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os
import logging

logger = logging.getLogger(__name__)


class DepartmentClassifier:
    """Base class for department classification models"""
    
    def __init__(self, model_name: str):
        self.model_name = model_name
        self.model = None
        self.is_trained = False
        
    def train(self, X, y):
        """Train the model"""
        raise NotImplementedError("Subclasses must implement train method")
        
    def predict(self, X):
        """Make predictions"""
        if not self.is_trained:
            raise ValueError(f"{self.model_name} model is not trained yet")
        return self.model.predict(X)
        
    def predict_proba(self, X):
        """Get prediction probabilities"""
        if not self.is_trained:
            raise ValueError(f"{self.model_name} model is not trained yet")
        if hasattr(self.model, 'predict_proba'):
            return self.model.predict_proba(X)
        else:
            # For models that don't support predict_proba, return dummy probabilities
            predictions = self.predict(X)
            return np.ones((len(predictions), 5)) * 0.2  # Equal probability for 5 departments
    
    def save(self, filepath: str):
        """Save model to disk"""
        if self.is_trained:
            joblib.dump(self.model, filepath)
            
    def load(self, filepath: str):
        """Load model from disk"""
        if os.path.exists(filepath):
            self.model = joblib.load(filepath)
            self.is_trained = True


class MultinomialNBClassifier(DepartmentClassifier):
    """Multinomial Naive Bayes classifier for department classification"""
    
    def __init__(self):
        super().__init__("MultinomialNB")
        self.model = MultinomialNB()
        
    def train(self, X, y):
        """Train Multinomial Naive Bayes model"""
        try:
            self.model.fit(X, y)
            self.is_trained = True
            
            # Calculate accuracy on training data
            y_pred = self.model.predict(X)
            accuracy = accuracy_score(y, y_pred)
            
            return {
                "accuracy": round(accuracy, 3),
                "model_type": self.model_name,
                "status": "trained"
            }
        except Exception as e:
            logger.error(f"Error training {self.model_name}: {str(e)}")
            return {
                "accuracy": 0.0,
                "model_type": self.model_name,
                "status": f"error: {str(e)}"
            }


class SVMClassifier(DepartmentClassifier):
    """Support Vector Machine classifier for department classification"""
    
    def __init__(self):
        super().__init__("SVM")
        self.model = SVC(probability=True, kernel='linear')
        
    def train(self, X, y):
        """Train SVM model"""
        try:
            self.model.fit(X, y)
            self.is_trained = True
            
            # Calculate accuracy on training data
            y_pred = self.model.predict(X)
            accuracy = accuracy_score(y, y_pred)
            
            return {
                "accuracy": round(accuracy, 3),
                "model_type": self.model_name,
                "status": "trained"
            }
        except Exception as e:
            logger.error(f"Error training {self.model_name}: {str(e)}")
            return {
                "accuracy": 0.0,
                "model_type": self.model_name,
                "status": f"error: {str(e)}"
            }


class DepartmentRandomForestClassifier(DepartmentClassifier):
    """Random Forest classifier for department classification"""
    
    def __init__(self):
        super().__init__("RandomForest")
        self.model = SklearnRandomForestClassifier(n_estimators=100, random_state=42)
        
    def train(self, X, y):
        """Train Random Forest model"""
        try:
            self.model.fit(X, y)
            self.is_trained = True
            
            # Calculate accuracy on training data
            y_pred = self.model.predict(X)
            accuracy = accuracy_score(y, y_pred)
            
            return {
                "accuracy": round(accuracy, 3),
                "model_type": self.model_name,
                "status": "trained"
            }
        except Exception as e:
            logger.error(f"Error training {self.model_name}: {str(e)}")
            return {
                "accuracy": 0.0,
                "model_type": self.model_name,
                "status": f"error: {str(e)}"
            }


class LogisticRegressionClassifier(DepartmentClassifier):
    """Logistic Regression classifier for department classification"""
    
    def __init__(self):
        super().__init__("LogisticRegression")
        self.model = LogisticRegression(max_iter=1000, random_state=42)
        
    def train(self, X, y):
        """Train Logistic Regression model"""
        try:
            self.model.fit(X, y)
            self.is_trained = True
            
            # Calculate accuracy on training data
            y_pred = self.model.predict(X)
            accuracy = accuracy_score(y, y_pred)
            
            return {
                "accuracy": round(accuracy, 3),
                "model_type": self.model_name,
                "status": "trained"
            }
        except Exception as e:
            logger.error(f"Error training {self.model_name}: {str(e)}")
            return {
                "accuracy": 0.0,
                "model_type": self.model_name,
                "status": f"error: {str(e)}"
            }


class TextVectorizer:
    """Text vectorization for department classification"""
    
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            lowercase=True,
            ngram_range=(1, 2)
        )
        self.is_fitted = False
        
    def fit_transform(self, texts: List[str]):
        """Fit vectorizer and transform texts"""
        try:
            X = self.vectorizer.fit_transform(texts)
            self.is_fitted = True
            return X
        except Exception as e:
            logger.error(f"Error fitting vectorizer: {str(e)}")
            raise
            
    def transform(self, texts: List[str]):
        """Transform texts using fitted vectorizer"""
        if not self.is_fitted:
            raise ValueError("Vectorizer is not fitted. Call fit_transform first.")
        try:
            return self.vectorizer.transform(texts)
        except Exception as e:
            logger.error(f"Error transforming texts: {str(e)}")
            raise
            
    def save(self, filepath: str):
        """Save vectorizer to disk"""
        if self.is_fitted:
            joblib.dump(self.vectorizer, filepath)
            
    def load(self, filepath: str):
        """Load vectorizer from disk"""
        if os.path.exists(filepath):
            self.vectorizer = joblib.load(filepath)
            self.is_fitted = True


def create_classifier(model_name: str) -> DepartmentClassifier:
    """Factory function to create classifier instances"""
    classifiers = {
        "MultinomialNB": MultinomialNBClassifier,
        "SVM": SVMClassifier,
        "RandomForest": DepartmentRandomForestClassifier,
        "LogisticRegression": LogisticRegressionClassifier
    }
    
    if model_name not in classifiers:
        raise ValueError(f"Unknown model: {model_name}")
        
    return classifiers[model_name]()


def get_available_models() -> List[Dict[str, str]]:
    """Get list of available models"""
    return [
        {"value": "MultinomialNB", "label": "Multinomial Naive Bayes"},
        {"value": "SVM", "label": "Support Vector Machine"},
        {"value": "RandomForest", "label": "Random Forest"},
        {"value": "LogisticRegression", "label": "Logistic Regression"}
    ]
