import React, { useState } from 'react';
import styled from 'styled-components';
import ClassificationForm from '../components/organisms/ClassificationForm';
import ClassificationResults from '../components/organisms/ClassificationResults';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const DepartmentClassificationPage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async ({ question, model }) => {
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8001/api/v1/classify-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          model: model
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('An error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ClassificationForm onSubmit={handleSubmit} loading={loading} />
      <ClassificationResults results={results} loading={loading} error={error} />
    </Container>
  );
};

export default DepartmentClassificationPage;
