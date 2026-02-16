"use client";

import Link from "next/link";

export default function BlogPage() {
  const posts = [
    { slug: "first-post", title: "My First Trading Journal" },
    { slug: "second-post", title: "Intraday Strategies Insights" },
  ];

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Trading Journal & Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} style={{ color: "#0070f3" }}>
              {post.title} &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}