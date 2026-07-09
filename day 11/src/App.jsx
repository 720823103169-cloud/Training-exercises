import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CompareDrawer from './components/CompareDrawer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        {/* Main Content Area */}
        <main style={{ flexGrow: 1, backgroundColor: 'var(--bg-primary)', transition: 'background-color var(--transition-smooth)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>

        <Footer />
        <CompareDrawer />
        <Toast />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
