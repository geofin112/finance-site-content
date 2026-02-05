import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export default function PostPage({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'app', 'blog', 'posts', `${slug}.md`);
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : 'Post not found';

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <article dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </main>
  );
}