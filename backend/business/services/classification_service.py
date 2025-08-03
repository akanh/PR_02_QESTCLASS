"""
Department Classification Service
"""
import random
import numpy as np
from typing import Dict, List, Any
from business.models.domain_models import (
    Question, Department, ClassificationResult, TrainingData, 
    ModelInfo, TrainingResult
)
from infrastructure.ml.classifiers import (
    create_classifier,
    TextVectorizer,
    get_available_models
)
import os
import logging

logger = logging.getLogger(__name__)


class DepartmentClassificationService:
    """Service for classifying questions into departments"""
    
    def __init__(self):
        self.departments = ["HR", "Finance", "IT", "Production", "Sales"]
        self.vectorizer = TextVectorizer()
        self.trained_models = {}
        
    def train_models(self, questions: List[str], departments: List[str]) -> Dict[str, Any]:
        """
        Train all models with provided data
        
        Args:
            questions: List of questions
            departments: List of corresponding departments
            
        Returns:
            Training results with accuracy scores
        """
        try:
            if len(questions) != len(departments):
                raise ValueError("Questions and departments must have the same length")
                
            if len(questions) < 10:
                raise ValueError("Need at least 10 samples for training")
            
            # Vectorize the text data
            X = self.vectorizer.fit_transform(questions)
            y = departments
            
            results = {}
            model_names = ["MultinomialNB", "SVM", "RandomForest", "LogisticRegression"]
            
            for model_name in model_names:
                try:
                    # Create and train the model
                    classifier = create_classifier(model_name)
                    training_result = classifier.train(X, y)
                    
                    # Store trained model
                    self.trained_models[model_name] = classifier
                    
                    results[model_name] = training_result
                    
                    logger.info(f"{model_name} trained with accuracy: {training_result['accuracy']}")
                    
                except Exception as e:
                    logger.error(f"Error training {model_name}: {str(e)}")
                    results[model_name] = {
                        "accuracy": 0.0,
                        "model_type": model_name,
                        "status": f"error: {str(e)}"
                    }
            
            return {
                "success": True,
                "message": "Models trained successfully",
                "results": results,
                "total_samples": len(questions),
                "departments": list(set(departments))
            }
            
        except Exception as e:
            logger.error(f"Error training models: {str(e)}")
            return {
                "success": False,
                "message": f"Training failed: {str(e)}",
                "results": {}
            }
    
    def classify_question(
        self, 
        question: str, 
        model_name: str = "MultinomialNB"
    ) -> Dict[str, Any]:
        """
        Classify a question into a department
        
        Args:
            question: The question to classify
            model_name: Name of the model to use
            
        Returns:
            Classification results with predictions and confidence
        """
        try:
            # If models are not trained, return mock data
            if not self.trained_models or model_name not in self.trained_models:
                return self._get_mock_prediction(question, model_name)
            
            if not self.vectorizer.is_fitted:
                raise ValueError("Vectorizer is not fitted. Please train models first.")
            
            # Vectorize the question
            X = self.vectorizer.transform([question])
            
            # Get the trained model
            classifier = self.trained_models[model_name]
            
            # Make prediction
            prediction = classifier.predict(X)[0]
            probabilities = classifier.predict_proba(X)[0]
            
            # Create predictions dictionary
            predictions = {}
            for i, dept in enumerate(self.departments):
                if hasattr(classifier.model, 'classes_'):
                    dept_index = np.where(classifier.model.classes_ == dept)[0]
                    if len(dept_index) > 0:
                        predictions[dept] = round(probabilities[dept_index[0]], 3)
                    else:
                        predictions[dept] = 0.0
                else:
                    predictions[dept] = round(probabilities[i] if i < len(probabilities) else 0.0, 3)
            
            # Get confidence (highest probability)
            confidence = max(predictions.values())
            
            return {
                "question": question,
                "predicted_department": prediction,
                "model_used": model_name,
                "predictions": predictions,
                "confidence": confidence,
                "is_mock": False
            }
            
        except Exception as e:
            logger.error(f"Error classifying question: {str(e)}")
            # Fallback to mock data on error
            return self._get_mock_prediction(question, model_name)
    
    def _get_mock_prediction(self, question: str, model_name: str) -> Dict[str, Any]:
        """Generate mock prediction for testing purposes"""
        try:
            # Generate random but realistic probabilities
            predictions = {}
            
            # Choose a random department to be dominant
            dominant_dept = random.choice(self.departments)
            
            for dept in self.departments:
                if dept == dominant_dept:
                    # High confidence for dominant department
                    predictions[dept] = round(random.uniform(0.6, 0.9), 3)
                else:
                    # Lower confidence for others
                    predictions[dept] = round(random.uniform(0.01, 0.2), 3)
            
            # Normalize to ensure they sum to 1
            total = sum(predictions.values())
            predictions = {
                dept: round(prob/total, 3)
                for dept, prob in predictions.items()
            }
            
            # Find the department with highest confidence
            predicted_department = max(predictions.keys(), key=lambda x: predictions[x])
            confidence = predictions[predicted_department]
            
            return {
                "question": question,
                "predicted_department": predicted_department,
                "model_used": model_name,
                "predictions": predictions,
                "confidence": confidence,
                "is_mock": True
            }
            
        except Exception as e:
            logger.error(f"Error generating mock prediction: {str(e)}")
            # Ultimate fallback
            return {
                "question": question,
                "predicted_department": "IT",
                "model_used": model_name,
                "predictions": {dept: 0.2 for dept in self.departments},
                "confidence": 0.2,
                "is_mock": True,
                "error": str(e)
            }
    
    def get_available_models(self) -> List[Dict[str, str]]:
        """Get list of available models"""
        return get_available_models()
    
    def get_departments(self) -> List[str]:
        """Get list of available departments"""
        return self.departments.copy()
    
    def get_model_status(self) -> Dict[str, Any]:
        """Get status of all models"""
        model_names = ["MultinomialNB", "SVM", "RandomForest", "LogisticRegression"]
        status = {}
        
        for model_name in model_names:
            status[model_name] = {
                "is_trained": model_name in self.trained_models,
                "available": True
            }
        
        return {
            "models": status,
            "vectorizer_fitted": self.vectorizer.is_fitted,
            "total_departments": len(self.departments),
            "departments": self.departments
        }
    
    def save_models(self, model_dir: str = "saved_models") -> Dict[str, Any]:
        """Save trained models to disk"""
        try:
            os.makedirs(model_dir, exist_ok=True)
            saved_models = []
            
            # Save vectorizer
            if self.vectorizer.is_fitted:
                vectorizer_path = os.path.join(model_dir, "vectorizer.joblib")
                self.vectorizer.save(vectorizer_path)
                saved_models.append("vectorizer")
            
            # Save trained models
            for model_name, classifier in self.trained_models.items():
                model_path = os.path.join(model_dir, f"{model_name}.joblib")
                classifier.save(model_path)
                saved_models.append(model_name)
            
            return {
                "success": True,
                "message": f"Models saved to {model_dir}",
                "saved_models": saved_models
            }
            
        except Exception as e:
            logger.error(f"Error saving models: {str(e)}")
            return {
                "success": False,
                "message": f"Failed to save models: {str(e)}"
            }
    
    def load_models(self, model_dir: str = "saved_models") -> Dict[str, Any]:
        """Load trained models from disk"""
        try:
            loaded_models = []
            
            # Load vectorizer
            vectorizer_path = os.path.join(model_dir, "vectorizer.joblib")
            if os.path.exists(vectorizer_path):
                self.vectorizer.load(vectorizer_path)
                loaded_models.append("vectorizer")
            
            # Load models
            model_names = ["MultinomialNB", "SVM", "RandomForest", "LogisticRegression"]
            for model_name in model_names:
                model_path = os.path.join(model_dir, f"{model_name}.joblib")
                if os.path.exists(model_path):
                    classifier = create_classifier(model_name)
                    classifier.load(model_path)
                    self.trained_models[model_name] = classifier
                    loaded_models.append(model_name)
            
            return {
                "success": True,
                "message": f"Models loaded from {model_dir}",
                "loaded_models": loaded_models
            }
            
        except Exception as e:
            logger.error(f"Error loading models: {str(e)}")
            return {
                "success": False,
                "message": f"Failed to load models: {str(e)}"
            }


# Create a singleton instance
classification_service = DepartmentClassificationService()
