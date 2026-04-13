import { FiStar, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="premium-card group h-full flex flex-col"
    >
      <div className="relative h-56 overflow-hidden rounded-t-[16px]">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-primary font-bold text-xs rounded-full shadow-sm">
            {food.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
          <FiStar className="h-4 w-4 text-primary fill-primary" />
          <span className="text-xs font-black dark:text-white">{food.rating}</span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-poppins font-bold text-xl dark:text-white transition-colors group-hover:text-primary leading-tight line-clamp-1">{food.name}</h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px] leading-relaxed">
          {food.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Price</span>
            <span className="text-primary font-black text-2xl">₹{food.price}</span>
          </div>
          <button 
            onClick={() => addToCart(food)}
            className="p-4 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-90 flex items-center justify-center"
          >
            <FiPlus className="h-6 w-6 stroke-[3]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
