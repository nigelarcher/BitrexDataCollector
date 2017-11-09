const marketService = require('./services/market');
const fs = require('fs');

const toTimestamp = (strDate) => {
  var datum = Date.parse(strDate);
  return datum/1000;
};

const saveMarketSummary = (repeat) => {
  return marketService.getMarketSummaries().then(result => {
    const date = new Date();
    const timeStamp = toTimestamp(date);
    console.log(`Saving Market Summaries to ./data/${timeStamp}-MarketSummaries.json`);
    fs.writeFileSync(`./data/${timeStamp}-MarketSummaries.json`, JSON.stringify({ time: date.toISOString(), values: result }));
    if(repeat) {
      const tempdate = Date.now() + 5 * 1000 * 60;
      const nextDate = new Date(tempdate);
      console.log(`Will run again at ${nextDate.toISOString()}`);
      setTimeout(() => { saveMarketSummary(true); }, 5 * 1000 * 60);
    }
  })
  .catch(err => {
    const date = new Date();
    const timeStamp = toTimestamp(date);
    console.log(err);
    console.log(`Error Saving Market Summaries to ./data/${timeStamp}-AllMarketHistory.json`);
    if(repeat) {
      const tempdate = Date.now() + 5 * 1000 * 60;
      const nextDate = new Date(tempdate);
      console.log(`Will run again at ${nextDate.toISOString()}`);
      setTimeout(() => { saveAllMarketOrders(true); }, 5 * 1000 * 60);
    }
  });
}

const saveAllMarketOrders = (repeat) => {
  return marketService.getAllMarketOrderBook().then(result => {
    const date = new Date();
    const timeStamp = toTimestamp(date);
    console.log(`Saving Market Order Book to ./data/${timeStamp}-AllMarketOrderBook.json`);
    fs.writeFileSync(`./data/${timeStamp}-AllMarketOrderBook.json`, JSON.stringify({ time: date.toISOString(), values: result }));
    if(repeat) {
      const tempdate = Date.now() + 5 * 1000 * 60;
      const nextDate = new Date(tempdate);
      console.log(`Will run again at ${nextDate.toISOString()}`);
      setTimeout(() => { saveAllMarketOrders(true); }, 5 * 1000 * 60);
    }
  })
  .catch(err => {
    const date = new Date();
    const timeStamp = toTimestamp(date);
    console.log(err);
    console.log(`Error Saving Market Order Book to ./data/${timeStamp}-AllMarketHistory.json`);
    if(repeat) {
      const tempdate = Date.now() + 5 * 1000 * 60;
      const nextDate = new Date(tempdate);
      console.log(`Will run again at ${nextDate.toISOString()}`);
      setTimeout(() => { saveAllMarketOrders(true); }, 5 * 1000 * 60);
    }
  });
}

const saveAllMarketHistory = (repeat) => {
  return marketService.getAllMarketHistory().then(result => {
    const date = new Date();
    const timeStamp = toTimestamp(date);
    console.log(`Saving Market History to ./data/${timeStamp}-AllMarketHistory.json`);
    fs.writeFileSync(`./data/${timeStamp}-AllMarketHistory.json`, JSON.stringify({ time: date.toISOString(), values: result }));
    if(repeat) {
      const tempdate = Date.now() + 5 * 1000 * 60;
      const nextDate = new Date(tempdate);
      console.log(`Will run again at ${nextDate.toISOString()}`);
      setTimeout(() => { saveAllMarketHistory(true); }, 5 * 1000 * 60);
    }
  })
  .catch(err => {
    const date = new Date();
    const timeStamp = toTimestamp(date);
    console.log(err);
    console.log(`Error Saving Market History to ./data/${timeStamp}-AllMarketHistory.json`);
    if(repeat) {
      const tempdate = Date.now() + 5 * 1000 * 60;
      const nextDate = new Date(tempdate);
      console.log(`Will run again at ${nextDate.toISOString()}`);
      setTimeout(() => { saveAllMarketHistory(true); }, 5 * 1000 * 60);
    }
  });
}

saveMarketSummary(true);
saveAllMarketOrders(true);
saveAllMarketHistory(true);
