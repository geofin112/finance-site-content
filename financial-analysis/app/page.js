"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchPrices() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold&vs_currencies=usd"
      );
      const data = await res.json();
      setPrices(data);
      setLoading(false);
    } catch (err) {
      console.error("CoinGecko error:", err);
    }
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000); // update every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Financial Analysis Dashboard</h1>
      <p>Live market prices (powered by CoinGecko)</p>

      {loading && <p>Loading prices...</p>}
<section style={{ marginTop: '2rem' }}>
  <a href="/blog" style={{ color: '#0070f3', fontWeight: 'bold' }}>
    Visit the Blog &rarr;
  </a>
</section>
<a href="/blog" style={{ display: "block", marginBottom: "2rem" }}>
  📈 Read My Trading Journal
</a>
      {prices && (
        <ul style={{ fontSize: "18px" }}>
          <li>Bitcoin (BTC): ${prices.bitcoin.usd}</li>
          <li>Ethereum (ETH): ${prices.ethereum.usd}</li>
          <li>Gold (PAXG): ${prices["pax-gold"].usd}</li>
        </ul>
      )}
    </main>
  );
}