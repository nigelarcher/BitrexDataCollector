const rp = require('request-promise');

const getMarkets = () => {
  return rp('https://bittrex.com/api/v1.1/public/getmarkets');
}

const getCurrencies = () => {
  return rp('https://bittrex.com/api/v1.1/public/getcurrencies');
}

const getMarketOrderBook = (base, market) => {
  //console.log(`loading ${base}-${market}`);
  return rp(`https://bittrex.com/api/v1.1/public/getorderbook?market=${base}-${market}&type=both`);
  
}

const getAllMarketOrderBook = () => {
  const result = {};
  return getMarkets().then(markets => {
    markets = JSON.parse(markets);
    console.log(`got all markets: ${markets.sucess}`);
    const marketLoadPromise = [];
    const marketLoads = [];
    markets.result.forEach(market => {
      if(!result.hasOwnProperty(market.MarketCurrency)) {
        result[market.MarketCurrency] = {};
      }
      marketLoads.push({market: market.MarketCurrency, base: market.BaseCurrency})
      marketLoadPromise.push(getMarketOrderBook(market.BaseCurrency, market.MarketCurrency));
    });
    let index = 0;
    return Promise.all(marketLoadPromise).then(values  => {
      values.forEach(value => {
        //console.log(`loaded ${marketLoads[index].market}-${marketLoads[index].base}`);
        value = JSON.parse(value);
        result[marketLoads[index].market][marketLoads[index].base] = value.result;
        index++;
      });
      console.log(`Finished loading all market data`);
      return result;
    })
  });
}

const getMarketSummaries = () => {
  return rp('https://bittrex.com/api/v1.1/public/getmarketsummaries');
}

const getMarketHistory = (base, market) => {
  return rp(`https://bittrex.com/api/v1.1/public/getmarkethistory?market=${base}-${market}`);
}

const getAllMarketHistory = (base, market) => {
  const result = {};
  return getMarkets().then(markets => {
    markets = JSON.parse(markets);
    console.log(`got all markets: ${markets.sucess}`);
    const marketLoadPromise = [];
    const marketLoads = [];
    markets.result.forEach(market => {
      if(!result.hasOwnProperty(market.MarketCurrency)) {
        result[market.MarketCurrency] = {};
      }
      marketLoads.push({market: market.MarketCurrency, base: market.BaseCurrency})
      marketLoadPromise.push(getMarketHistory(market.BaseCurrency, market.MarketCurrency));
    });
    let index = 0;
    return Promise.all(marketLoadPromise).then(values  => {
      values.forEach(value => {
        //console.log(`loaded ${marketLoads[index].market}-${marketLoads[index].base}`);
        value = JSON.parse(value);
        result[marketLoads[index].market][marketLoads[index].base] = value.result;
        index++;
      });
      console.log(`Finished loading all market history data`);
      return result;
    })
  });
}


module.exports.getMarkets = getMarkets;
module.exports.getCurrencies = getCurrencies;
module.exports.getMarketOrderBook = getMarketOrderBook;
module.exports.getAllMarketOrderBook = getAllMarketOrderBook;
module.exports.getMarketSummaries = getMarketSummaries;
module.exports.getMarketHistory = getMarketHistory;
module.exports.getAllMarketHistory = getAllMarketHistory;