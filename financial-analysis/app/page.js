import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function Home() {
  // ✅ Fetch prices (server-side with ISR)
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold&vs_currencies=usd",
    { next: { revalidate: 15 } }
  );
  const prices = await res.json();

  // ✅ Read markdown posts properly
  const dirPath = path.join(process.cwd(), "content", "posts");
  const files = fs.readdirSync(dirPath);

  const posts = files
    .map(file => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      const { data } = matter(fileContent);

      return {
        slug: file.replace(".md", ""),
        title: data.title || file.replace(".md", "").replace(/-/g, " "),
        date: data.date || "2000-01-01", // fallback safety
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // ✅ latest first
    .slice(0, 5); // ✅ top 5 only

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
              {post.title} ({post.date})
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