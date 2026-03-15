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
    <main style={{ padding: "40px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
        {content}
      </pre>
    </main>
  );
}