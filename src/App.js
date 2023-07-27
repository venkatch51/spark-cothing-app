import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import AppRoutes from './routes/AppRoutes/AppRoutes';
import './App.css';
import { ProductProvider } from './contexts/ProductContext';
function App () {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <HashRouter>
          <div className="App">
            <Header />
            <main className="container mt-5 pt-4">
              <ProductProvider>
                <AppRoutes />
              </ProductProvider>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
