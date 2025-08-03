/**
 * ML API Service
 */
import apiClient from './apiClient';

export const mlService = {
  // Get model status
  getModelStatus: async () => {
    const response = await apiClient.get('/ml/status');
    return response.data;
  },

  // Train classification model
  trainClassification: async (data) => {
    const response = await apiClient.post('/ml/train/classification', { data });
    return response.data;
  },

  // Train regression model
  trainRegression: async (data) => {
    const response = await apiClient.post('/ml/train/regression', { data });
    return response.data;
  },

  // Make classification prediction
  predictClassification: async (features) => {
    const response = await apiClient.post('/ml/predict/classification', { features });
    return response.data;
  },

  // Make regression prediction
  predictRegression: async (features) => {
    const response = await apiClient.post('/ml/predict/regression', { features });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/ml/health');
    return response.data;
  },
};
