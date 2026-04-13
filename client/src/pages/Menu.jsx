import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import FoodCard from '../components/FoodCard';
import { FoodSkeleton } from '../components/Skeleton';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  
  const currentCategory = searchParams.get('category') || 'All';
  const categories = ['All', 'Pizza', 'Burger', 'Sushi', 'Biryani', 'Desserts'];

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const categoryParam = currentCategory === 'All' ? '' : currentCategory;
      const { data } = await API.get(`/foods?category=${categoryParam}&search=${search}`);
      setFoods(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [currentCategory, search]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section with Gradient Text */}
        <div className="text-center mb-16 space-y-4">
            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl md:text-7xl font-poppins font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
                Our Delicious Menu
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-2xl mx-auto">
                Handpicked ingredients, masterfully prepared dishes, and lightning-fast delivery.
            </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="glass p-4 rounded-[32px] mb-12 flex flex-col md:flex-row gap-6 items-center shadow-xl">
            <div className="relative flex-grow w-full">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input 
                    type="text" 
                    placeholder="Search for your favorite dish..." 
                    className="input-field pl-16 h-16 rounded-[24px] bg-white dark:bg-[#0F0F0F] border-none shadow-inner"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 w-full md:w-auto scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSearchParams({ category: cat })}
                        className={`px-8 py-4 rounded-[20px] font-black whitespace-nowrap transition-all duration-300 ${
                        currentCategory === cat 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                            : 'bg-white dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-300 hover:text-primary border border-gray-100 dark:border-white/5'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-10 px-4">
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                Showing <span className="text-primary">{foods.length}</span> Amazing Dishes
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm font-bold">
                <FiFilter className="h-4 w-4" />
                <span>Filter Sort</span>
            </div>
        </div>

        {/* Food Grid */}
        <AnimatePresence mode="wait">
            {loading ? (
                <div key="loader" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                    {[...Array(6)].map((_, i) => <FoodSkeleton key={i} />)}
                </div>
            ) : foods.length > 0 ? (
                <motion.div 
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10"
                >
                    {foods.map((food, index) => (
                        <FoodCard key={food._id} food={food} />
                    ))}
                </motion.div>
            ) : (
                <motion.div 
                    key="empty"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-32 space-y-6"
                >
                    <div className="text-9xl grayscale opacity-20">🍕</div>
                    <h3 className="text-3xl font-poppins font-black dark:text-white">Oops! No dishes found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto font-medium">We couldn't find any dishes matching your criteria. Try adjusting your filters or search terms.</p>
                    <button 
                        onClick={() => { setSearch(''); setSearchParams({ category: 'All' }); }}
                        className="btn-outline"
                    >
                        Clear All Filters
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;
