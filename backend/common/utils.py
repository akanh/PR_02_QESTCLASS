"""
Utility functions for the application
"""
import logging
from typing import Any, Dict
from datetime import datetime


def setup_logging():
    """Setup application logging"""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    return logging.getLogger(__name__)


def format_response(data: Any, message: str = "Success") -> Dict[str, Any]:
    """Format API response"""
    return {
        "success": True,
        "message": message,
        "data": data,
        "timestamp": datetime.now().isoformat()
    }


def format_error_response(error: str, details: Any = None) -> Dict[str, Any]:
    """Format error response"""
    return {
        "success": False,
        "error": error,
        "details": details,
        "timestamp": datetime.now().isoformat()
    }
