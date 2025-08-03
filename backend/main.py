"""
FastAPI Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.ml_routes import router as ml_router
from common.config import settings
from common.utils import setup_logging

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
