import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResultTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DepartmentResult = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid ${props => props.isHighest ? '#28a745' : '#dee2e6'};
`;

const DepartmentName = styled.span`
  font-weight: ${props => props.isHighest ? 'bold' : 'normal'};
  color: ${props => props.isHighest ? '#28a745' : '#333'};
`;

const Confidence = styled.span`
  font-weight: bold;
  color: ${props => props.isHighest ? '#28a745' : '#666'};
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: ${props => props.isHighest ? '#28a745' : '#6c757d'};
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ClassificationResults = ({ results, loading, error }) => {
  const departments = ['HR', 'Finance', 'IT', 'Production', 'Sales'];

  const getHighestConfidenceDept = () => {
    if (!results?.predictions) return null;
    return Object.keys(results.predictions).reduce((a, b) => 
      results.predictions[a] > results.predictions[b] ? a : b
    );
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (loading) {
    return (
      <LoadingSpinner>
        Sorunuz analiz ediliyor...
      </LoadingSpinner>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <ResultsContainer>
      <ResultTitle>Tahmin Sonuçları</ResultTitle>
      {departments.map(dept => {
        const confidence = results.predictions[dept] || 0;
        const isHighest = dept === getHighestConfidenceDept();
        return (
          <DepartmentResult key={dept} isHighest={isHighest}>
            <DepartmentName isHighest={isHighest}>
              {dept}
            </DepartmentName>
            <ProgressBar>
              <Progress 
                percentage={confidence * 100} 
                isHighest={isHighest}
              />
            </ProgressBar>
            <Confidence isHighest={isHighest}>
              %{(confidence * 100).toFixed(1)}
            </Confidence>
          </DepartmentResult>
        );
      })}
    </ResultsContainer>
  );
};

export default ClassificationResults;
