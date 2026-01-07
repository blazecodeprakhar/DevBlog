/* Auth Controller - MongoDB Version */
const User = require('../models/User');
const { sendNotification } = require('../utils/helpers');

exports.getLoginPage = (req, res) => res.render('login');

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });

        if (user && (await user.matchPassword(password))) {
            req.session.user = {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                isAdmin: user.isAdmin
            };

            // Notify Admin silently
            sendNotification(user, 'Login', req);

            res.redirect('/');
        } else {
            res.render('login', { error: "Invalid phone number or password" });
        }
    } catch (error) {
        console.error(error);
        res.render('login', { error: "An error occurred" });
    }
};

exports.getSignupPage = (req, res) => res.render('signup');

exports.signup = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        const userExists = await User.findOne({ phone });
        if (userExists) {
            return res.render('signup', { error: "User with this phone number already exists" });
        }

        const newUser = await User.create({
            name,
            phone,
            password, // Mongoose hook handles hashing
            isAdmin: false
        });

        if (newUser) {
            req.session.user = {
                _id: newUser._id,
                name: newUser.name,
                phone: newUser.phone,
                isAdmin: newUser.isAdmin
            };

            // Notify Admin silently
            sendNotification(newUser, 'New Registration', req);

            res.redirect('/');
        } else {
            res.render('signup', { error: "Invalid user data" });
        }
    } catch (error) {
        console.error(error);
        res.render('signup', { error: "Server Error" });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
