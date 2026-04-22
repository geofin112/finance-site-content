import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

async function getPrices() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold,nasdaq-100&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 30 } }
    );
    return await res.json();
  } catch {
    return { bitcoin: { usd: 0, usd_24h_change: 0 }, ethereum: { usd: 0, usd_24h_change: 0 }, 'pax-gold': { usd: 0, usd_24h_change: 0 } };
  }
}

function getPosts(dir) {
  try {
    const postsDir = path.join(process.cwd(), 'content', dir);
    if (!fs.existsSync(postsDir)) return [];
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).reverse();
    return files.slice(0, 3).map(file => {
      const slug = file.replace('.md', '');
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date || '',
        excerpt: data.excerpt || content.slice(0, 120).replace(/[#*]/g, '') + '...',
        tag: data.tag || 'Analysis',
      };
    });
  } catch { return []; }
}

const priceConfig = [
  { id: 'bitcoin', label: 'BTC', icon: '₿' },
  { id: 'ethereum', label: 'ETH', icon: 'Ξ' },
  { id: 'pax-gold', label: 'PAXG', icon: '◆' },
];

export default async function Home() {
  const prices = await getPrices();
  const blogs = getPosts('posts');
  const journals = getPosts('journal');

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '6rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 8px var(--green)', animation: 'pulse-gold 2s infinite' }}></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live Market Intelligence · London & NY Session</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: '1.5rem', color: 'var(--text-1)' }}>
            TRADE WITH<br /><span style={{ color: 'var(--gold)' }}>INSTITUTIONAL</span><br />PRECISION
          </h1>

          <p style={{ fontSize: '15px', color: 'var(--text-2)', maxWidth: '480px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            ICT & Smart Money framework for NAS100 and US30. Prop firm proven strategy with 67%+ win rate. Daily analysis, trading journal, and mentorship.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/strategy" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--gold)', color: '#0A0A0B',
              padding: '12px 28px', borderRadius: '6px',
              fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              View Strategy Framework →
            </Link>
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '0.5px solid var(--border-2)', color: 'var(--text-1)',
              padding: '12px 28px', borderRadius: '6px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Read Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Live Prices */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {priceConfig.map(({ id, label, icon }) => {
              const price = prices[id];
              const change = price?.usd_24h_change || 0;
              const isPos = change >= 0;
              return (
                <div key={id} style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderRadius: '10px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: '6px' }}>{icon} {label} / USD</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 500, color: 'var(--text-1)' }}>
                      ${price?.usd ? price.usd.toLocaleString() : '—'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: isPos ? 'var(--green)' : 'var(--red)' }}>
                      {isPos ? '+' : ''}{change.toFixed(2)}%
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>24H</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border-gold)', borderRadius: '10px', padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {[['67.3%', 'Win Rate', '312 trades'], ['2.6R', 'Avg R:R', 'Per trade'], ['3.41', 'Profit Factor', 'Backtest 18mo'], ['4.2%', 'Max DD', 'Prop safe']].map(([val, label, sub]) => (
              <div key={label} style={{ padding: '0.5rem', borderRight: '0.5px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', letterSpacing: '0.04em', color: 'var(--gold)' }}>{val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px' }}>{label}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Analysis + Journal */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

            {/* Blog */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Latest</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.04em' }}>MARKET ANALYSIS</h2>
                </div>
                <Link href="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '0.1em' }}>All Posts →</Link>
              </div>

              {blogs.length === 0 ? (
                <EmptyCard href="/blog" label="No analysis posts yet. Add .md files to content/posts/" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {blogs.map(post => <PostCard key={post.slug} post={post} base="/blog" />)}
                </div>
              )}
            </div>

            {/* Journal */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Personal</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.04em' }}>TRADE JOURNAL</h2>
                </div>
                <Link href="/journal" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '0.1em' }}>All Entries →</Link>
              </div>

              {journals.length === 0 ? (
                <EmptyCard href="/journal" label="No journal entries yet. Add .md files to content/journal/" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {journals.map(post => <PostCard key={post.slug} post={post} base="/journal" />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, var(--bg-2) 0%, rgba(201,168,76,0.05) 100%)', border: '0.5px solid var(--border-gold)', borderRadius: '12px', padding: '3.5rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>1-on-1 Mentorship</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.04em', marginBottom: '1rem' }}>READY TO PASS YOUR PROP FIRM?</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Get personalised mentoring on ICT & Smart Money concepts. Learn to read liquidity, identify setups, and build a consistent edge.
            </p>
            <a href="mailto:contact@financialanalysis.uk" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--gold)', color: '#0A0A0B',
              padding: '14px 32px', borderRadius: '6px',
              fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Apply for Mentorship →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function PostCard({ post, base }) {
  return (
    <Link href={`${base}/${post.slug}`} style={{ display: 'block', background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1.25rem', transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-gold)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--text-1)', textTransform: 'capitalize', flex: 1 }}>{post.title}</h3>
        {post.date && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', flexShrink: 0, marginLeft: '0.5rem' }}>{post.date}</span>}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.6 }}>{post.excerpt}</p>
      <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="tag tag-gold">{post.tag}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold)' }}>Read →</span>
      </div>
    </Link>
  );
}

function EmptyCard({ href, label }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '0.5px dashed var(--border-2)', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>{label}</p>
      <Link href={href} style={{ marginTop: '1rem', display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold)' }}>View section →</Link>
    </div>
  );
}
