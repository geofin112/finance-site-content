import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('prices')
    .select('symbol, price, source, created_at')
    .eq('symbol', 'BTC')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data[0]), {
    headers: { 'Content-Type': 'application/json' },
  });
}