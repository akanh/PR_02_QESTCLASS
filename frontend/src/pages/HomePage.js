/**
 * Home Page Component
 */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/organisms/Header';
import MLPredictionForm from '../components/organisms/MLPredictionForm';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import { useML } from '../hooks/useML';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const StatusSection = styled.section`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 16px;
`;

const StatusCard = styled.div`
  padding: 16px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: ${props => props.trained ? '#d4edda' : '#fff3cd'};
`;

const TrainingSection = styled.section`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
`;

const HomePage = () => {
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

  const [predictionResult, setPredictionResult] = useState(null);
  const [predictionError, setPredictionError] = useState(null);

  useEffect(() => {
    // Check model status on component mount
    getModelStatus();
    
    // Health check
    healthCheck().catch(console.error);
  }, [getModelStatus, healthCheck]);

  const handlePredict = async ({ features, modelType }) => {
    try {
      setPredictionError(null);
      setPredictionResult(null);
      
      const response = await predict(modelType, features);
      setPredictionResult(response.data);
    } catch (err) {
      setPredictionError(err.message || 'Prediction failed');
    }
  };

  const handleTrainSampleData = async (modelType) => {
    try {
      let sampleData;
      
      if (modelType === 'classification') {
        // Sample classification data (iris-like dataset)
        sampleData = [
          { feature1: 5.1, feature2: 3.5, feature3: 1.4, feature4: 0.2, target: 0 },
          { feature1: 4.9, feature2: 3.0, feature3: 1.4, feature4: 0.2, target: 0 },
          { feature1: 7.0, feature2: 3.2, feature3: 4.7, feature4: 1.4, target: 1 },
          { feature1: 6.4, feature2: 3.2, feature3: 4.5, feature4: 1.5, target: 1 },
          { feature1: 6.3, feature2: 3.3, feature3: 6.0, feature4: 2.5, target: 2 },
          { feature1: 5.8, feature2: 2.7, feature3: 5.1, feature4: 1.9, target: 2 }
        ];
      } else {
        // Sample regression data
        sampleData = [
          { feature1: 1, feature2: 2, feature3: 3, feature4: 4, target: 10 },
          { feature1: 2, feature2: 3, feature3: 4, feature4: 5, target: 14 },
          { feature1: 3, feature2: 4, feature3: 5, feature4: 6, target: 18 },
          { feature1: 4, feature2: 5, feature3: 6, feature4: 7, target: 22 },
          { feature1: 5, feature2: 6, feature3: 7, feature4: 8, target: 26 }
        ];
      }

      await trainModel(modelType, sampleData);
      alert(`${modelType} model trained successfully!`);
    } catch (err) {
      alert(`Training failed: ${err.message}`);
    }
  };

  return (
    <PageContainer>
      <Header title="ML Prediction App" />
      
      <MainContent>
        <StatusSection>
          <Text variant="h5" block margin="0 0 16px 0">
            Model Status
          </Text>
          
          {loading && <Text>Loading...</Text>}
          
          {modelStatus && (
            <StatusGrid>
              <StatusCard trained={modelStatus.classification_model?.is_trained}>
                <Text variant="h6" block margin="0 0 8px 0">
                  Classification Model
                </Text>
                <Text variant="small">
                  Type: {modelStatus.classification_model?.model_type}
                </Text>
                <Text variant="small" block>
                  Status: {modelStatus.classification_model?.is_trained ? 'Trained' : 'Not Trained'}
                </Text>
              </StatusCard>
              
              <StatusCard trained={modelStatus.regression_model?.is_trained}>
                <Text variant="h6" block margin="0 0 8px 0">
                  Regression Model
                </Text>
                <Text variant="small">
                  Type: {modelStatus.regression_model?.model_type}
                </Text>
                <Text variant="small" block>
                  Status: {modelStatus.regression_model?.is_trained ? 'Trained' : 'Not Trained'}
                </Text>
              </StatusCard>
            </StatusGrid>
          )}
          
          <ButtonGroup>
            <Button variant="primary" onClick={getModelStatus} disabled={loading}>
              Refresh Status
            </Button>
          </ButtonGroup>
        </StatusSection>

        <TrainingSection>
          <Text variant="h5" block margin="0 0 16px 0">
            Quick Training
          </Text>
          <Text variant="body" block margin="0 0 20px 0">
            Train models with sample data to test predictions:
          </Text>
          
          <ButtonGroup>
            <Button 
              variant="success" 
              onClick={() => handleTrainSampleData('classification')}
              disabled={loading}
            >
              Train Classification Model
            </Button>
            <Button 
              variant="success" 
              onClick={() => handleTrainSampleData('regression')}
              disabled={loading}
            >
              Train Regression Model
            </Button>
          </ButtonGroup>
        </TrainingSection>

        <MLPredictionForm
          onPredict={handlePredict}
          loading={loading}
          result={predictionResult}
          error={predictionError || error}
        />

        {error && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="secondary" onClick={clearError}>
              Clear Error
            </Button>
          </div>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default HomePage;
