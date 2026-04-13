import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Components
import ScrollToTop from './components/ScrollToTop';
import PromoBanner from './components/PromoBanner';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <PromoBanner />
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
