const express = require('express');
const router = express.Router();
const { 
    addOrderItems, 
    getMyOrders, 
    updateOrderStatus 
} = require('../controllers/order.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.patch('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
