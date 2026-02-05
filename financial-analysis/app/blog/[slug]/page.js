import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function PostPage({ params }) {
  const filePath = path.join(process.cwd(), "content/posts", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return (
    <main style={{ padding: "3rem" }}>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <div style={{ marginTop: "2rem", lineHeight: "1.6" }}>{content}</div>
    </main>
  );
}