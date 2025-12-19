const API_KEY = process.env.NASDAQ_API_KEY;

const METAL_MAP = {
  GOLD: {
    dataset: 'LBMA/GOLD',
    column: 1,
    name: 'Gold',
    unit: 'USD/oz'
  },
  SILVER: {
    dataset: 'LBMA/SILVER',
    column: 1,
    name: 'Silver',
    unit: 'USD/oz'
  }
};

export async function fetchMetal(symbol) {
  if (!API_KEY) throw new Error('NASDAQ API key missing');

  const meta = METAL_MAP[symbol];
  if (!meta) throw new Error(`Unsupported metal: ${symbol}`);

  const url = `https://data.nasdaq.com/api/v3/datasets/${meta.dataset}/data.json?rows=1&api_key=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json?.dataset_data?.data?.length) {
    throw new Error(`Invalid response for ${symbol}`);
  }

  const latest = json.dataset_data.data[0];
  const price = Number(latest[meta.column]);

  return {
    name: meta.name,
    symbol,
    price,
    unit: meta.unit,
    source: 'nasdaq'
  };
}