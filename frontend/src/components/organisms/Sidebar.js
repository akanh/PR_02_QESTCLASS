import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #3a4f63;
  
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    color: #ecf0f1;
  }
  
  p {
    font-size: 0.8rem;
    color: #bdc3c7;
    margin: 0.5rem 0 0 0;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  right: 1.5rem;
  font-size: 0.7rem;
  color: #7f8c8d;
  text-align: center;
`;

const Sidebar = ({ children }) => {
  return (
    <SidebarContainer>
      <Logo>
        <h2>ML Dashboard</h2>
        <p>Departman Classificaton System</p>
      </Logo>
      
      {children}
      
      <Footer>
        © 2025 ML Dashboard v1.0
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;
