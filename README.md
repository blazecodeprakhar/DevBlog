# DevBlog - Modern Blogging Platform

![DevBlog Preview](public/images/project-preview.png)

A professional, fully responsive blogging application built with **Node.js**, **Express**, **EJS**, and **MongoDB**. This project features secure user authentication, rich content management, and a polished mobile-first user interface.

## 🚀 Live Demo
**Author Portfolio:** [prakhar.dev](https://prakharcodes.netlify.app/)

## ✨ Features

- **📱 Fully Responsive Design**: Mobile-first architecture with a custom hamburger menu and adaptive layouts.
- **🔐 Secure Authentication**: 
  - User Signup & Login with **Bcrypt** password hashing.
  - Session management using **MongoDB Store**.
- **📝 Content Management**:
  - Create, Read, Update, and Delete (CRUD) blog posts.
  - Automated "Reading Time" calculation.
  - View counts and Like system.
- **🔍 Smart Search**: Real-time filtering by title, content, author, or tags.
- **🎨 Modern UI/UX**:
  - Glassmorphism effects and smooth animations.
  - "Pill" shaped professional search bar.
  - Non-intrusive Login Popup Modal with smart 24h cooldown.
- **🛠️ Professional Architecture**: MVC Pattern (Models, Views, Controllers) for scalable code.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Vanilla CSS3 (Variables, Flexbox, Grid)
- **Auth**: Bcrypt, Express-Session, Connect-Mongo

## � Project Structure

```bash
blog-app/
├── config/             # Database connection logic
├── controllers/        # Route logic (Auth, Posts)
├── middleware/         # Custom middleware (Auth checks)
├── models/             # Mongoose Schemas (User, Post)
├── public/             # Static assets (CSS, JS, Images)
├── routes/             # Express routes definition
├── utils/              # Helper functions
├── views/              # EJS Templates
│   ├── partials/       # Reusable headers/footers/modals
├── app.js              # Server entry point
└── .env                # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blazecodeprakhar/DevBlog.git
   cd DevBlog
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secure_secret_key
   ```

4. **Seed Database (Optional)**
   Populate the DB with initial data:
   ```bash
   node seed.js
   ```

5. **Run the Server**
   ```bash
   npm start
   # Or for development with auto-restart:
   npm run dev
   ```

6. **Open in Browser**
   Visit `http://localhost:3000`

## 👨‍� Author

**Prakhar Yadav**
- 🌐 Website: [prakhar.dev](https://prakharcodes.netlify.app/)
- 💻 Built with passion for clean code and great UX.

---
© 2026 DevBlog. All rights reserved.
