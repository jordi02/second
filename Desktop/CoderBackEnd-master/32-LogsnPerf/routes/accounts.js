const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = bcrypt.genSaltSync(10);
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoHelper = require('../helpers/mongooseHelper');
const mongoose = require('mongoose');

const Schema = require('mongoose').Schema
const logger = require('../app/logger');


function checkPassword(passwordHash, passwordString) {
    return bcrypt.compareSync(passwordString, passwordHash)
}
function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds, null)
}


const schema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})
const usersHelper = new mongoHelper('users', schema)
const Users = mongoose.model('users', schema)

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        Users.findOne({username: username}, (err, user) => {
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
                logger.error(`Username ${user} already registered`)
                return done(null, false)                
            }
            else{
                const newUser = {
                    username: username,
                    password: hashPassword(password),
                    email: req.body.email                    
                }
                Users.create(newUser, (err, user) => {
                    if (err) {
                        return done(err)
                    }
                    else{
                        logger.info(`Created ${user}`)
                        return done(null, user)
                    }
                })
            }
        })
}))

passport.serializeUser( async (user,done) => {
    logger.info(`Serializing user ${user.username}`)
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
                req.session.save()
                res.redirect('/')
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

module.exports = router;