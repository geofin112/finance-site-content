import fetch from 'node-fetch';

const API_KEY = process.env.NASDAQ_API_KEY; // hdR_SP5xgW7yg_yys84y
const METALS = {
  GOLD: 'LBMA/GOLD',
  SILVER: 'LBMA/SILVER'
};

export async function fetchMetal(symbol) {
  if (!API_KEY) throw new Error('Nasdaq API key missing');

  const dataset = METALS[symbol];
  if (!dataset) throw new Error(`Unsupported metal: ${symbol}`);

  const url = `https://data.nasdaq.com/api/v3/datasets/${dataset}/data.json?api_key=${API_KEY}&rows=1`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json || !json.dataset_data || !json.dataset_data.data || !json.dataset_data.data[0]) {
    console.error('RAW RESPONSE:', json);
    throw new Error(`Invalid metal response for ${symbol}`);
  }

  const latest = json.dataset_data.data[0]; // usually [date, price, ...]
  const price = latest[1];

  return {
    name: symbol,
    price: Number(price),
    unit: 'USD/oz',
    source: 'nasdaq-datalink'
  };
}