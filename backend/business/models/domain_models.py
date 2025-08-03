"""
Domain Models - Business entities and domain objects
"""
from dataclasses import dataclass
from typing import Dict, List, Optional
from datetime import datetime


@dataclass
class Question:
    """Domain model for a question"""
    text: str
    id: Optional[str] = None
    created_at: Optional[datetime] = None
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now()


@dataclass
class Department:
    """Domain model for a department"""
    name: str
    code: str
    description: Optional[str] = None
    
    @classmethod
    def get_available_departments(cls) -> List['Department']:
        """Get list of available departments"""
        return [
            cls("HR", "HR", "Human Resources"),
            cls("Finance", "FIN", "Finance and Accounting"),
            cls("IT", "IT", "Information Technology"),
            cls("Production", "PROD", "Production and Manufacturing"),
            cls("Sales", "SALES", "Sales and Marketing")
        ]


@dataclass
class ClassificationResult:
    """Domain model for classification result"""
    question: Question
    predicted_department: Department
    confidence: float
    all_predictions: Dict[str, float]
    model_used: str
    is_mock: bool = False
    created_at: Optional[datetime] = None
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now()


@dataclass
class TrainingData:
    """Domain model for training data"""
    questions: List[Question]
    departments: List[Department]
    
    def validate(self) -> bool:
        """Validate training data"""
        if len(self.questions) != len(self.departments):
            raise ValueError("Questions and departments must have the same length")
        
        if len(self.questions) < 10:
            raise ValueError("Need at least 10 samples for training")
            
        return True


@dataclass
class ModelInfo:
    """Domain model for ML model information"""
    name: str
    display_name: str
    is_trained: bool = False
    accuracy: Optional[float] = None
    last_trained: Optional[datetime] = None
    
    @classmethod
    def get_available_models(cls) -> List['ModelInfo']:
        """Get list of available models"""
        return [
            cls("MultinomialNB", "Multinomial Naive Bayes"),
            cls("SVM", "Support Vector Machine"),
            cls("RandomForest", "Random Forest"),
            cls("LogisticRegression", "Logistic Regression")
        ]


@dataclass
class TrainingResult:
    """Domain model for training results"""
    model_info: ModelInfo
    success: bool
    message: str
    accuracy: Optional[float] = None
    total_samples: Optional[int] = None
    trained_at: Optional[datetime] = None
    
    def __post_init__(self):
        if self.trained_at is None:
            self.trained_at = datetime.now()
