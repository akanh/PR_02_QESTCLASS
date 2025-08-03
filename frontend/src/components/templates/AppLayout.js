import React from 'react';
import styled from 'styled-components';
import Sidebar from '../organisms/Sidebar';
import Navigation from '../molecules/Navigation';
import PageHeader from '../molecules/PageHeader';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  min-height: 100vh;
  background: #f8f9fa;
`;

const ContentArea = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AppLayout = ({ activeMenu, onMenuChange, children, title, subtitle }) => {
  return (
    <LayoutContainer>
      <Sidebar>
        <Navigation activeMenu={activeMenu} onMenuChange={onMenuChange} />
      </Sidebar>
      <MainContent>
        <PageHeader title={title} subtitle={subtitle} />
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default AppLayout;
