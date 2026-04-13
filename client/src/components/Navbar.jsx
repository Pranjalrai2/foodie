import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'My Orders', path: '/orders', protected: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🔥</span>
            <span className={`text-2xl font-black tracking-tight dark:text-white ${
              scrolled || location.pathname !== '/' ? 'text-text' : 'text-white'
            }`}>
              Foodie
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              (!link.protected || user) && (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`nav-link font-bold ${
                    scrolled || location.pathname !== '/' ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                scrolled || location.pathname !== '/' ? 'text-text dark:text-white hover:bg-gray-100 dark:hover:bg-white/10' : 'text-white hover:bg-white/20'
              }`}
            >
              {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>

            <Link to="/cart" className="relative p-2 transition-transform hover:scale-110">
              <FiShoppingCart className={`h-6 w-6 ${
                scrolled || location.pathname !== '/' ? 'text-text dark:text-white' : 'text-white'
              }`} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white dark:border-[#1A1A1A]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200 dark:border-white/20">
                <div className="flex items-center space-x-2 text-primary">
                  <FiUser className="h-5 w-5" />
                  <span className="font-bold">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">Login</Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-primary p-2">
              {isDarkMode ? <FiSun className="h-6 w-6" /> : <FiMoon className="h-6 w-6" />}
            </button>
            <Link to="/cart" className="relative p-2">
              <FiShoppingCart className="h-6 w-6 dark:text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 ${scrolled || location.pathname !== '/' ? 'text-text dark:text-white' : 'text-white'}`}
            >
              {isOpen ? <FiX className="h-8 w-8" /> : <FiMenu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-0 top-[64px] bg-white dark:bg-[#0F0F0F] z-40 md:hidden flex flex-col p-8 space-y-8"
          >
            {navLinks.map((link) => (
              (!link.protected || user) && (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold dark:text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            <hr className="border-gray-100 dark:border-[#2D2D2D]" />
            {user ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-primary text-xl font-bold">
                  <FiUser className="h-6 w-6" />
                  <span>{user.name}</span>
                </div>
                <button onClick={handleLogout} className="w-full text-left font-bold text-red-500 text-xl">Logout</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary text-center">Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
