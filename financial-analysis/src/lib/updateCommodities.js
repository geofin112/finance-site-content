import 'dotenv/config';
import { supabase } from './supabaseClient.js';
import { fetchCommodity } from './fetchCommodities.js';

export async function updateCommodities() {
  try {
    const minuteBucket = Math.floor(Date.now() / 1000 / 60);

    console.log('Fetching WTI...');

    const data = await fetchCommodity('WTI');

    const { error } = await supabase
      .from('commodities')
      .insert({
        name: data.name,
        price: data.price,
        unit: data.unit,
        source: data.source,
        minute_bucket: minuteBucket
      });

    if (error) {
      console.error('Insert failed for WTI:', error.message);
    } else {
      console.log('WTI inserted successfully');
    }

  } catch (err) {
    console.error('Commodity update failed:', err.message);
  }
}

// Direct execution
if (import.meta.url === `file://${process.argv[1]}`) {
  updateCommodities()
    .then(() => console.log('Commodity update complete'))
    .catch(console.error);
}