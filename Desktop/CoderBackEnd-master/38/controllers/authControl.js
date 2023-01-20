const bcrypt = require('bcrypt')
const saltRounds = bcrypt.genSaltSync(10);

function checkPassword(passwordHash, passwordString) {
    return bcrypt.compareSync(passwordString, passwordHash)
}

function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds, null)
}

function isAuth(req, res, next) {
    logger.info('isauth en funcionamiento')
    if (req.isAuthenticated()) {
        req.session.save()
        next();
    } else {
        logger.error(`isAuth bloqueo una solicitud para ${req.originalUrl}`)
        res.redirect('/accounts/login');
    }
}

exports.checkPassword = checkPassword;
exports.hashPassword = hashPassword;
exports.isAuth = isAuth;