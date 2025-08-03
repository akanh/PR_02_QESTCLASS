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
        return 'Departman Sınıflandırma';
      case 'models':
        return 'ML Modelleri';
      case 'analytics':
        return 'Analitik';
      case 'settings':
        return 'Ayarlar';
      case 'help':
        return 'Yardım';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeMenu) {
      case 'home':
        return 'Departman sınıflandırma sistemine hoş geldiniz';
      case 'classification':
        return 'Sorularınızı doğru departmana yönlendirin';
      case 'models':
        return 'Machine Learning modellerini yönetin';
      case 'analytics':
        return 'Sistem performansını analiz edin';
      case 'settings':
        return 'Sistem ayarlarını düzenleyin';
      case 'help':
        return 'Yardım ve dokümantasyon';
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
          <p>Bu sayfa geliştirilme aşamasında...</p>
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
          <h2>Yardım</h2>
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
