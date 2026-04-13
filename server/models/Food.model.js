const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide food name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide food description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide food price']
    },
    category: {
        type: String,
        required: [true, 'Please provide food category'],
        enum: ['Pizza', 'Burger', 'Sushi', 'Biryani', 'Desserts']
    },
    image: {
        type: String,
        required: [true, 'Please provide food image']
    },
    rating: {
        type: Number,
        default: 4.0,
        min: 1,
        max: 5
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Food', foodSchema);
