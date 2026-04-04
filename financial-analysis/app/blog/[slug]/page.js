import fs from "fs";
import path from "path";
import { marked } from "marked";

export default async function PostPage({ params }) {
  const { slug } = await params;   // ✅ FIX

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

  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <article dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </main>
  );
}