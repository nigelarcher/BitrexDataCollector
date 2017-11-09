const server = require('./app')();
const createLogger = require('bunyan');

const log = createLogger({ name: 'server' });

server.start()
    .then(() => log.info('Server'))
    .catch((err) => log.error(err));
