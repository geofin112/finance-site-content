import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Financial Analysis | Professional Trading Strategy & Journal',
  description: 'Institutional-grade trading strategies, ICT & Smart Money concepts, daily market analysis, and trading mentorship for serious traders.',
  openGraph: {
    title: 'Financial Analysis — Institutional Edge Framework',
    description: 'Professional trading strategy, blog, and journaling for prop firm traders.',
    url: 'https://financialanalysis.uk',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function NavBar() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/strategy', label: 'Strategy' },
    { href: '/blog', label: 'Analysis' },
    { href: '/journal', label: 'Journal' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,11,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    }}>
      {/* Ticker bar */}
      <div style={{
        background: 'rgba(201,168,76,0.06)',
        borderBottom: '0.5px solid rgba(201,168,76,0.15)',
        overflow: 'hidden', height: '28px', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ whiteSpace: 'nowrap', animation: 'ticker-scroll 40s linear infinite', display: 'flex', gap: '3rem', paddingLeft: '100%', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>
          {['NAS100 · STRATEGY ACTIVE', 'US30 · ICT FRAMEWORK', 'BTC · LIVE PRICES', 'PROP FIRM · PASSING PROTOCOL', 'NAS100 · STRATEGY ACTIVE', 'US30 · ICT FRAMEWORK', 'BTC · LIVE PRICES', 'PROP FIRM · PASSING PROTOCOL'].map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'pulse-gold 2s ease-in-out infinite' }}></span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 32, height: 32, background: 'var(--gold)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polyline points="2,13 6,8 9,11 13,5 16,7" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '0.05em', color: 'var(--text-1)', lineHeight: 1 }}>FINANCIAL ANALYSIS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.15em', lineHeight: 1 }}>INSTITUTIONAL EDGE FRAMEWORK</div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: 'var(--text-2)', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
            >{l.label}</Link>
          ))}
          <a href="mailto:contact@financialanalysis.uk" style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em',
            padding: '7px 16px', border: '0.5px solid var(--gold)', borderRadius: '5px',
            color: 'var(--gold)', textTransform: 'uppercase', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = '#0A0A0B'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
          >Mentoring</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: '0.5px solid rgba(255,255,255,0.07)',
      background: 'var(--bg-1)',
      marginTop: '5rem',
      padding: '3rem 0 2rem',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>FINANCIAL ANALYSIS</div>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '300px' }}>
              Institutional-grade trading education. ICT & Smart Money concepts applied to NAS100 and US30 for prop firm traders.
            </p>
            <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gold)' }}>financialanalysis.uk</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Navigate</div>
            {[['/', 'Home'], ['/strategy', 'Strategy'], ['/blog', 'Analysis'], ['/journal', 'Journal']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: '0.5rem' }}>
                <Link href={href} style={{ fontSize: '13px', color: 'var(--text-2)' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Legal</div>
            <p style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.7 }}>
              For educational purposes only. Not financial advice. Trading involves significant risk of loss.
            </p>
          </div>
        </div>
        <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>© {new Date().getFullYear()} Financial Analysis. All rights reserved.</span>
          <span style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>Strategy v4.2 · ICT Framework</span>
        </div>
      </div>
    </footer>
  );
}
