import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts');
  let posts = [];

  try {
    posts = fs.readdirSync(postsDir).map((file) => ({
      slug: file.replace('.md', ''),
      title: file.replace('.md', ''),
    }));
  } catch (err) {
    console.log('No posts yet.');
  }

  return (
  <main
    style={{
      maxWidth: "900px",
      margin: "50px auto",
      padding: "0 20px"
    }}
  >
    <h1>Trading Journal</h1>
    <p style={{ color: "#555" }}>
      Daily market insights on Bitcoin, Ethereum and Gold.
    </p>

    <ul style={{ listStyle: "none", padding: 0 }}>
      {posts.map(post => (
        <li key={post.slug} style={{ marginBottom: "25px" }}>
          <a
            href={`/blog/${post.slug}`}
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#0070f3",
              textDecoration: "none"
            }}
          >
            {post.title}
          </a>

          <div style={{ color: "#777", fontSize: "14px" }}>
            {post.date}
          </div>
        </li>
      ))}
    </ul>
  </main>
);
}