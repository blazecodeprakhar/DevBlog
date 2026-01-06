const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load Env
dotenv.config();

// Connect to Database
connectDB();

// Imports
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const { setUserLocals } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }) // Store sessions in Mongo
}));

// Custom Middleware
app.use(setUserLocals);

// Routes
app.use('/', authRoutes);
app.use('/', postRoutes);

// Favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// 404 Handler
app.use((req, res) => {
    res.status(404).render('404');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
