import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SelectContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  font-family: inherit;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;
  font-family: inherit;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const ClassificationForm = ({ onSubmit, loading }) => {
  const [question, setQuestion] = React.useState('');
  const [selectedModel, setSelectedModel] = React.useState('MultinomialNB');

  const models = [
    { value: 'MultinomialNB', label: 'Multinomial Naive Bayes' },
    { value: 'SVM', label: 'Support Vector Machine' },
    { value: 'RandomForest', label: 'Random Forest' },
    { value: 'LogisticRegression', label: 'Logistic Regression' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit({ question: question.trim(), model: selectedModel });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="question">Enter your question:</Label>
      <TextArea
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: How is salary calculation done?"
      />
      
      <SelectContainer>
        <Label htmlFor="model">Select Model:</Label>
        <Select
          id="model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map(model => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </Select>
      </SelectContainer>
      
      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Analyzing...' : 'Predict Department'}
      </SubmitButton>
    </FormContainer>
  );
};

export default ClassificationForm;
