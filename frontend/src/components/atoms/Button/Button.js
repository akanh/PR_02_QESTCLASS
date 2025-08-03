/**
 * Button Atom Component
 */
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #007bff;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0056b3;
          }
        `;
      case 'secondary':
        return `
          background-color: #6c757d;
          color: white;
          &:hover:not(:disabled) {
            background-color: #545b62;
          }
        `;
      case 'success':
        return `
          background-color: #28a745;
          color: white;
          &:hover:not(:disabled) {
            background-color: #1e7e34;
          }
        `;
      case 'danger':
        return `
          background-color: #dc3545;
          color: white;
          &:hover:not(:disabled) {
            background-color: #c82333;
          }
        `;
      default:
        return `
          background-color: #f8f9fa;
          color: #212529;
          border: 1px solid #dee2e6;
          &:hover:not(:disabled) {
            background-color: #e2e6ea;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.fullWidth && 'width: 100%;'}
  ${props => props.size === 'small' && 'padding: 8px 16px; font-size: 14px;'}
  ${props => props.size === 'large' && 'padding: 16px 32px; font-size: 18px;'}
`;

const Button = ({
  children,
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
