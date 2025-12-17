import { supabase } from '@/lib/supabaseClient';

async function getLatestCrypto() {
  const { data, error } = await supabase
    .from('prices')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function getLatestStocks() {
  const { data, error } = await supabase
    .from('stocks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export default async function Home() {
  let crypto = null;
  let stocks = [];
  let cryptoError = null;
  let stockError = null;

  try {
    crypto = await getLatestCrypto();
  } catch (err) {
    cryptoError = err.message;
  }

  try {
    stocks = await getLatestStocks();
  } catch (err) {
    stockError = err.message;
  }

  return (
    <main
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Financial Dashboard
        </h1>
        <p style={{ color: '#555' }}>
          Live crypto & stock prices from independent market data providers
        </p>
      </header>

      {/* Crypto Section */}
      <section
        style={{
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Cryptocurrency</h2>
        {cryptoError || !crypto ? (
          <p style={{ color: '#b00020' }}>Crypto data unavailable</p>
        ) : (
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>
            Bitcoin (BTC): ${crypto.price.toLocaleString()}  
            <span style={{ fontSize: '0.9rem', color: '#666', display: 'block' }}>
              Source: {crypto.source} | Last updated: {new Date(crypto.created_at).toLocaleString()}
            </span>
          </div>
        )}
      </section>

      {/* Stocks Section */}
      <section
        style={{
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
        }}
      >
        <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Stocks</h2>
        {stockError || stocks.length === 0 ? (
          <p style={{ color: '#b00020' }}>Stock data unavailable</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {stocks.map((stock) => (
              <li key={stock.id} style={{ marginBottom: '1rem' }}>
                <strong>{stock.symbol}:</strong> ${stock.price.toLocaleString()}{' '}
                <span style={{ fontSize: '0.85rem', color: '#666' }}>
                  Source: {stock.source} | Last updated: {new Date(stock.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#777' }}>
        Data provided for informational purposes only. No financial advice.
      </footer>
    </main>
  );
}