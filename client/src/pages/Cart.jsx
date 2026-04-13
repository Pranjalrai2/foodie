import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiMapPin, FiTruck, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();

  const deliveryFee = cart.length > 0 ? 40 : 0;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!address) return toast.error('Please enter delivery address');
    setIsPlacing(true);
    try {
      const orderData = {
        items: cart.map(item => ({ food: item._id, quantity: item.quantity, price: item.price })),
        totalAmount: total,
        deliveryAddress: address
      };
      const { data } = await API.post('/orders', orderData);
      if (data.success) {
        toast.success('Order placed successfully! 🍕');
        clearCart();
        navigate('/orders');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-32">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 max-w-md"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative bg-white dark:bg-[#1A1A1A] p-10 rounded-full shadow-2xl">
                <FiShoppingBag className="h-20 w-20 text-primary mx-auto" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-poppins font-black dark:text-white">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Looks like you haven't added anything to your cart yet. Let's find something delicious for you!</p>
          </div>
          <Link to="/menu" className="btn-primary inline-flex items-center space-x-2 px-12 py-4">
            <span>Discover Menu</span>
            <FiChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-poppins font-black dark:text-white mb-16"
        >
            Checkout Your <span className="text-primary">Stash</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence>
                {cart.map((item, index) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        key={item._id} 
                        className="premium-card p-6 flex flex-col md:flex-row items-center gap-6"
                    >
                        <img src={item.image} alt={item.name} className="w-32 h-32 rounded-3xl object-cover shadow-lg" />
                        
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="font-poppins font-black text-2xl dark:text-white mb-1">{item.name}</h3>
                            <p className="text-primary font-bold text-lg mb-4">₹{item.price}</p>
                            
                            <div className="flex items-center justify-center md:justify-start space-x-6">
                                <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-[#0A0A0A] rounded-2xl border border-gray-200 dark:border-white/5">
                                    <button 
                                        onClick={() => updateQuantity(item._id, -1)} 
                                        className="p-3 text-gray-500 hover:text-primary transition-colors"
                                    >
                                        <FiMinus className="h-4 w-4 stroke-[3]" />
                                    </button>
                                    <span className="font-poppins font-black w-8 text-center text-lg dark:text-white">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item._id, 1)} 
                                        className="p-3 text-gray-500 hover:text-primary transition-colors"
                                    >
                                        <FiPlus className="h-4 w-4 stroke-[3]" />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <FiTrash2 className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Subtotal</p>
                            <p className="text-2xl font-poppins font-black dark:text-white">₹{item.price * item.quantity}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-8 space-y-6"
            >
                <h3 className="text-2xl font-poppins font-black dark:text-white flex items-center gap-3">
                    <FiMapPin className="text-primary h-6 w-6" />
                    Where should we fly?
                </h3>
                <div className="relative">
                    <textarea 
                        className="input-field min-h-[140px] resize-none pt-4" 
                        placeholder="Enter your full street address, landmark, and floor number..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>
            </motion.div>
          </div>

          {/* Right Side: Order Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-10 space-y-8 shadow-2xl shadow-primary/10 border-primary/20"
            >
                <div className="space-y-4">
                    <h3 className="text-3xl font-poppins font-black dark:text-white mb-8 border-b dark:border-white/10 pb-4">Order Summary</h3>
                    
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-lg font-medium">
                        <span>Items Subtotal</span>
                        <span className="font-poppins font-black text-text dark:text-white">₹{cartTotal}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-lg font-medium">
                        <div className="flex items-center gap-2">
                            <span>Delivery Fee</span>
                            <FiTruck className="text-primary h-5 w-5" />
                        </div>
                        <span className="font-poppins font-black text-text dark:text-white">₹{deliveryFee}</span>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-bold">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Lucky! You got free delivery on this order.
                    </div>
                    
                    <div className="pt-6 mt-4 border-t dark:border-white/10">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-widest">Grand Total</span>
                            <span className="text-4xl font-poppins font-black text-primary">₹{total}</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={handlePlaceOrder}
                    disabled={isPlacing}
                    className="w-full btn-primary py-5 text-xl flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/30"
                >
                    <FiShoppingBag className="h-6 w-6 stroke-[3]" />
                    <span>{isPlacing ? 'Placing Order...' : 'Confirm Order'}</span>
                </button>
                
                <p className="text-center text-gray-400 text-xs font-medium">
                    By confirming, you agree to our Terms and Service.
                </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
