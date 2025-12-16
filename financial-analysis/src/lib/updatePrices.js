 import 'dotenv/config';
import { supabase } from './supabaseClient.js';
import { fetchCryptoPrices } from './fetchPrices.js';

export async function updatePrices() {
  try {
    const prices = await fetchCryptoPrices();

    // Log fetched data
    console.log('Fetched prices:', prices);

    if (!prices || prices.length === 0) {
      console.log('No prices to upsert. Exiting.');
      return;
    }

    // UPSERT with explicit row return
    const { data, error } = await supabase
      .from('prices')
      .upsert(
        prices.map(p => ({
          symbol: p.symbol,
          price: p.price,
          source: p.source
        })),
        { onConflict: 'symbol' }
      )
      .select(); // IMPORTANT: forces Supabase to return rows

    if (error) {
      console.error('Supabase upsert error:', error);
    } else {
      console.log('Upserted rows:', data);
    }

  } catch (err) {
    console.error('Error in updatePrices:', err);
  }
}

// Run script directly from CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  updatePrices()
    .then(() => console.log('Done'))
    .catch(console.error);
}