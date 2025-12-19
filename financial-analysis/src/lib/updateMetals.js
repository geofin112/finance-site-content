import 'dotenv/config';
import { supabase } from './supabaseClient.js';
import { fetchMetal } from './fetchMetals.js';

export async function updateMetals() {
  const minuteBucket = Math.floor(Date.now() / 1000 / 60);
  const METALS = ['GOLD', 'SILVER'];

  for (const metal of METALS) {
    try {
      console.log(`Fetching ${metal}...`);

      const data = await fetchMetal(metal);

      const { error } = await supabase
        .from('metals')
        .insert({
          name: data.name,
          symbol: data.symbol,
          price: data.price,
          unit: data.unit,
          source: data.source,
          minute_bucket: minuteBucket
        });

      if (error) throw error;

      console.log(`${metal} inserted`);
    } catch (err) {
      console.error(`Failed for ${metal}:`, err.message);
    }
  }
}

// Direct execution
if (import.meta.url === `file://${process.argv[1]}`) {
  updateMetals().then(() => console.log('Metal update complete'));
}