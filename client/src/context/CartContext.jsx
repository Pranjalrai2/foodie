import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (food) => {
        setCart(prev => {
            const existingItem = prev.find(item => item._id === food._id);
            if (existingItem) {
                toast.success(`Updated ${food.name} quantity`);
                return prev.map(item => 
                    item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success(`Added ${food.name} to cart`);
            return [...prev, { ...food, quantity: 1 }];
        });
    };

    const removeFromCart = (foodId) => {
        setCart(prev => prev.filter(item => item._id !== foodId));
    };

    const updateQuantity = (foodId, delta) => {
        setCart(prev => prev.map(item => {
            if (item._id === foodId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
