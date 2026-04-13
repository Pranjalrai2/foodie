const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Food = require('../models/Food.model');

const foods = [
    // Pizza
    {
        name: 'Margherita Pizza',
        description: 'Classic delight with 100% real mozzarella cheese.',
        price: 299,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80',
        rating: 4.5
    },
    {
        name: 'Pepperoni Feast',
        description: 'Loaded with extra pepperoni and cheese.',
        price: 449,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
        rating: 4.8
    },
    {
        name: 'Veggie Paradise',
        description: 'Gold corn, black olives, capsicum & red paprika.',
        price: 399,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
        rating: 4.2
    },
    {
        name: 'Paneer Makhani Pizza',
        description: 'Paneer and capsicum on a makhani sauce base.',
        price: 429,
        category: 'Pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        rating: 4.6
    },
    // Burger
    {
        name: 'Classic Cheese Burger',
        description: 'Juicy chicken patty with melted cheese and fresh veggies.',
        price: 149,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        rating: 4.3
    },
    {
        name: 'Double Whopper',
        description: 'Double patty, double cheese, double flavor.',
        price: 249,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80',
        rating: 4.7
    },
    {
        name: 'Spicy Zinger Burger',
        description: 'Crispy chicken with a spicy kick and lettuce.',
        price: 189,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80',
        rating: 4.4
    },
    {
        name: 'Mushroom Swiss Burger',
        description: 'Sautéed mushrooms and swiss cheese on a beef patty.',
        price: 229,
        category: 'Burger',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
        rating: 4.5
    },
    // Sushi
    {
        name: 'Salmon Nigiri',
        description: 'Fresh salmon slices over pressed seasoned rice.',
        price: 599,
        category: 'Sushi',
        image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=800&q=80',
        rating: 4.9
    },
    {
        name: 'California Roll',
        description: 'Crab stick, avocado, and cucumber with sesame seeds.',
        price: 499,
        category: 'Sushi',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        rating: 4.6
    },
    {
        name: 'Dragon Roll',
        description: 'Eel and cucumber inside, topped with avocado.',
        price: 649,
        category: 'Sushi',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
        rating: 4.8
    },
    {
        name: 'Spicy Tuna Roll',
        description: 'Fresh tuna with spicy mayo and green onions.',
        price: 549,
        category: 'Sushi',
        image: 'https://images.unsplash.com/photo-1559466273-d95e72debaf8?auto=format&fit=crop&w=800&q=80',
        rating: 4.7
    },
    // Biryani
    {
        name: 'Hyderabadi Dum Biryani',
        description: 'Authentic spicy mutton biryani with long grain basmati rice.',
        price: 349,
        category: 'Biryani',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ec4a4f8?auto=format&fit=crop&w=800&q=80',
        rating: 4.9
    },
    {
        name: 'Chicken Tikka Biryani',
        description: 'Biryani rice layered with smoky chicken tikka pieces.',
        price: 299,
        category: 'Biryani',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        rating: 4.6
    },
    {
        name: 'Veg Dum Biryani',
        description: 'Garden fresh vegetables cooked with aromatic spices.',
        price: 249,
        category: 'Biryani',
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
        rating: 4.4
    },
    {
        name: 'Kolkata Chicken Biryani',
        description: 'Mildly spiced biryani with a distinct aroma and potato.',
        price: 319,
        category: 'Biryani',
        image: 'https://images.unsplash.com/photo-1645177623570-ad448af2524c?auto=format&fit=crop&w=800&q=80',
        rating: 4.5
    },
    // Desserts
    {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center.',
        price: 129,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1624353339193-29000a06df5c?auto=format&fit=crop&w=800&q=80',
        rating: 4.8
    },
    {
        name: 'Gulab Jamun (2pcs)',
        description: 'Deep-fried dumplings soaked in sugar syrup.',
        price: 79,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80',
        rating: 4.7
    },
    {
        name: 'New York Cheesecake',
        description: 'Creamy cheesecake on a graham cracker crust.',
        price: 199,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
        rating: 4.9
    },
    {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked layers.',
        price: 189,
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
        rating: 4.6
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Food.deleteMany();
        await Food.insertMany(foods);
        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
