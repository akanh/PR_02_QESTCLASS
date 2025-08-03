/**
 * Custom hook for ML API operations
 */
import { useState, useCallback } from 'react';
import { mlService } from '../services/mlService';

export const useML = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modelStatus, setModelStatus] = useState(null);

  const handleError = useCallback((err) => {
    const errorMessage = err.response?.data?.detail || err.message || 'An error occurred';
    setError(errorMessage);
    console.error('ML API Error:', err);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getModelStatus = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const response = await mlService.getModelStatus();
      setModelStatus(response.data);
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError]);

  const trainModel = useCallback(async (modelType, data) => {
    try {
      setLoading(true);
      clearError();
      
      let response;
      if (modelType === 'classification') {
        response = await mlService.trainClassification(data);
      } else {
        response = await mlService.trainRegression(data);
      }
      
      // Refresh model status after training
      await getModelStatus();
      
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError, getModelStatus]);

  const predict = useCallback(async (modelType, features) => {
    try {
      setLoading(true);
      clearError();
      
      let response;
      if (modelType === 'classification') {
        response = await mlService.predictClassification(features);
      } else {
        response = await mlService.predictRegression(features);
      }
      
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError]);

  const healthCheck = useCallback(async () => {
    try {
      const response = await mlService.healthCheck();
      return response;
    } catch (err) {
      handleError(err);
      throw err;
    }
  }, [handleError]);

  return {
    loading,
    error,
    modelStatus,
    getModelStatus,
    trainModel,
    predict,
    healthCheck,
    clearError
  };
};
