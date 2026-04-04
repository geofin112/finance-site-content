import fs from "fs";
import path from "path";

export default async function Home() {
  // ✅ Fetch prices (server-side)
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold&vs_currencies=usd",
    { next: { revalidate: 15 } } // auto refresh
  );
  const prices = await res.json();

  // ✅ Read markdown posts
  const dirPath = path.join(process.cwd(), "content", "posts");
  const files = fs.readdirSync(dirPath);

  const posts = files.slice(0, 3).map(file => ({
    slug: file.replace(".md", ""),
    title: file.replace(".md", "").replace(/-/g, " "),
  }));

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Financial Analysis Dashboard</h1>

      <p>Live market prices (powered by CoinGecko)</p>

      <ul style={{ fontSize: "18px" }}>
        <li>Bitcoin (BTC): ${prices.bitcoin.usd}</li>
        <li>Ethereum (ETH): ${prices.ethereum.usd}</li>
        <li>Gold (PAXG): ${prices["pax-gold"].usd}</li>
      </ul>

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

      <a href="/blog" style={{ marginTop: "20px", display: "inline-block" }}>
        View All Posts →
      </a>
    </main>
  );
}