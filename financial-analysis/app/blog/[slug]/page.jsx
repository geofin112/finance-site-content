import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'posts');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => ({ slug: f.replace('.md', '') }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) return { title: 'Post Not Found' };
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
  return { title: `${data.title || slug} | Financial Analysis` };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const html = marked(content);
  const biasColor = data.bias?.toLowerCase() === 'bullish' ? '#2ECC71' : data.bias?.toLowerCase() === 'bearish' ? '#E74C3C' : 'var(--text-3)';

  return (
    <div>
      {/* Post Header */}
      <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)', padding: '3rem 0 2.5rem', background: 'var(--bg-1)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' }}>← Back to Analysis</Link>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {data.tag && <span className="tag tag-gold">{data.tag}</span>}
            {data.instrument && <span className="tag tag-gray">{data.instrument}</span>}
            {data.bias && <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 500, color: biasColor, background: `${biasColor}15`, border: `0.5px solid ${biasColor}40`, textTransform: 'uppercase' }}>{data.bias}</span>}
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: '1rem', textTransform: 'capitalize' }}>
            {data.title || slug.replace(/-/g, ' ')}
          </h1>

          {(data.date || data.session) && (
            <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-3)' }}>
              {data.date && <span>{data.date}</span>}
              {data.session && <span>Session: {data.session}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Key levels box if present */}
      {(data.entry || data.sl || data.tp1 || data.tp2) && (
        <div className="container" style={{ maxWidth: '820px', padding: '2rem 2rem 0' }}>
          <div style={{ background: 'var(--bg-2)', border: '0.5px solid rgba(201,168,76,0.3)', borderRadius: '10px', padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
            {data.entry && <Level label="Entry" value={data.entry} color="var(--gold)" />}
            {data.sl && <Level label="Stop Loss" value={data.sl} color="#E74C3C" />}
            {data.tp1 && <Level label="TP1 (1R)" value={data.tp1} color="#2ECC71" />}
            {data.tp2 && <Level label="TP2 (2R+)" value={data.tp2} color="#2ECC71" />}
            {data.rr && <Level label="R:R" value={data.rr} color="var(--gold)" />}
            {data.result && <Level label="Result" value={data.result} color={data.result.includes('+') ? '#2ECC71' : '#E74C3C'} />}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container" style={{ maxWidth: '820px', padding: '2.5rem 2rem 4rem' }}>
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '2rem', marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-3)', letterSpacing: '0.08em' }}>← All Analysis</Link>
          <Link href="/journal" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.08em' }}>Trade Journal →</Link>
        </div>
      </div>
    </div>
  );
}

function Level({ label, value, color }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color }}>{value}</div>
    </div>
  );
}
