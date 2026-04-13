import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiTruck, FiUsers, FiClock } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import API from '../api/axios';
import FoodCard from '../components/FoodCard';
import { FoodSkeleton } from '../components/Skeleton';

const Home = () => {
    const [popularFoods, setPopularFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const { data } = await API.get('/foods?limit=4');
                setPopularFoods(data.data.slice(0, 4));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopular();
    }, []);

    const stats = [
        { icon: <FiUsers />, value: "50k+", label: "Happy Customers" },
        { icon: <FiCheckCircle />, value: "500+", label: "Verified Restaurants" },
        { icon: <FiTruck />, value: "30 min", label: "Fastest Delivery" },
        { icon: <FiClock />, value: "24/7", label: "Support Available" },
    ];

    return (
        <div className="overflow-hidden">
            {/* Premium Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 to-transparent dark:from-[#0F0F0F] dark:via-[#0F0F0F]/80 z-10" />
                    <img 
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-black rounded-full mb-6">
                                🍕 THE FASTEST DELIVERY IN TOWN
                            </span>
                            <h1 className="text-6xl md:text-8xl font-poppins font-black leading-[1.1] dark:text-white mb-8">
                                Delicious Food <br />
                                <span className="text-primary italic">Delivered</span> to <br />
                                Your Door
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-lg leading-relaxed">
                                Craving something yummy? We connect you with the best local restaurants for a taste experience like no other.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/menu" className="btn-primary flex items-center space-x-2 text-lg py-4 px-10">
                                    <span>Order Now</span>
                                    <FiArrowRight className="h-5 w-5" />
                                </Link>
                                <Link to="/menu" className="btn-outline text-lg py-4 px-10">
                                    Explore Menu
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:block relative"
                        >
                            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                            <img 
                                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" 
                                alt="Featured Dish" 
                                className="relative z-10 w-full h-[600px] object-cover rounded-[40px] shadow-2xl animate-float border-8 border-white dark:border-[#1A1A1A]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary/5 dark:bg-primary/10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center space-y-2 p-6 rounded-3xl bg-white dark:bg-[#1A1A1A] shadow-sm"
                            >
                                <div className="text-3xl text-primary flex justify-center">{stat.icon}</div>
                                <h3 className="text-3xl font-black dark:text-white font-poppins">{stat.value}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-32 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-poppins font-black dark:text-white">Popular Categories</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium">Explore dishes from around the world, carefully curated for your taste preferences.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {[
                            { name: 'Pizza', icon: '🍕' },
                            { name: 'Burger', icon: '🍔' },
                            { name: 'Sushi', icon: '🍣' },
                            { name: 'Biryani', icon: '🍛' },
                            { name: 'Desserts', icon: '🍰' }
                        ].map((cat, i) => (
                            <motion.div
                                key={cat.name}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="group relative category-glow"
                            >
                                <Link to={`/menu?category=${cat.name}`} className="block">
                                    <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[32px] border border-gray-100 dark:border-[#2D2D2D] shadow-sm flex flex-col items-center transition-all">
                                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-300">
                                            {cat.icon}
                                        </div>
                                        <span className="font-poppins font-black text-lg dark:text-white">{cat.name}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Dishes Section */}
            <section className="py-32 bg-white dark:bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="space-y-4 text-left">
                            <h2 className="text-4xl md:text-5xl font-poppins font-black dark:text-white">Trending Now</h2>
                            <p className="text-gray-500 font-medium">Wait less, eat more. Our community's favorites this week.</p>
                        </div>
                        <Link to="/menu" className="font-poppins font-black text-primary flex items-center space-x-2 group">
                            <span>Browse All Dishes</span>
                            <FiArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, i) => <FoodSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {popularFoods.map((food) => (
                                <FoodCard key={food._id} food={food} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
