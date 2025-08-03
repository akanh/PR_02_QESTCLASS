# ML Project - Full Stack Application

This project is a machine learning application built with React frontend and Python FastAPI backend.

## Project Structure

```
PR_02_QESTCLASS/
├── backend/                 # Python FastAPI Backend
│   ├── api/                # API Layer (Routes & Dependencies)
│   ├── business/           # Business Logic Layer
│   ├── common/             # Common/Shared Components
│   ├── main.py            # FastAPI Entry Point
│   ├── requirements.txt   # Python Dependencies
│   ├── Dockerfile         # Backend Docker configuration
│   └── .env              # Environment Variables
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # Atomic Design Components
│   │   │   ├── atoms/     # Basic UI Elements
│   │   │   ├── molecules/ # Component Combinations
│   │   │   └── organisms/ # Complex UI Blocks
│   │   ├── pages/         # Application Pages
│   │   ├── services/      # API Services (Axios)
│   │   ├── hooks/         # Custom React Hooks
│   │   └── utils/         # Utility Functions
│   ├── package.json       # Node.js Dependencies
│   ├── Dockerfile         # Frontend Docker configuration
│   ├── nginx.conf         # Nginx configuration
│   └── .env              # Environment Variables
└── docker-compose.yml     # Docker Compose configuration
```

## Technologies

### Backend
- **FastAPI**: Modern Python web framework
- **scikit-learn**: Machine Learning library
- **pandas**: Data manipulation
- **numpy**: Numerical computing
- **uvicorn**: ASGI server

### Frontend
- **React**: JavaScript UI library
- **Axios**: HTTP client
- **styled-components**: CSS-in-JS styling
- **Atomic Design**: Component organization pattern

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Web server and reverse proxy

## Features

- 🤖 **Machine Learning Models**: Classification and Regression models
- 🎨 **Atomic Design**: Scalable component architecture
- 🔄 **Real-time Predictions**: Instant prediction results
- 📊 **Model Status**: Model status and training information
- 🎯 **N-tier Architecture**: Clean code structure
- 🌐 **CORS Enabled**: Frontend-Backend communication
- 🐳 **Docker Ready**: Containerized deployment

## Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Run the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PR_02_QESTCLASS
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Docs**: http://localhost:8000/docs

### Stop the Application
```bash
docker-compose down
```

## Development Setup

### Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   # or
   venv\\Scripts\\activate  # Windows
   ```

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python main.py
   ```

Backend runs at http://localhost:8000
API documentation: http://localhost:8000/docs

### Frontend

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js packages:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

Frontend runs at http://localhost:3000

## API Endpoints

### Machine Learning
- `GET /api/v1/ml/status` - Model status
- `POST /api/v1/ml/train/classification` - Classification model training
- `POST /api/v1/ml/train/regression` - Regression model training
- `POST /api/v1/ml/predict/classification` - Classification prediction
- `POST /api/v1/ml/predict/regression` - Regression prediction
- `GET /api/v1/ml/health` - Health check

### System
- `GET /` - Main endpoint
- `GET /health` - System health check

## Usage

1. Open the application: http://localhost:3000
2. Check model status
3. Use "Quick Training" to train models with sample data
4. Use "ML Prediction" form to make predictions
5. View results

## Docker Configuration

### Backend Dockerfile
- Python 3.11 slim base image
- Installs system dependencies
- Copies requirements and installs Python packages
- Exposes port 8000
- Runs with uvicorn

### Frontend Dockerfile
- Multi-stage build with Node.js and Nginx
- Builds React application
- Serves with Nginx
- Includes reverse proxy configuration

### Docker Compose
- Backend service on port 8000
- Frontend service on port 3000
- Network configuration for service communication
- Environment variable management

## Development

### Backend Development
- N-tier architecture (API, Business, Common layers)
- Dependency injection pattern
- Error handling and logging
- Pydantic models for validation

### Frontend Development
- Atomic Design pattern
- Custom hooks for state management
- Styled-components for styling
- Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Send a pull request

## License

This project is published under the MIT license.
