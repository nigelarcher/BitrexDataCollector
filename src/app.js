"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const createLogger = require('bunyan').createLogger;
//const healthCheckController = require('./controllers/healthcheck');
const marketController = require('./controllers/market');

//const swagger = require('./controllers/swagger');
const config = require('./services/configService');
//const configEndpoint = require('./services/configEndpoint');

const log = createLogger({ name: 'BitrexData-application' });

module.exports = () => {
    return {
        server: null,
        authRouter: null,
        httpServer: null,
        start: () => {

            this.server = express();

            const authRouter = express.Router();
            
            
            //authRouter.use(jwtAuth);

            this.server.use(bodyParser.json());
            this.server.use(bodyParser.urlencoded({ extended: false }));

            //authRouter.use(bodyParser.json());
            //authRouter.use(bodyParser.urlencoded({ extended: false }));

            const path = require('path');
            //const apidocFolder = path.join(__dirname, 'static/apidoc');
            //this.server.use('/apidoc', express.static(apidocFolder));
            //this.server.get('/health-check', healthCheckController.healthCheck);
            this.server.get('/live/markets', marketController.getMarkets);
            this.server.get('/live/currencies', marketController.getCurrencies);
            this.server.get('/live/marketsummaries', marketController.getMarketSummaries);
            this.server.get('/live/market/:base/:market', marketController.getMarketOrderBook);
            this.server.get('/live/market/all', marketController.getAllMarketOrderBook);
            //this.server.get('/swagger-doc', swagger);
            
            //this.server.get('/config', configEndpoint);
            //this.server.use(authRouter);

            return new Promise((resolve, reject) => {
                this.httpServer = this.server.listen(config.getPort(), () => {
                    log.info(`${this.server.name} listening at port ${config.getPort()}`);
                    resolve(this.server);
                });
            });
        },

        close: () => {
            log.info('Shutting down server');
            return new Promise((resolve, reject) => {
                this.httpServer.close((e) => {
                    if (e) {
                        log.error(e);
                    }
                    log.info('Server shutdown');
                    return e ? reject(e) : resolve();
                });
            });
        }
    }
}
