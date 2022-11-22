const isAuthorized = (req, res, next) => {
    const userType = req.header('userType')
    if (userType === 'admin') {
        next()
    }
    else res.status(403).send('No posee permisos para realizar esta acción.')
}


export default isAuthorized