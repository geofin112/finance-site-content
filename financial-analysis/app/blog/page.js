import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function BlogPage() {
  const dirPath = path.join(process.cwd(), 'content', 'posts');
  const files = fs.readdirSync(dirPath);

  const posts = files.map((file) => {
    const slug = file.replace('.md', '');
    return {
      slug,
      title: slug.replace(/-/g, ' ')
    };
  });

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Trading Journal</h1>

      <ul>
        {posts.map((post) => (
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