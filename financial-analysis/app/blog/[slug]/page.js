import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export default function PostPage({ params }) {
  const { slug } = params;

  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);

  // ✅ Prevent crash
  if (!fs.existsSync(filePath)) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Post not found</h1>
        <p>This blog post does not exist.</p>
      </main>
    );
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <article dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </main>
  );
}