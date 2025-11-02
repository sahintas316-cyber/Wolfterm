import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log errors so we can see them on Netlify
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h1 style={{ color: '#b91c1c' }}>Bir hata oluştu</h1>
          <p>Lütfen sayfayı yenileyin. Sorun devam ederse bize bildirin.</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f3f4f6', padding: 12 }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;