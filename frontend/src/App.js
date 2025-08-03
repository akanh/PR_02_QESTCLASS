/**
 * Main App Component
 */
import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import AppLayout from './components/templates/AppLayout';
import HomePageNew from './pages/HomePageNew';
import DepartmentClassificationPage from './pages/DepartmentClassificationPage';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    color: #212529;
    line-height: 1.5;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
  }
`;

function App() {
  const [activeMenu, setActiveMenu] = useState('classification');

  const getPageTitle = () => {
    switch (activeMenu) {
      case 'home':
        return 'Ana Sayfa';
      case 'classification':
        return 'Department Classification';
      case 'models':
        return 'ML Modelleri';
      case 'analytics':
        return 'Analitik';
      case 'settings':
        return 'Ayarlar';
      case 'help':
        return 'Help';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeMenu) {
      case 'home':
        return 'Welcome to the department classification system';
      case 'classification':
        return 'Route your questions to the correct department';
      case 'models':
        return 'Manage Machine Learning models';
      case 'analytics':
        return 'Analyze system performance';
      case 'settings':
        return 'Edit system settings';
      case 'help':
        return 'Help and documentation';
      default:
        return '';
    }
  };

  const renderPage = () => {
    switch (activeMenu) {
      case 'home':
        return <HomePageNew />;
      case 'classification':
        return <DepartmentClassificationPage />;
      case 'models':
        return <div style={{textAlign: 'center', padding: '3rem'}}>
          <h2>ML Modelleri</h2>
          <p>This page is under development...</p>
        </div>;
      case 'analytics':
        return <div style={{textAlign: 'center', padding: '3rem'}}>
          <h2>Analitik</h2>
          <p>Bu sayfa geliştirilme aşamasında...</p>
        </div>;
      case 'settings':
        return <div style={{textAlign: 'center', padding: '3rem'}}>
          <h2>Ayarlar</h2>
          <p>Bu sayfa geliştirilme aşamasında...</p>
        </div>;
      case 'help':
        return <div style={{textAlign: 'center', padding: '3rem'}}>
          <h2>Help</h2>
          <p>Bu sayfa geliştirilme aşamasında...</p>
        </div>;
      default:
        return <DepartmentClassificationPage />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppLayout
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        title={getPageTitle()}
        subtitle={getPageSubtitle()}
      >
        {renderPage()}
      </AppLayout>
    </>
  );
}

export default App;
