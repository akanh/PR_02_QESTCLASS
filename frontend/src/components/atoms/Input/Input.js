/**
 * Input Atom Component
 */
import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &:disabled {
    background-color: #f8f9fa;
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #6c757d;
  }

  ${props => props.error && `
    border-color: #dc3545;
    &:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
  `}

  ${props => props.size === 'small' && 'padding: 8px 12px; font-size: 14px;'}
  ${props => props.size === 'large' && 'padding: 16px 20px; font-size: 18px;'}
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  errorMessage,
  size = 'medium',
  ...props
}) => {
  return (
    <div>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        error={error}
        size={size}
        {...props}
      />
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default Input;
