const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'blogimage-service' },
  transports: [
    new winston.transports.File({ filename: 'v1/src/logs/blogimage/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'v1/src/logs/blogimage/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'v1/src/logs/blogimage/combined.log' }),
  ],
});

module.exports = logger;