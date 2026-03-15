import fs from "fs";
import path from "path";

export default function PostPage({ params }) {

  const { slug } = params;

  const filePath = path.join(
    process.cwd(),
    "content/posts",
    `${slug}.md`
  );

  const content = fs.readFileSync(filePath, "utf8");

  return (
    <main style={{ maxWidth: "800px", margin: "60px auto", padding: "20px" }}>
      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "Georgia" }}>
        {content}
      </pre>
    </main>
  );
}