import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

function getPosts() {
  const dir = path.join(process.cwd(), 'content', 'posts');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .reverse()
    .map(file => {
      const slug = file.replace('.md', '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date || '',
        excerpt: data.excerpt || content.replace(/[#*`]/g, '').slice(0, 160).trim() + '...',
        tag: data.tag || 'Analysis',
        instrument: data.instrument || '',
        bias: data.bias || '',
      };
    });
}

export const metadata = { title: 'Market Analysis | Financial Analysis' };

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)', padding: '3rem 0 2rem', background: 'var(--bg-1)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Daily Intelligence</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>MARKET ANALYSIS</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)' }}>ICT & Smart Money analysis. NAS100 · US30 · Crypto. Updated daily during active sessions.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 2rem' }}>
        {posts.length === 0 ? (
          <EmptyState
            title="No analysis posts yet"
            desc="Add Markdown files to content/posts/ to publish your analysis."
            example={`---\ntitle: NAS100 Bullish Bias — NY Open Setup\ndate: 2024-01-15\ntag: NAS100\ninstrument: NAS100\nbias: Bullish\nexcerpt: Price swept SSL at 17,420 into London KZ...\n---\n\n# NAS100 Analysis\n\nYour analysis here...`}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {posts.map(post => <BlogCard key={post.slug} post={post} base="/blog" />)}
          </div>
        )}
      </div>
    </div>
  );
}

export function BlogCard({ post, base }) {
  const biasColor = post.bias?.toLowerCase() === 'bullish' ? '#2ECC71' : post.bias?.toLowerCase() === 'bearish' ? '#E74C3C' : 'var(--text-3)';
  return (
    <Link href={`${base}/${post.slug}`} style={{ display: 'block', background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderRadius: '10px', padding: '1.5rem', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {post.tag && <span className="tag tag-gold">{post.tag}</span>}
          {post.instrument && <span className="tag tag-gray">{post.instrument}</span>}
          {post.bias && <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 500, color: biasColor, background: `${biasColor}15`, border: `0.5px solid ${biasColor}40`, textTransform: 'uppercase' }}>{post.bias}</span>}
        </div>
        {post.date && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', flexShrink: 0 }}>{post.date}</span>}
      </div>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-1)', marginBottom: '0.5rem', textTransform: 'capitalize', lineHeight: 1.4 }}>{post.title}</h2>
      <p style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.6, marginBottom: '1rem' }}>{post.excerpt}</p>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold)' }}>Read Analysis →</span>
    </Link>
  );
}

export function EmptyState({ title, desc, example }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.04em', color: 'var(--text-3)', marginBottom: '0.75rem' }}>{title}</div>
      <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '2rem' }}>{desc}</p>
      {example && (
        <div style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1.25rem', textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Example file format</div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-2)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{example}</pre>
        </div>
      )}
    </div>
  );
}
