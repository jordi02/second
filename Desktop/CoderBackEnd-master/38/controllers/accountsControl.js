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