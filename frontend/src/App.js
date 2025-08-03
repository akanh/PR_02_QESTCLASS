/**
 * Main App Component
 */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import HomePage from './pages/HomePage';

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
  return (
    <>
      <GlobalStyle />
      <HomePage />
    </>
  );
}

export default App;
