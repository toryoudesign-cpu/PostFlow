import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Automated Error Boundary for Mobile / Production Auto-Recovery
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('PostFlow App Crash Caught:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          backgroundColor: '#FAFAFA',
          color: '#262626'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px',
            marginBottom: '16px'
          }}>
            PF
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            Recarregando PostFlow AI
          </h2>
          <p style={{ fontSize: '13px', color: '#737373', maxWidth: '340px', marginBottom: '24px' }}>
            Identificamos uma versão anterior em cache no seu navegador. Clique no botão abaixo para restaurar o acesso instantâneo:
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '12px 28px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(to right, #833AB4, #E1306C, #FD1D1D)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(225, 48, 108, 0.3)'
            }}
          >
            Limpar Memória Antiga & Abrir App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>,
);
