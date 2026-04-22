import './globals.css';
import NavBar from './NavBar';

export const metadata = {
  title: 'Financial Analysis | Professional Trading Strategy & Journal',
  description: 'Institutional-grade trading strategies, ICT & Smart Money concepts, daily market analysis, and trading mentorship for serious traders.',
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
                <a href={href} style={{ fontSize: '13px', color: 'var(--text-2)' }}>{label}</a>
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
