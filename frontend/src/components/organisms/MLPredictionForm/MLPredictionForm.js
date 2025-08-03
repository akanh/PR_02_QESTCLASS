/**
 * MLPredictionForm Organism Component
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import FormField from '../../molecules/FormField';

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
`;

const ResultContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  background-color: ${props => props.success ? '#d4edda' : '#f8d7da'};
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
`;

const MLPredictionForm = ({ onPredict, loading = false, result = null, error = null }) => {
  const [features, setFeatures] = useState(['', '', '', '']);
  const [modelType, setModelType] = useState('classification');

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate features
    const numericFeatures = features.map(f => parseFloat(f)).filter(f => !isNaN(f));
    
    if (numericFeatures.length !== features.length) {
      alert('Please enter valid numeric values for all features');
      return;
    }

    onPredict && onPredict({
      features: numericFeatures,
      modelType
    });
  };

  const handleClear = () => {
    setFeatures(['', '', '', '']);
  };

  return (
    <FormContainer>
      <Text variant="h4" block margin="0 0 24px 0" align="center">
        ML Prediction
      </Text>
      
      <form onSubmit={handleSubmit}>
        <ButtonGroup>
          <Button
            type="button"
            variant={modelType === 'classification' ? 'primary' : 'default'}
            onClick={() => setModelType('classification')}
          >
            Classification
          </Button>
          <Button
            type="button"
            variant={modelType === 'regression' ? 'primary' : 'default'}
            onClick={() => setModelType('regression')}
          >
            Regression
          </Button>
        </ButtonGroup>

        <Text variant="h6" block margin="0 0 16px 0">
          Features
        </Text>
        
        <FormGrid>
          {features.map((feature, index) => (
            <FormField
              key={index}
              label={`Feature ${index + 1}`}
              type="number"
              step="any"
              placeholder="Enter numeric value"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              required
            />
          ))}
        </FormGrid>

        <ButtonGroup>
          <Button
            type="submit"
            variant="success"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </Button>
        </ButtonGroup>
      </form>

      {result && (
        <ResultContainer success={!error}>
          <Text variant="h6" block margin="0 0 8px 0">
            Prediction Result:
          </Text>
          <Text variant="body" weight="600">
            {typeof result === 'object' ? JSON.stringify(result, null, 2) : result}
          </Text>
        </ResultContainer>
      )}

      {error && (
        <ResultContainer success={false}>
          <Text variant="h6" block margin="0 0 8px 0" color="#721c24">
            Error:
          </Text>
          <Text variant="body" color="#721c24">
            {error}
          </Text>
        </ResultContainer>
      )}
    </FormContainer>
  );
};

export default MLPredictionForm;
