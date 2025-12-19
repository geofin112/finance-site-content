import 'dotenv/config';

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

export async function fetchStockPrice(symbol = 'AAPL') {
  if (!API_KEY) {
    throw new Error('Alpha Vantage API key missing');
  }

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  const quote = json['Global Quote'];

  if (!quote || !quote['05. price']) {
    throw new Error('Invalid Alpha Vantage response');
  }

  return {
    symbol,
    price: parseFloat(quote['05. price']),
    source: 'alphavantage',
  };
}
