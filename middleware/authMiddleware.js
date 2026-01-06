/* Authorization Middleware */

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

const setUserLocals = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
};

module.exports = {
    isAuthenticated,
    setUserLocals
};
