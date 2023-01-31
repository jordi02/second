const checkPassword = require('./authControl').checkPassword
const hashPassword = require('./authControl').hashPassword
const crearCarritoVacio = require('./carritosControl').crearCarritoVacio
const sendMail = require('../helpers/nodemailerHelper').sendMail
const ObjectInterface = require('../db/mongooseObjIface')
const Users = ObjectInterface.getAccountsModel()
const UserDto = require('../db/dtos/accountsDto')
const logger = require('./logControl').logger
const fs = require('fs')

async function passportLogin(username, password, done) {
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

async function passportRegister(req, username, password, done) {
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
            let newUser = new UserDto(
                username,
                req.body.email,
                hashPassword(password),
                req.body.name,
                req.body.address,
                req.body.age,
                req.body.phone_number
            )
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
}

async function registrarUsuario(req, res) {
    logger.info(`Registering ${req.body}`)
    req.session.save()
    crearCarritoVacio(req, res, false) //importar crearcarritovacio
}

async function renderProfile(req, res) {
    if (!req.isAuthenticated()) {
        res.render('login');
    } else {
        data = {
            'username': req.user.username,
            'email': req.user.email,
            'name': req.user.name,
            'address': req.user.address,
            'age': req.user.age,
            'phone_number': req.user.phone_number,
            'photo_url': `/imgs/${req.user.username}`
        }
        res.render('profile', {data: data});
    }
}

async function updateProfile(req, res) { //importar fs
    try {
        const tempPath = req.file.path;
        const allowedExtensions = ['.jpg', '.png', '.jpeg']
        const targetPath = path.join(__dirname, '..',`/public/uploads/${req.user.username}`);
        
            if (allowedExtensions.includes(path.extname(req.file.originalname).toLowerCase())) {
                fs.rename(tempPath, targetPath, err => { 
                    if (err) { 
                        logger.error(err)
                        res.redirect('/error') 
                    } else {
                    let filter = { username: req.user.username }
                    let options = { upsert: true }
                    let updateDoc = { $set: {
                        photo_url: targetPath
                    } }
                    Users.updateOne(filter, updateDoc, options) // users tiene q ser un usersmodel
                    logger.info(`${req.user.username}:${targetPath} updated`) //importar logger
                    res.redirect('/accounts/profile') }
                })
            } else {
                logger.error(`se intento subir una imagen con extension ${path.extname(req.file.originalname).toLowerCase()} no soportada`)
                fs.unlink(tempPath)
                res.redirect('/error')
            }
        } catch(e) {
            logger.error(e)
            res.redirect('/accounts/profile')
        }
}

exports.passportLogin = passportLogin
exports.passportRegister = passportRegister
exports.registrarUsuario = registrarUsuario
exports.renderProfile = renderProfile
exports.updateProfile = updateProfile