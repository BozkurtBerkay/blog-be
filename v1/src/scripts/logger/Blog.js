const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'blog-service' },
  transports: [
    new winston.transports.File({ filename: 'v1/src/logs/blog/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'v1/src/logs/blog/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'v1/src/logs/blog/combined.log' }),
  ],
});

module.exports = logger;