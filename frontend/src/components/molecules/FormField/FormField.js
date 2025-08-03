/**
 * FormField Molecule Component
 */
import React from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';

const FieldContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #212529;
`;

const FormField = ({
  label,
  required = false,
  error,
  errorMessage,
  ...inputProps
}) => {
  return (
    <FieldContainer>
      {label && (
        <Label>
          {label}
          {required && <Text color="#dc3545"> *</Text>}
        </Label>
      )}
      <Input
        error={error}
        errorMessage={errorMessage}
        {...inputProps}
      />
    </FieldContainer>
  );
};

export default FormField;
