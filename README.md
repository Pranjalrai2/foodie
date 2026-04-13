# Foodie - Complete MERN Food Delivery Plateform

A production-ready food delivery website built with React, Node.js, Express, and MongoDB.

## Features
- **User Authentication**: Secure register/login with JWT stored in httpOnly cookies.
- **Menu & Filtering**: Search and filter food items by category.
- **Shopping Cart**: Full cart functionality with persistent state using LocalStorage.
- **Order Management**: Place orders and track their status in real-time.
- **Responsive Design**: Premium UI built with Tailwind CSS, fully mobile-responsive.
- **Seed Data**: Automatically populate your database with 20 real food items.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Axios, Context API, Framer Motion, Lucide Icons, React Hot Toast.
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose), JWT, BcryptJS, Multer, Cloudinary.

## Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

## Setup Instructions

### 1. Server Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 2. Client Setup
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Data
To populate the database with the initial 20 food items:
```bash
cd server
node seed/foodSeed.js
```

## Running the Application

### Start Server (Backend)
```bash
cd server
npm run dev
```
*Note: Make sure you have `nodemon` installed or update the `dev` script in `package.json` to `nodemon server.js`.*

### Start Client (Frontend)
```bash
cd client
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user and set cookie
- `POST /api/auth/logout`: Clear cookie
- `GET /api/auth/me`: Get current user (protected)

### Foods
- `GET /api/foods`: Get all foods (query params: category, search)
- `GET /api/foods/:id`: Get single food detail
- `POST /api/foods`: Create food (admin only, with image upload)

### Orders
- `POST /api/orders`: Place a new order (protected)
- `GET /api/orders/myorders`: Get user's orders (protected)
- `PATCH /api/orders/:id/status`: Update order status (admin only)
