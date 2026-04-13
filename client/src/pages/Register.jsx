import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-background-light dark:bg-background-dark relative overflow-hidden">
        {/* Background Decorative Blurs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-[40px] shadow-2xl relative z-10 border-white/20"
      >
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[28px] mb-6 text-primary scale-110">
                <FiUserPlus className="h-10 w-10 stroke-[2.5]" />
            </div>
            <h2 className="text-4xl font-poppins font-black dark:text-white mb-3">Join Foodie</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Create your credentials to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-primary ml-1">Full Name</label>
            <div className="relative group">
              <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-5 w-5" />
              <input 
                type="text" 
                required 
                className="input-field pl-14 h-16 rounded-2xl bg-white/50 dark:bg-black/20"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-primary ml-1">Email Address</label>
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
            <label className="text-xs font-black uppercase tracking-widest text-primary ml-1">Secure Password</label>
            <div className="relative group">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-5 w-5" />
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                minLength={6}
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
            {isSubmitting ? 'Creating Profile...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-gray-100 dark:border-white/5">
            <p className="text-gray-500 dark:text-gray-400 font-medium">
                Already part of the squad? {' '}
                <Link to="/login" className="text-primary font-black hover:underline cursor-pointer">Login Now</Link>
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
