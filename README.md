# FullStackExamRajVishwakarma20250315
This Full-Stack E-Commerce Application follows the MVC architecture, using Node.js &amp; Express.js for the backend and Next.js for the frontend. It integrates MySQL (for orders &amp; users) and MongoDB (for products) to demonstrate proficiency in full-stack development.
Features
1. Authentication & User Management
✅ Secure user registration & login using JWT authentication
✅ Passwords hashed using bcrypt
✅ Users can view and manage their order history

2. Product Catalog
✅ CRUD operations: Create, Read, Update, Delete products
✅ Search & Filter products by name & category (MongoDB aggregation)
✅ Pagination for optimized data fetching

3. Shopping Cart & Checkout
✅ Users can add/remove products from the cart
✅ At checkout, an order is created in MySQL with relational order details
✅ Cart is cleared after checkout

4. Reports & Analytics
✅ SQL Report: Daily revenue for the last 7 days
✅ MongoDB Report: Total sales grouped by category
✅ Data exposed via /reports API and displayed in a Next.js Reports page

Tech Stack
Backend (Node.js + Express.js)
MVC Architecture
SQL (MySQL) for Orders & Users
MongoDB for Products
Authentication using JWT
RESTful APIs with Express.js
Secure password hashing with bcrypt
Advanced SQL Queries (Revenue, Top Spenders)
MongoDB Aggregation Queries
Unit & Integration Testing
Frontend (Next.js)

Dynamic Routing for Product Details
Cart & Checkout Flow

FOLDER STRUCTURE  
/backend
  ├── controllers
  ├── models (SQL & MongoDB)
  ├── routes
  ├── views (if needed)
  ├── middleware (auth, validation)
  ├── config (DB connections)
  ├── server.js

/frontend
  ├── pages
  ├── components
  ├── styles
  ├── store (Redux Toolkit)
  ├── utils (API calls)
  ├── next.config.js


## Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/FullStackExamRajVishwakarma20250315.git
cd FullStackExamRajVishwakarma20250315

📌 Backend Setup
1 .Navigate to the backend directory:
cd server
2 .Install dependencies:
npm install
3 . Create a .env
PORT=5000

# MySQL Config
MYSQL_HOST=your-mysql-host
MYSQL_USER=your-mysql-user
MYSQL_PASSWORD=your-mysql-password
MYSQL_DB=your-database-name

# MongoDB Config
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=your-secret-key

//-------------------------------->>>
🎨 Frontend Setup
1. Navigate to the frontend directory:
cd client
2 . Install dependencies:
npm install
3 . Create a .env.local file in the client directory and add:
NEXT_PUBLIC_API_URL=https://yourbackendurl.com/api
4.  Start the frontend application
npm run dev

