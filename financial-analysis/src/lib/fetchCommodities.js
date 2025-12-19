const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

/**
 * Alpha Vantage supports:
 * function = WTI
 * Response format:
 * {
 *   "data": [{ "date": "2025-12-17", "value": "74.32" }]
 * }
 */

export async function fetchCommodity(symbol) {
  if (!API_KEY) {
    throw new Error('Alpha Vantage API key missing');
  }

  if (symbol !== 'WTI') {
    throw new Error(`Unsupported commodity: ${symbol}`);
  }

  const url = `https://www.alphavantage.co/query?function=WTI&apikey=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  // Rate-limit / notice handling
  if (json.Note || json.Information) {
    throw new Error(`Alpha Vantage rate-limited`);
  }

  if (!json.data || !Array.isArray(json.data) || !json.data[0]?.value) {
    console.error('RAW RESPONSE:', json);
    throw new Error('Invalid WTI response');
  }

  const latest = json.data[0];

  return {
    name: 'Crude Oil (WTI)',
    price: Number(latest.value),
    unit: 'USD/barrel',
    source: 'alphavantage'
  };
}