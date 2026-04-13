require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
