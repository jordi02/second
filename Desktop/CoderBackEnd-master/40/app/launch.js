const cluster = require('cluster')
const cpus = require('os').cpus().length;
const child_process = require('child_process')

const logger = require('../controllers/logControl').logger
const server = require('./server.js');
const httpServer = require('./app.js').httpServer;



function launchStandalone(aport) {
    if (aport) {
        let port = Number(aport)
        if (port != 'NaN') {
            server.startServer(httpServer, port, null)
        } else {
            server.startServer(httpServer, 8080,`Second argument (port) must be a number, received ${port}\r\n\r\n
            Falling back to port 8080`)
        }
    } else {
        server.startServer(httpServer, 8080,`No port number was specified, defaulting to 8080`)
    }
}

function launchCluster(aport) {
    if (cluster.isPrimary) {
        logger.info(`Master ${process.pid} is running`);

        for (let i = 0; i < cpus; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            logger.info(`worker ${worker.process.pid} died`)
        })
    } else {
        logger.info(`worker ${process.pid} started`);
        if (aport) {
            let port = Number(aport)
            logger.info(port)
            if (port != 'NaN') {
                server.startServer(httpServer, port, null)
            } else {
                server.startServer(httpServer, 8080,`Second argument (port) must be a number, received ${port}\r\n\r\n
                Falling back to port 8080`)
            }
        } else {
            server.startServer(httpServer, 8080,`No port number was specified, defaulting to 8080`)
        }
    }
}

function launchForks(aport) {
    if (aport) {
        if (aport != 'NaN') {
            for (let i = aport; i < aport+cpus; i++) {
                logger.info(`Forking process on port ${i}`);
                child_process.fork('./40-Persistencia/main.js', [i], {cwd:process.cwd()} )
            }
        } else {
            logger.error(`No deberias haber llegado hasta aca, hay veinte chequeos que lograste romper`)
            logger.info(`Defaulting to port 8080`)
            launchForks(8080);
        }
    }
}

exports.launchStandalone = launchStandalone
exports.launchCluster = launchCluster
exports.launchForks = launchForks