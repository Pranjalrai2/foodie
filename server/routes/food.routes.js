const express = require('express');
const router = express.Router();
const { 
    getFoods, 
    getFoodById, 
    createFood 
} = require('../controllers/food.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const { upload } = require('../config/cloudinary');

router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/', protect, admin, upload.single('image'), createFood);

module.exports = router;
