import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="h-16 w-16 border-4 border-primary/20 border-t-primary rounded-full shadow-lg"
        />
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center text-2xl"
        >
          🍕
        </motion.span>
      </div>
      <p className="font-poppins font-bold text-primary animate-pulse">Preparing your deliciousness...</p>
    </div>
  );
};

export default Spinner;
