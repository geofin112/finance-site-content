import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// ✅ SEO METADATA (dynamic per post)
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const cleanSlug = slug?.trim().toLowerCase();

  const filePath = path.join(
    process.cwd(),
    "content",
    "posts",
    `${cleanSlug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return {
      title: "Post Not Found",
      description: "This post does not exist",
    };
  }

  const file = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(file);

  return {
    title: data.title || cleanSlug,
    description:
      data.description ||
      "Financial analysis, trading insights, and market breakdowns",

    openGraph: {
      title: data.title || cleanSlug,
      description:
        data.description ||
        "Financial analysis and trading journal",
      type: "article",
    },

    // ✅ OPTIONAL (but recommended)
    twitter: {
      card: "summary_large_image",
      title: data.title || cleanSlug,
      description:
        data.description ||
        "Financial analysis and trading insights",
    },
  };
}

// ✅ PAGE RENDERING
export default async function PostPage({ params }) {
  const { slug } = await params;

  const cleanSlug = slug?.trim().toLowerCase();

  const filePath = path.join(
    process.cwd(),
    "content",
    "posts",
    `${cleanSlug}.md`
  );

  console.log("Slug:", cleanSlug);
  console.log("Path:", filePath);

  if (!fs.existsSync(filePath)) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Post not found</h1>
        <p>{cleanSlug} does not exist.</p>
      </main>
    );
  }

  const file = fs.readFileSync(filePath, "utf-8");

  // ✅ extract metadata + content
  const { data, content } = matter(file);

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1>{data.title}</h1>
      <p style={{ color: "gray" }}>{data.date}</p>

      <article dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </main>
  );
}