const appRoot = require('app-root-path')
const winston = require('winston')
// const { createLogger, format, transports } = require('winston')
// const { combine, timestamp, label, printf } = format

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`
// })
// define the custom settings for each transport (file, console)
const options = {
  info: {
    level: 'info',
    filename: `${appRoot}/logs/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  error: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  exceptions: {
    level: 'info',
    filename: `${appRoot}/logs/exceptions.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
  // format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console)
  ],
  exceptionHandlers: [new winston.transports.File(options.exceptions)],
  exitOnError: false // do not exit on handled exceptions
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  }
}

module.exports = logger
