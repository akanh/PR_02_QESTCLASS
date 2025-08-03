# Frontend - ML Prediction App

React ile oluşturulmuş Machine Learning tahmin uygulaması.

## Mimari

### Atomic Design Pattern

```
components/
├── atoms/              # En küçük UI bileşenleri
│   ├── Button/        # Button component
│   ├── Input/         # Input component
│   └── Text/          # Text component
├── molecules/          # Atom kombinasyonları
│   └── FormField/     # Input + Label
├── organisms/          # Büyük UI blokları
│   ├── Header/        # App header
│   └── MLPredictionForm/  # ML prediction form
└── templates/          # Sayfa şablonları
    └── PageLayout/    # Page layout template
```

## Kurulum

1. Node.js paketlerini yükleyin:
   ```bash
   npm install
   ```

2. Uygulamayı geliştirme modunda çalıştırın:
   ```bash
   npm start
   ```

3. Üretim için build:
   ```bash
   npm run build
   ```

## Teknolojiler

- **React 18**: UI library
- **Axios**: HTTP client
- **styled-components**: CSS-in-JS
- **Custom Hooks**: State management

## Bileşen Yapısı

### Atoms (Atomlar)
En küçük UI bileşenleri:
- `Button`: Çeşitli varyantlarda butonlar
- `Input`: Form input elemanları
- `Text`: Typography bileşeni

### Molecules (Moleküller)
Atom kombinasyonları:
- `FormField`: Label + Input kombinasyonu

### Organisms (Organizmalar)
Büyük UI blokları:
- `Header`: Uygulama başlığı
- `MLPredictionForm`: ML tahmin formu

## Services

### API Client
```javascript
// services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000
});
```

### ML Service
```javascript
// services/mlService.js
export const mlService = {
  getModelStatus: () => apiClient.get('/ml/status'),
  trainClassification: (data) => apiClient.post('/ml/train/classification', { data }),
  predictClassification: (features) => apiClient.post('/ml/predict/classification', { features })
};
```

## Custom Hooks

### useML Hook
ML API işlemlerini yöneten custom hook:

```javascript
const {
  loading,
  error,
  modelStatus,
  getModelStatus,
  trainModel,
  predict,
  healthCheck,
  clearError
} = useML();
```

## Sayfa Yapısı

### HomePage
Ana sayfa bileşeni:
- Model durumu görüntüleme
- Hızlı model eğitimi
- ML tahmin formu
- Sonuç görüntüleme

## Styling

Styled-components kullanılarak:
- Component-scoped styling
- Theme consistency
- Responsive design
- CSS-in-JS benefits

## Konfigürasyon

`.env` dosyası:
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
REACT_APP_API_TIMEOUT=10000
```

## Özellikler

- 🎯 **Atomic Design**: Skalable component architecture
- 🔄 **Real-time Updates**: Anlık API komunikasyonu
- 📱 **Responsive**: Mobil uyumlu tasarım
- 🎨 **Modern UI**: Clean ve kullanıcı dostu arayüz
- ⚡ **Performance**: Optimized React hooks
- 🛡️ **Error Handling**: Comprehensive error management
