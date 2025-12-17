import { supabase } from '@/lib/supabaseClient';

export default async function Home() {
  let data = null;
  let error = null;

  try {
    const response = await supabase
      .from('prices')
      .select('*')
      .eq('symbol', 'BTC')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    data = response.data;
    error = response.error;
  } catch (err) {
    error = err;
  }

  if (error || !data) {
    return (
      <main style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>Live Bitcoin (BTC) Price</h1>
        <p>Market data temporarily unavailable.</p>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '4rem 2rem',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        lineHeight: 1.6,
      }}
    >
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Financial Market Monitor
        </h1>
        <p style={{ color: '#555', fontSize: '0.95rem' }}>
          Live digital asset pricing sourced from independent market data providers
        </p>
      </header>

      <section
        style={{
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
        }}
      >
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
          Bitcoin (BTC)
        </h2>

        <div style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}>
          ${data.price.toLocaleString()}
        </div>

        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          <div>Source: {data.source}</div>
          <div>
            Last updated: {new Date(data.created_at).toLocaleString()}
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#777' }}>
        Data provided for informational purposes only. No financial advice.
      </footer>
    </main>
  );
}