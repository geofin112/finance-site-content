import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

function getEntries() {
  const dir = path.join(process.cwd(), 'content', 'journal');
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
        excerpt: data.excerpt || content.replace(/[#*`]/g, '').slice(0, 140).trim() + '...',
        result: data.result || '',
        rr: data.rr || '',
        instrument: data.instrument || '',
        setup: data.setup || '',
        outcome: data.outcome || '',
      };
    });
}

export const metadata = { title: 'Trade Journal | Financial Analysis' };

export default function JournalPage() {
  const entries = getEntries();
  const wins = entries.filter(e => e.outcome?.toLowerCase() === 'win').length;
  const losses = entries.filter(e => e.outcome?.toLowerCase() === 'loss').length;

  return (
    <div>
      <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)', padding: '3rem 0 2rem', background: 'var(--bg-1)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Personal Record</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>TRADE JOURNAL</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '1.5rem' }}>Personal trade log — setups, results, lessons learned. Raw and honest.</p>

          {entries.length > 0 && (
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-2)' }}>
                Total: <strong style={{ color: 'var(--text-1)' }}>{entries.length}</strong>
              </div>
              {wins > 0 && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#2ECC71' }}>W: {wins}</div>}
              {losses > 0 && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#E74C3C' }}>L: {losses}</div>}
              {wins + losses > 0 && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--gold)' }}>WR: {Math.round((wins / (wins + losses)) * 100)}%</div>}
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 2rem' }}>
        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.04em', color: 'var(--text-3)', marginBottom: '0.75rem' }}>No journal entries yet</div>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '2rem' }}>Add .md files to content/journal/ to start logging your trades.</p>
            <div style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1.25rem', textAlign: 'left', maxWidth: '520px', margin: '0 auto' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Example: content/journal/nas100-long-jan15.md</div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-2)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{`---
title: NAS100 Long — SSL Sweep + FVG
date: 2024-01-15
instrument: NAS100
setup: SSL Sweep + FVG
entry: 17,245
sl: 17,190
tp1: 17,355
tp2: 17,465
rr: 2.4R
result: +2.4R
outcome: win
---

## Setup

Price swept the SSL at 17,190 during London KZ...

## Execution

Entered at FVG 50% level...

## Lesson

Patience paid off. Waited full 15M candle close...`}</pre>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {entries.map(entry => <JournalCard key={entry.slug} entry={entry} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function JournalCard({ entry }) {
  const isWin = entry.outcome?.toLowerCase() === 'win';
  const isLoss = entry.outcome?.toLowerCase() === 'loss';
  const outcomeColor = isWin ? '#2ECC71' : isLoss ? '#E74C3C' : 'var(--text-3)';

  return (
    <Link href={`/journal/${entry.slug}`} style={{ display: 'block', background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderLeft: `3px solid ${outcomeColor}`, borderRadius: '10px', padding: '1.25rem 1.5rem', textDecoration: 'none', transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderRightColor = 'rgba(201,168,76,0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderRightColor = 'rgba(255,255,255,0.07)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {entry.instrument && <span className="tag tag-gray">{entry.instrument}</span>}
          {entry.setup && <span className="tag tag-gold">{entry.setup}</span>}
          {entry.outcome && (
            <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: outcomeColor, background: `${outcomeColor}15`, border: `0.5px solid ${outcomeColor}40`, textTransform: 'uppercase' }}>{entry.outcome}</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {entry.result && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: outcomeColor }}>{entry.result}</span>}
          {entry.date && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)' }}>{entry.date}</span>}
        </div>
      </div>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-1)', margin: '0.75rem 0 0.4rem', textTransform: 'capitalize', lineHeight: 1.3 }}>{entry.title}</h2>
      <p style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.6 }}>{entry.excerpt}</p>
    </Link>
  );
}
