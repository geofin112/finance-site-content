import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts');
  let posts = [];

  try {
    posts = fs.readdirSync(postsDir).map((file) => ({
      slug: file.replace('.md', ''),
      title: file.replace('.md', ''),
    }));
  } catch (err) {
    console.log('No posts yet.');
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}