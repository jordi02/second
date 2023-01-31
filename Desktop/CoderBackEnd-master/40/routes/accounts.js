const express = require('express')
const passport = require('passport')
const multer = require('multer');
const router = express.Router()
const LocalStrategy = require('passport-local').Strategy

const logger = require('../controllers/logControl').logger;
const Users = require('../db/models/accountsModel').accountsModel;
const passportLogin = require('../controllers/accountsControl').passportLogin
const passportRegister = require('../controllers/accountsControl').passportRegister
const registrarUsuario = require('../controllers/accountsControl').registrarUsuario
const renderProfile = require('../controllers/accountsControl').renderProfile
const updateProfile = require('../controllers/accountsControl').updateProfile


passport.use('login', new LocalStrategy(
    (username, password, done) => {
        passportLogin(username, password, done)
    }
))

passport.use('register', new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
        passportRegister(req, username, password, done)
}))

passport.serializeUser( async (user,done) => {
    logger.info(`Serializing user ${user.email}`)
    done(null, user._id)
})

passport.deserializeUser( (id, done) => {
    Users.findById(id, done)
})

router.get('/register', async (req, res) => {
    res.render('register', {layout: false})
});

router.post('/register', passport.authenticate('register', 
            {failureRedirect: '/error'}),
            async (req, res) => {
                registrarUsuario(req, res)
            });

router.get('/login', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        res.redirect('/');
    }
});

router.post('/login', passport.authenticate('login', 
{failureRedirect: '/error'}),
            async (req, res) => {
                req.session.save();
                res.redirect('/')                
});

router.get('/logout', async (req, res) => {
    req.logout((err) => {
        if (err) { return next(err)}
        res.redirect('/accounts/login')
    });
});

const upload = multer({
    dest: "../public/uploads/temp/"
});

router.get('/profile', async (req, res) => {
    renderProfile(req, res);
    })

router.post('/profile', upload.single('photo_url'), async (req, res) => { 
    updateProfile(req, res);
    })

exports.router = router;