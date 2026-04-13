import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8"
      >
        <div className="relative inline-block">
            <h1 className="text-[150px] font-poppins font-black text-primary/10 dark:text-primary/5 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl animate-bounce">🍕</span>
            </div>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-4xl font-poppins font-black dark:text-white">Where's the beef?</h2>
            <p className="text-gray-500 font-medium max-w-md mx-auto">
                The page you're looking for seems to have been eaten by a very hungry developer. Let's get you back to safety.
            </p>
        </div>

        <Link to="/" className="btn-primary inline-flex items-center space-x-2">
          <FiHome className="h-5 w-5" />
          <span>Go Back Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
