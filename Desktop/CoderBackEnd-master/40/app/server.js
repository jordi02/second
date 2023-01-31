const logger = require('../controllers/logControl').logger

function startServer(server, port, info) {
    if (info) logger.info(info);
    server.listen(port, ()=>{
        logger.info(`App started and listening on port ${port} :)`)
    })
}

exports.startServer = startServer;