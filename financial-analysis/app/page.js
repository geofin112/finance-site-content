"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [prices, setPrices] = useState(null);
  const [posts, setPosts] = useState([]);

  async function fetchPrices() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold&vs_currencies=usd"
    );
    const data = await res.json();
    setPrices(data);
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/blog/posts/index.json")
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3)));
  }, []);

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Financial Analysis Dashboard</h1>

      <p>Live market prices (powered by CoinGecko)</p>

      {prices && (
        <ul style={{ fontSize: "18px" }}>
          <li>Bitcoin (BTC): ${prices.bitcoin.usd}</li>
          <li>Ethereum (ETH): ${prices.ethereum.usd}</li>
          <li>Gold (PAXG): ${prices["pax-gold"].usd}</li>
        </ul>
      )}

      <hr style={{ margin: "40px 0" }} />

      <h2>Latest Trading Journal</h2>

      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>
              {post.title}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="/blog"
        style={{
          display: "inline-block",
          marginTop: "20px",
          color: "#0070f3"
        }}
      >
        View All Posts →
      </a>
    </main>
  );
}