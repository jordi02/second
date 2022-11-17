const isLoggedIn = (req, res, next) => {
    if (!req.session.usuario) {
        next();
    } else {
        res.redirect('/');
    }
};

export default isLoggedIn;