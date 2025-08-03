"""
FastAPI Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.ml_routes import router as ml_router
from api.routes.classification_routes import router as classification_router
from common.config import settings
from common.utils import setup_logging
from business.services.classification_service import classification_service
from business.services.training_data import get_training_data

# Setup logging
logger = setup_logging()

# Create FastAPI application
app = FastAPI(
    title="ML API Service",
    description="Machine Learning API using FastAPI and scikit-learn",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ml_router, prefix=f"/api/{settings.api_version}")
app.include_router(
    classification_router,
    prefix=f"/api/{settings.api_version}"
)


@app.on_event("startup")
async def startup_event():
    """Initialize application on startup"""
    logger.info("Starting ML API Service...")
    
    try:
        # Try to load existing models first
        load_result = classification_service.load_models()
        if load_result["success"] and len(load_result["loaded_models"]) > 1:
            logger.info("Successfully loaded existing models from disk")
        else:
            # If no models found, train with sample data
            logger.info("No existing models found. Training with sample data...")
            sample_data = get_training_data()
            
            train_result = classification_service.train_models(
                questions=sample_data["questions"],
                departments=sample_data["departments"]
            )
            
            if train_result["success"]:
                logger.info("Models trained successfully on startup")
                logger.info(f"Training results: {train_result['message']}")
                
                # Save the trained models
                save_result = classification_service.save_models()
                if save_result["success"]:
                    logger.info("Models saved to disk successfully")
                else:
                    logger.warning(
                        f"Failed to save models: {save_result['message']}"
                    )
            else:
                logger.error(
                    f"Failed to train models on startup: "
                    f"{train_result['message']}"
                )
                
    except Exception as e:
        logger.error(f"Error during startup initialization: {str(e)}")
        # Continue startup even if training fails
    
    logger.info("ML API Service startup completed")


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ML API Service",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=True if settings.environment == "development" else False
    )
