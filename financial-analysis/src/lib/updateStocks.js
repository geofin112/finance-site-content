import 'dotenv/config';
import { supabase } from './supabaseClient.js';
import { fetchStockPrice } from './fetchStocks.js';

// Add your stock symbols here
const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];

export async function updateStocks() {
  try {
    console.log('Fetching stock prices...');

    const minuteBucket = Math.floor(Date.now() / 1000 / 60);
    const results = [];

    for (const symbol of STOCK_SYMBOLS) {
      try {
        const stock = await fetchStockPrice(symbol);
        console.log(`Fetched ${symbol}:`, stock);

        // Upsert stock with minute_bucket
        const { data, error } = await supabase
          .from('stocks')
          .upsert(
            {
              symbol: stock.symbol,
              price: stock.price,
              source: stock.source,
              minute_bucket: minuteBucket
            },
            { onConflict: ['symbol', 'minute_bucket'] }
          )
          .select();

        if (error) {
          console.error(`Supabase upsert error for ${symbol}:`, error);
        } else {
          console.log(`Upserted ${symbol}:`, data);
          results.push(data);
        }
      } catch (fetchErr) {
        console.error(`Error fetching ${symbol}:`, fetchErr.message);
      }
    }

    console.log('Stock update complete:', results);

  } catch (err) {
    console.error('Error updating stocks:', err.message);
  }
}

// Allow direct execution
if (import.meta.url === `file://${process.argv[1]}`) {
  updateStocks()
    .then(() => console.log('Stock update complete'))
    .catch(console.error);

  console.log('ENV CHECK:', {
    SUPABASE: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    ALPHA: !!process.env.ALPHAVANTAGE_API_KEY
  });
}