"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";

export default function PostPage({ params }) {
  const { slug } = params;
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    fetch(`/blog/posts/${slug}.md`)
      .then(res => res.text())
      .then(md => setContent(marked(md)))
      .catch(() => setContent("Post not found"));
  }, [slug]);

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}