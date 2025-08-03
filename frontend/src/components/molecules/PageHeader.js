import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e9ecef;
  
  h1 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  p {
    margin: 0.5rem 0 0 0;
    color: #6c757d;
    font-size: 0.9rem;
  }
`;

const PageHeader = ({ title, subtitle }) => {
  return (
    <HeaderContainer>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </HeaderContainer>
  );
};

export default PageHeader;
