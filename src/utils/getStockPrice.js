const axios = require('axios');
require('dotenv').config();

async function getStockPrice(stockSymbol) {
    const apiKey = process.env.AlphaVantageAPIKey;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data['Time Series (1min)']) {
            const latestTime = Object.keys(data['Time Series (1min)'])[0];
            const stockPrice = data['Time Series (1min)'][latestTime]['4. close'];

            return `The latest stock price for ${stockSymbol} is ${stockPrice}`;
        } else {
            throw new Error('Stock data not found');
        }
    } catch (err) {
        throw new Error(`Error fetching stock price for ${stockSymbol}: ${err.message}`);
    }
}

module.exports = getStockPrice;