const rp = require('request-promise');
const marketService = require('../services/market');

const getMarkets = (req, res) => {
  return marketService.getMarkets().then(result => {
    res.status(200).json(result);
    return res;
  });
}

const getCurrencies = () => {
  return marketService.getCurrencies().then(result => {
    res.status(200).json(result);
    return res;
  });
}

const getMarketOrderBook = (req, res) => {
  const market = req.params.market;
  const base = req.params.base;
  return marketService.getMarketOrderBook(base, market).then(result => {
    res.status(200).json(result);
    return res;
  });
  
}

const getAllMarketOrderBook = (req, res) => {
  return marketService.getAllMarketOrderBook().then(result => {
    res.status(200).json(result);
    return res;
  });
}

const getMarketSummaries = (req, res) => {
  return marketService.getMarketSummaries().then(result => {
    res.status(200).json(result);
    return res;
  });
  
}

module.exports.getMarkets = getMarkets;
module.exports.getCurrencies = getCurrencies;
module.exports.getMarketOrderBook = getMarketOrderBook;
module.exports.getAllMarketOrderBook = getAllMarketOrderBook;
module.exports.getMarketSummaries = getMarketSummaries;