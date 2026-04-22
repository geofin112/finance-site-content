'use client';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/strategy', label: 'Strategy' },
  { href: '/blog', label: 'Analysis' },
  { href: '/journal', label: 'Journal' },
];

export default function NavBar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mentorHovered, setMentorHovered] = useState(false);

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
        <div style={{
          whiteSpace: 'nowrap',
          animation: 'ticker-scroll 40s linear infinite',
          display: 'flex', gap: '3rem',
          paddingLeft: '100%',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-2)',
        }}>
          {['NAS100 · STRATEGY ACTIVE', 'US30 · ICT FRAMEWORK', 'BTC · LIVE PRICES', 'PROP FIRM · PASSING PROTOCOL',
            'NAS100 · STRATEGY ACTIVE', 'US30 · ICT FRAMEWORK', 'BTC · LIVE PRICES', 'PROP FIRM · PASSING PROTOCOL'
          ].map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--gold)', display: 'inline-block',
                animation: 'pulse-gold 2s ease-in-out infinite',
              }}></span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '60px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, background: 'var(--gold)',
            borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polyline points="2,13 6,8 9,11 13,5 16,7" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', letterSpacing: '0.05em', color: 'var(--text-1)', lineHeight: 1 }}>
              FINANCIAL ANALYSIS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.15em', lineHeight: 1 }}>
              INSTITUTIONAL EDGE FRAMEWORK
            </div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: hoveredLink === l.href ? 'var(--gold)' : 'var(--text-2)',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={() => setHoveredLink(l.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:contact@financialanalysis.uk"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              padding: '7px 16px',
              border: '0.5px solid var(--gold)',
              borderRadius: '5px',
              color: mentorHovered ? '#0A0A0B' : 'var(--gold)',
              background: mentorHovered ? 'var(--gold)' : 'transparent',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={() => setMentorHovered(true)}
            onMouseLeave={() => setMentorHovered(false)}
          >
            Mentoring
          </a>
        </nav>
      </div>
    </header>
  );
}
