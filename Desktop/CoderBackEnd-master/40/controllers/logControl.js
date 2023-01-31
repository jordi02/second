const { createLogger, format, transports } = require("winston");

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
    };

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    levels: logLevels,
    transports: [new transports.Console(),
                new transports.File({filename: './logs/error.log', level: 'error'}),
                new transports.File({filename: './logs/warning.log', level: 'warn'}),
                new transports.File({filename: './logs/fatal.log', level: 'fatal'})]
})

exports.logger = logger;