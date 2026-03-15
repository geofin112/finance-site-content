"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/blog/posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.text();
      })
      .then(text => setContent(text))
      .catch(() => setContent("Post not found"));
  }, [slug]);

  return (
  <main
    style={{
      maxWidth: "800px",
      margin: "60px auto",
      padding: "0 20px",
      lineHeight: "1.7",
      fontSize: "18px"
    }}
  >
    <article>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontFamily: "Georgia, serif"
        }}
      >
        {content}
      </pre>
    </article>

    <hr style={{ margin: "40px 0" }} />

    <a
      href="/blog"
      style={{
        textDecoration: "none",
        color: "#0070f3",
        fontWeight: "bold"
      }}
    >
      ← Back to Trading Journal
    </a>
  </main>
);
}