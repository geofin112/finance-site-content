export async function fetchCryptoPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum"
  );
  const data = await res.json();

  // Format data to match your Supabase table columns
  return data.map((coin) => ({
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    source: "coingecko",
  }));
}