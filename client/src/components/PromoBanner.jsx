import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white py-2 px-4 relative flex items-center justify-center text-sm font-bold">
      <p className="mr-2">🎉 Free delivery on orders above ₹299!</p>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 hover:bg-white/20 p-1 rounded-full transition-colors"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PromoBanner;
