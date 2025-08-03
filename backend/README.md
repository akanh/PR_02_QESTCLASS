# Backend - ML API Service

FastAPI ile oluşturulmuş Machine Learning API servisi.

## Mimari

### N-tier Architecture

```
api/                    # API Layer
├── routes/            # API Routes
│   └── ml_routes.py   # ML endpoints
└── dependencies.py    # Dependency injection

business/              # Business Logic Layer
├── services/          # Business services
│   └── ml_service.py  # ML business logic
└── models/            # ML models
    └── ml_models.py   # Scikit-learn models

common/                # Common Layer
├── config.py          # Configuration
├── exceptions.py      # Custom exceptions
└── utils.py          # Utility functions
```

## Kurulum

1. Sanal ortam oluşturun:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. Gereksinimları yükleyin:
   ```bash
   pip install -r requirements.txt
   ```

3. Uygulamayı çalıştırın:
   ```bash
   python main.py
   ```

## API Dokümantasyonu

Uygulama çalıştıktan sonra:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoint'ler

### ML Service
- `GET /api/v1/ml/status` - Model durumları
- `POST /api/v1/ml/train/classification` - Classification model eğitimi
- `POST /api/v1/ml/train/regression` - Regression model eğitimi
- `POST /api/v1/ml/predict/classification` - Classification tahmini
- `POST /api/v1/ml/predict/regression` - Regression tahmini

### Örnek Kullanım

```python
import requests

# Model durumu
response = requests.get("http://localhost:8000/api/v1/ml/status")

# Model eğitimi
training_data = {
    "data": [
        {"feature1": 1, "feature2": 2, "target": 0},
        {"feature1": 3, "feature2": 4, "target": 1}
    ]
}
response = requests.post(
    "http://localhost:8000/api/v1/ml/train/classification", 
    json=training_data
)

# Tahmin
prediction_data = {"features": [1.5, 2.5]}
response = requests.post(
    "http://localhost:8000/api/v1/ml/predict/classification",
    json=prediction_data
)
```

## Konfigürasyon

`.env` dosyası:
```env
ENVIRONMENT=development
API_VERSION=v1
HOST=localhost
PORT=8000
CORS_ORIGINS=http://localhost:3000
```

## Modeller

### Classification Model
- **Algoritma**: Random Forest Classifier
- **Parametreler**: n_estimators=100, random_state=42
- **Metrik**: Accuracy

### Regression Model
- **Algoritma**: Linear Regression
- **Metrik**: Mean Squared Error
