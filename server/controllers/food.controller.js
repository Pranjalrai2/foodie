const Food = require('../models/Food.model');

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const foods = await Food.find(query);
        res.json({ success: true, count: foods.length, data: foods });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single food
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food) {
            res.json({ success: true, data: food });
        } else {
            res.status(404).json({ success: false, message: 'Food not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a food item
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res) => {
    try {
        const { name, description, price, category, rating } = req.body;
        
        // Multer handles the file and cloudinary storage
        const image = req.file ? req.file.path : null;

        if (!image) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const food = await Food.create({
            name,
            description,
            price,
            category,
            image,
            rating
        });

        res.status(201).json({ success: true, data: food });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getFoods,
    getFoodById,
    createFood
};
