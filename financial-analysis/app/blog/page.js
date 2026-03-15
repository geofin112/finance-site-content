import fs from "fs";
import path from "path";
import Link from "next/link";

export default function BlogPage() {

  const postsDirectory = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map(filename => {
    const slug = filename.replace(".md", "");

    return {
      slug,
      title: slug.replace(/-/g, " ")
    };
  });

  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>Trading Journal</h1>

      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

    </main>
  );
}