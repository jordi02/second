const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const sendMail = require('../helpers/nodemailerHelper').sendMail
const multer = require('multer');

const logger = require('../controllers/logControl');

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        Users.findOne({$or: [{username: username}, {email: username}]}, (err, user) => { // users se tiene q cambiar por un usersmodel
            if (err) {
                return done(err)
            }
            if (!user) {
                logger.error(`user ${user} not found`)
                return done(null, false)                
            }
            if (!checkPassword(user.password, password)){
                return done(null, false)
            }

            return done(null, user)
        })
    }
))

passport.use('register', new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
        Users.findOne({$or: [{username: username}, {email: req.body.email}]}, (err, user) => {
            if (err) {
                logger.error(`Error while registering ${err}`)
                return done(err)
            }
            if (user) {
                logger.error(`Username ${username} already registered`)
                return done(null, false)                
            }
            else{
                const newUser = {
                    username: username,
                    email: req.body.email,
                    password: hashPassword(password),
                    name: req.body.name,
                    address: req.body.address,
                    age: req.body.age,
                    phone_number: req.body.phone_number
                }
                Users.create(newUser, (err, user) => {
                    if (err) {
                        logger.error(`LA CONCHA DE DIOS`)
                        return done(err)
                    }
                    else{
                        logger.info(`Created ${user}`)
                        sendMail(
                            null,
                            "Nuevo registro en Coderhouse 32105",
                            `Username: ${username},
                            Email: ${req.body.email},
                            Name: ${req.body.name},
                            Address: ${req.body.address},
                            Age: ${req.body.age},
                            Phone Number: ${req.body.phone_number}`,

                            `<li><b>Username:</b> ${username},
                            <li><b>Email:</b> ${req.body.email},
                            <li><b>Name:</b> ${req.body.name},
                            <li><b>Address:</b> ${req.body.address},
                            <li><b>Age:</b> ${req.body.age},
                            <li><b>Phone Number:</b> ${req.body.phone_number}`
                        )
                        return done(null, user)
                    }
                })
            }
        })
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
                //registrarusuario
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
    //renderprofile
    })

router.post('/profile', upload.single('photo_url'), async (req, res) => { 
    //updateprofile
    })

module.exports = router;