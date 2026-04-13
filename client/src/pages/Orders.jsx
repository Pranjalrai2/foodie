import { useState, useEffect } from 'react';
import API from '../api/axios';
import Spinner from '../components/Spinner';
import { FiPackage, FiCalendar, FiMapPin, FiCheckCircle, FiClock, FiTruck, FiCoffee, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/orders/myorders');
            setOrders(data.data.reverse());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'Pending': return { icon: <FiClock />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', step: 1 };
            case 'Preparing': return { icon: <FiCoffee />, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', step: 2 };
            case 'Out for Delivery': return { icon: <FiTruck />, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', step: 3 };
            case 'Delivered': return { icon: <FiCheckCircle />, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', step: 4 };
            default: return { icon: <FiPackage />, color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20', step: 0 };
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-poppins font-black dark:text-white"
                    >
                        Order <span className="text-primary">Journey</span>
                    </motion.h2>
                    <p className="text-gray-500 font-medium">Tracking your hunger's satisfaction.</p>
                </div>

                {orders.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 premium-card bg-white dark:bg-[#1A1A1A]"
                    >
                        <FiPackage className="h-24 w-24 text-gray-200 dark:text-gray-800 mx-auto mb-8" />
                        <h3 className="text-3xl font-poppins font-black dark:text-white mb-4">No History Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto font-medium mb-10">You haven't placed any orders yet. Let's change that and start your flavor adventure!</p>
                        <button onClick={() => window.location.href='/menu'} className="btn-primary">Browse Menu</button>
                    </motion.div>
                ) : (
                    <div className="space-y-10">
                        {orders.map((order, index) => {
                            const statusInfo = getStatusInfo(order.status);
                            const isExpanded = expandedOrder === order._id;

                            return (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    key={order._id} 
                                    className="premium-card overflow-hidden"
                                >
                                    {/* Header */}
                                    <div 
                                        onClick={() => toggleExpand(order._id)}
                                        className="p-8 border-b dark:border-white/5 bg-gray-50/50 dark:bg-white/5 cursor-pointer flex flex-wrap justify-between items-center gap-6"
                                    >
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction Link</p>
                                            <p className="font-poppins font-black text-lg dark:text-white tracking-tight">#{order._id.substring(order._id.length - 8)}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Deployment Date</p>
                                            <div className="flex items-center text-sm font-bold text-gray-600 dark:text-gray-300 gap-2">
                                                <FiCalendar className="text-primary" />
                                                {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className={`px-6 py-2 rounded-2xl border font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}>
                                            <span className="animate-pulse">{statusInfo.icon}</span>
                                            {order.status}
                                        </div>
                                        <div>
                                            {isExpanded ? <FiChevronUp className="h-6 w-6 text-gray-400" /> : <FiChevronDown className="h-6 w-6 text-gray-400" />}
                                        </div>
                                    </div>
                                    
                                    <div className="p-8">
                                        {/* Status Progress Implementation */}
                                        <div className="mb-12 pt-4 px-4">
                                            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 dark:bg-[#2D2D2D] -z-10 rounded-full" />
                                                <div 
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-1000" 
                                                    style={{ width: `${(statusInfo.step - 1) * 33.33}%` }}
                                                />
                                                
                                                {['Pending', 'Preparing', 'Out for Delivery', 'Delivered'].map((s, i) => {
                                                    const info = getStatusInfo(s);
                                                    const isActive = statusInfo.step > i;
                                                    const isCurrent = statusInfo.step === i + 1;

                                                    return (
                                                        <div key={s} className="flex flex-col items-center gap-2">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-lg ${
                                                                isCurrent ? 'bg-primary border-primary/20 scale-125 text-white ring-4 ring-primary/10' : 
                                                                isActive ? 'bg-white dark:bg-[#1A1A1A] border-primary text-primary' : 
                                                                'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-[#2D2D2D] text-gray-300'
                                                            }`}>
                                                                {info.icon}
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase tracking-tighter ${
                                                                isCurrent ? 'text-primary' : 'text-gray-400'
                                                            }`}>{s}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-6 mb-10 pt-6 border-t dark:border-white/5">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="flex justify-between items-center group">
                                                                <div className="flex items-center gap-6">
                                                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#0A0A0A] overflow-hidden shadow-md">
                                                                        <img src={item.food?.image} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-poppins font-black text-lg dark:text-white leading-tight">{item.food?.name}</p>
                                                                        <p className="text-sm font-bold text-gray-400 tracking-wide">Configuration: {item.quantity} × ₹{item.price}</p>
                                                                    </div>
                                                                </div>
                                                                <p className="font-poppins font-black text-xl dark:text-white">₹{item.quantity * item.price}</p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex flex-col md:flex-row justify-between gap-10 pt-8 border-t dark:border-white/5">
                                                        <div className="flex gap-4 max-w-sm">
                                                            <div className="p-3 bg-primary/10 rounded-2xl h-fit">
                                                                <FiMapPin className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Destination</p>
                                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">{order.deliveryAddress}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right glass p-6 rounded-3xl min-w-[200px]">
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Final Payload</p>
                                                            <p className="text-4xl font-poppins font-black text-primary">₹{order.totalAmount}</p>
                                                            <p className="text-[10px] text-green-500 font-bold mt-2 uppercase">Payment Secured</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {!isExpanded && (
                                            <div className="flex justify-between items-center pt-2">
                                                <p className="text-sm text-gray-400 font-bold italic">Click to view details and payload...</p>
                                                <p className="text-2xl font-poppins font-black dark:text-white">₹{order.totalAmount}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
