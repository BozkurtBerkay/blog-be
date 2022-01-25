const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'contact-service' },
  transports: [
    new winston.transports.File({ filename: 'v1/src/logs/contact/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'v1/src/logs/contact/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'v1/src/logs/contact/combined.log' }),
  ],
});

module.exports = logger;