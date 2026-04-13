import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const { data } = await API.get('/auth/me');
            if (data.success) {
                setUser(data.data);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            if (data.success) {
                setUser(data.data);
                toast.success(data.message);
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await API.post('/auth/register', { name, email, password });
            if (data.success) {
                setUser(data.data);
                toast.success(data.message);
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = async () => {
        try {
            await API.post('/auth/logout');
            setUser(null);
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
