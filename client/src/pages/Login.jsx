import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/menu');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-background-light dark:bg-background-dark relative overflow-hidden">
        {/* Background Decorative Blurs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-[40px] shadow-2xl relative z-10 border-white/20"
      >
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[28px] mb-6 text-primary scale-110">
                <FiLogIn className="h-10 w-10 stroke-[2.5]" />
            </div>
            <h2 className="text-4xl font-poppins font-black dark:text-white mb-3">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Ready for your next feast?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-primary ml-1">Email Connection</label>
            <div className="relative group">
              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-5 w-5" />
              <input 
                type="email" 
                required 
                className="input-field pl-14 h-16 rounded-2xl bg-white/50 dark:bg-black/20"
                placeholder="chef@foodie.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-primary ml-1">Password Key</label>
            <div className="relative group">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-5 w-5" />
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                className="input-field pl-14 pr-14 h-16 rounded-2xl bg-white/50 dark:bg-black/20"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full btn-primary py-5 text-xl font-bold rounded-2xl bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/20"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-gray-100 dark:border-white/5">
            <p className="text-gray-500 dark:text-gray-400 font-medium">
                New to the platform? {' '}
                <Link to="/register" className="text-primary font-black hover:underline cursor-pointer">Start Here</Link>
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
