/**
 * Text Atom Component
 */
import React from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  ${props => {
    switch (props.variant) {
      case 'h1':
        return 'font-size: 2.5rem; font-weight: 700; line-height: 1.2;';
      case 'h2':
        return 'font-size: 2rem; font-weight: 600; line-height: 1.3;';
      case 'h3':
        return 'font-size: 1.75rem; font-weight: 600; line-height: 1.3;';
      case 'h4':
        return 'font-size: 1.5rem; font-weight: 500; line-height: 1.4;';
      case 'h5':
        return 'font-size: 1.25rem; font-weight: 500; line-height: 1.4;';
      case 'h6':
        return 'font-size: 1rem; font-weight: 500; line-height: 1.5;';
      case 'body':
        return 'font-size: 1rem; font-weight: 400; line-height: 1.5;';
      case 'small':
        return 'font-size: 0.875rem; font-weight: 400; line-height: 1.4;';
      case 'caption':
        return 'font-size: 0.75rem; font-weight: 400; line-height: 1.3;';
      default:
        return 'font-size: 1rem; font-weight: 400; line-height: 1.5;';
    }
  }}

  color: ${props => props.color || '#212529'};
  
  ${props => props.weight && `font-weight: ${props.weight};`}
  ${props => props.align && `text-align: ${props.align};`}
  ${props => props.italic && 'font-style: italic;'}
  ${props => props.underline && 'text-decoration: underline;'}
  
  display: ${props => props.block ? 'block' : 'inline'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
`;

const Text = ({
  children,
  variant = 'body',
  as,
  color,
  weight,
  align,
  italic = false,
  underline = false,
  block = false,
  margin,
  padding,
  ...props
}) => {
  const elementType = as || getDefaultTag(variant);
  
  return (
    <StyledText
      as={elementType}
      variant={variant}
      color={color}
      weight={weight}
      align={align}
      italic={italic}
      underline={underline}
      block={block}
      margin={margin}
      padding={padding}
      {...props}
    >
      {children}
    </StyledText>
  );
};

const getDefaultTag = (variant) => {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant;
    case 'body':
    case 'small':
    case 'caption':
    default:
      return 'span';
  }
};

export default Text;
