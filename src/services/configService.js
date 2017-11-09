const currencies = require('../currencies');

const loadCurrencyFile = () => {
  return currencies;
}

const configItems = {
  port: process.env.PORT || '8080',
  currencies: loadCurrencyFile(),
  isDev: process.env.ERNVIRONMENT != 'dev' || true
}

const devConfig = {
  port: '8080',
  isDev: process.env.RNVIRONMENT != 'dev' || true
}

const requireConfig = (config) => {
  if(!configItems[config]) {
      if(configItems.isDev && devConfig[config])
      {
          return devConfig[config];
      }
      throw new Error(`${config} is required. Please define the environment variabnle`);
  }
  return configItems[config];
}

const config = {
  getPort: () => requireConfig("port"),
  getCurrencies: () => requireConfig("dataCurrencies")

}

module.exports =  config;