const isAuthorized = (req, res, next) => {
    const userType = req.header('userType')
    if (userType === 'admin') {
        next()
    }
    else res.status(403).send('No posee permisos para realizar esta acción.')
}


const isAuthorized2 = (req, res, next) => {
    req.session.isAdmin = true ? next() : res.status(403).send('No posee permisos para realizar esta acción.')}

export default isAuthorized