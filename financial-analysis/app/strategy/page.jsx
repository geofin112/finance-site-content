'use client';
import { useState } from 'react';

const TABS = ['Overview', 'Daily Checklist', 'Entry Rules', 'Backtest', 'Prop Protocol'];

export default function StrategyPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.07)', padding: '3rem 0 0', background: 'var(--bg-1)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Institutional Framework v4.2</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>TRADING STRATEGY</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '2rem', maxWidth: '540px' }}>ICT · Smart Money · Liquidity Engineering · NAS100 & US30 · Prop Firm Proven</p>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '2px', overflowX: 'auto' }}>
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} style={{
                padding: '10px 20px', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.06em',
                background: activeTab === i ? 'var(--bg-base)' : 'transparent',
                color: activeTab === i ? 'var(--gold)' : 'var(--text-3)',
                borderTop: activeTab === i ? '2px solid var(--gold)' : '2px solid transparent',
                borderRadius: '0', transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>{tab}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container" style={{ padding: '2.5rem 2rem' }}>
        {activeTab === 0 && <OverviewTab />}
        {activeTab === 1 && <ChecklistTab />}
        {activeTab === 2 && <EntryRulesTab />}
        {activeTab === 3 && <BacktestTab />}
        {activeTab === 4 && <PropTab />}
      </div>
    </div>
  );
}

/* ── Shared Components ── */
function SectionTitle({ children, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
      <div style={{ width: 3, height: 18, background: accent || 'var(--gold)', borderRadius: '2px', flexShrink: 0 }}></div>
      <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em' }}>{children}</h2>
    </div>
  );
}
function Card({ children, accent, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-2)', border: '0.5px solid var(--border)', borderRadius: '10px',
      padding: '1.25rem 1.5rem', borderLeft: accent ? `3px solid ${accent}` : undefined, ...style
    }}>{children}</div>
  );
}
function StatRow({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '0.5px solid var(--border)', fontSize: '13px' }}>
      <span style={{ color: 'var(--text-2)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: color || 'var(--text-1)' }}>{value}</span>
    </div>
  );
}
function Alert({ children, type = 'gold' }) {
  const colors = { gold: 'rgba(201,168,76,0.08)', green: 'rgba(46,204,113,0.08)', red: 'rgba(231,76,60,0.08)' };
  const borders = { gold: 'rgba(201,168,76,0.3)', green: 'rgba(46,204,113,0.25)', red: 'rgba(231,76,60,0.25)' };
  return (
    <div style={{ background: colors[type], border: `0.5px solid ${borders[type]}`, borderRadius: '8px', padding: '12px 16px', fontSize: '13px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
      {children}
    </div>
  );
}
function RuleBox({ title, badge, children, badgeType = 'green' }) {
  const badgeStyle = { green: 'tag-green', gold: 'tag-gold', gray: 'tag-gray' };
  return (
    <div style={{ border: '0.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem' }}>
      <div style={{ padding: '8px 14px', background: 'var(--bg-3)', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 500, fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>{title}</span>
        {badge && <span className={`tag ${badgeStyle[badgeType]}`}>{badge}</span>}
      </div>
      <div style={{ padding: '12px 14px', fontSize: '12px', fontFamily: 'var(--font-mono)', lineHeight: 1.8, color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

/* ── Tab 1: Overview ── */
function OverviewTab() {
  const metrics = [
    { label: 'Win Rate', value: '67.3%', sub: '312 trades · 18 months', color: '#2ECC71', accent: '#2ECC71' },
    { label: 'Avg R:R', value: '1 : 2.6R', sub: 'Min target 2R/trade', color: 'var(--gold)', accent: 'var(--gold)' },
    { label: 'Profit Factor', value: '3.41', sub: 'Gross profit / gross loss', color: '#3B82F6', accent: '#3B82F6' },
    { label: 'Max Drawdown', value: '4.2%', sub: 'Prop firm safe', color: '#E74C3C', accent: '#E74C3C' },
  ];
  const killZones = [
    { name: 'Asian Session', time: '8PM–12AM EST', color: '#3B82F6', note: 'Range builder' },
    { name: 'London Open KZ', time: '2AM–5AM EST', color: '#8B5CF6', note: '★ Primary' },
    { name: 'NY Open KZ', time: '7AM–10AM EST', color: 'var(--gold)', note: '★ Primary' },
    { name: 'London Close KZ', time: '10AM–12PM EST', color: '#2ECC71', note: 'Reversal setups' },
    { name: 'NY PM — Avoid', time: '12PM–4PM EST', color: '#E74C3C', note: 'Low probability' },
  ];
  const steps = [
    { n: 1, title: 'Map Liquidity Pools', tf: 'HTF', desc: 'Weekly/Daily: equal highs (BSL) and equal lows (SSL). Previous day H/L. Round numbers. These are magnets price WILL raid before reversing.' },
    { n: 2, title: 'Determine Intraday Bias', tf: '4H/Daily', desc: 'Is price above or below Daily EQ? Weekly candle direction? Nearest unmitigated PD array? This defines the ONLY direction you trade today.' },
    { n: 3, title: 'Wait for Liquidity Sweep', tf: '1H/4H', desc: 'Price must sweep a pool inside a kill zone. Buys: SSL swept below an obvious low. Sells: BSL swept above an obvious high.' },
    { n: 4, title: 'Market Structure Shift', tf: '1H/15M', desc: 'Post-sweep: price must break a prior internal swing high (bullish) or low (bearish). Without MSS — NO TRADE.' },
    { n: 5, title: 'Entry on PD Array', tf: '5M', desc: 'Limit order at FVG 50% or OB. SL below swept wick. Target next liquidity pool = 2R minimum.' },
  ];
  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {metrics.map(m => (
          <Card key={m.label} accent={m.accent}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.04em', color: m.color }}>{m.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>{m.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Timeframe Pyramid */}
        <Card>
          <SectionTitle>Multi-Timeframe Architecture</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px', marginBottom: '1rem' }}>
            {[['W', 'HTF Bias', false], ['D', 'PD Arrays', false], ['4H', 'Structure', true], ['1H', 'Setup Zone', true], ['5M', 'Entry', true]].map(([tf, role, active]) => (
              <div key={tf} style={{ border: `0.5px solid ${active ? 'var(--gold)' : 'var(--border)'}`, background: active ? 'rgba(201,168,76,0.06)' : 'var(--bg-3)', borderRadius: '6px', padding: '8px 4px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: active ? 'var(--gold)' : 'var(--text-2)' }}>{tf}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>{role}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1rem' }}>
            <SectionTitle>Core Edge Components</SectionTitle>
            {[['Liquidity Sweep + MSS', 'PRIMARY'], ['FVG / IFVG Retest', 'PRIMARY'], ['OB + Breaker Block', 'SECONDARY'], ['S/R Confluence', 'SECONDARY'], ['Kill Zone Timing', 'FILTER']].map(([item, badge]) => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '5px 0', borderBottom: '0.5px solid var(--border)' }}>
                <span style={{ color: 'var(--text-2)' }}>{item}</span>
                <span className={`tag ${badge === 'PRIMARY' ? 'tag-gold' : badge === 'SECONDARY' ? 'tag-gray' : 'tag-gray'}`}>{badge}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Kill Zones */}
        <Card>
          <SectionTitle>Kill Zone Schedule (EST)</SectionTitle>
          {killZones.map(kz => (
            <div key={kz.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '0.5px solid var(--border)', fontSize: '13px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: kz.color, flexShrink: 0 }}></div>
              <div style={{ fontWeight: 500, flex: 1 }}>{kz.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)' }}>{kz.time}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-3)', minWidth: '70px', textAlign: 'right' }}>{kz.note}</div>
            </div>
          ))}
          <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
            <SectionTitle>Instruments</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[['NAS100', 'NASDAQ 100 · High Volatility', '68.1%'], ['US30', 'Dow Jones 30 · Smoother', '66.4%']].map(([name, desc, wr]) => (
                <div key={name} style={{ background: 'var(--bg-3)', borderRadius: '6px', padding: '10px', textAlign: 'center', border: '0.5px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.04em' }}>{name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', margin: '3px 0' }}>{desc}</div>
                  <div style={{ fontSize: '12px', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>{wr} WR</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Flow */}
      <Card>
        <SectionTitle>Institutional Edge — Step by Step Flow</SectionTitle>
        {steps.map(s => (
          <div key={s.n} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '12px 0', borderBottom: '0.5px solid var(--border)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gold)', color: '#0A0A0B', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{s.title}</span>
                <span className="tag tag-gray">{s.tf}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ── Tab 2: Checklist ── */
const CHECKLIST_DATA = {
  'Phase 1 — Pre-Session Analysis': {
    color: 'var(--gold)', badge: 'Before 7AM EST', items: [
      ['Check economic calendar — mark FOMC, NFP, CPI, PPI', 'Use ForexFactory. Highlight HIGH impact events only.'],
      ['Mark Weekly High / Weekly Low as BSL and SSL', 'Primary liquidity targets for the week.'],
      ['Mark Previous Day High (PDH) and Previous Day Low (PDL)', 'PDH = buy-side liquidity. PDL = sell-side liquidity.'],
      ['Determine Weekly Candle Bias — bullish or bearish?', 'Bullish = look for longs only. Bearish = look for shorts only.'],
      ['Identify nearest unmitigated Daily FVG/OB in HTF direction', 'This is your draw on liquidity — price wants to go here.'],
      ['Mark Daily NWOG (New Week Opening Gap) if applicable', 'Price is magnetically attracted to fill weekly opening gaps.'],
      ['Note if price is above or below Daily EQ (50% of range)', 'Above EQ = premium (sell). Below EQ = discount (buy).'],
    ]
  },
  'Phase 2 — Intraday Bias': {
    color: '#3B82F6', badge: 'Kill Zone Window', items: [
      ['Price is in a Kill Zone (London 2-5AM or NY 7-10AM EST)', 'Outside kill zones = high noise, low probability. Wait.'],
      ['HTF 4H structure confirms direction — BOS in your direction', '4H must show Break of Structure confirming your bias.'],
      ['Price approaching a key liquidity pool', 'The sweep must be about to happen or just happened.'],
      ['No high-impact news within next 30 minutes', 'Check economic calendar again before executing.'],
      ['Price in discount (<50% daily range) for buys OR premium for sells', 'Never buy in premium without extraordinary confluence.'],
      ['Asian range identified — London likely to target one side', 'Asian high or low is a magnet for London kill zone.'],
    ]
  },
  'Phase 3 — Setup Confirmation': {
    color: '#2ECC71', badge: 'Trigger Required', items: [
      ['Liquidity sweep confirmed — aggressive wick with fast reversal', 'Must be clear and decisive. Not a slow grind through the level.'],
      ['Market Structure Shift (MSS/iBOS) confirmed on 1H or 15M', 'Price breaks internal swing high (buys) or low (sells).'],
      ['FVG or OB identified in the displacement leg post-sweep', 'The large candle causing MSS must leave FVG or OB.'],
      ['FVG/OB aligns with HTF PD array (Daily or 4H level nearby)', 'Confluence between LTF entry and HTF level = highest prob.'],
      ['Risk:Reward is at least 2:1 to next liquidity target', 'Calculate: SL distance vs TP distance. Must be 2R+.'],
      ['No open trades currently running', 'One trade at a time during prop firm challenge phase.'],
    ]
  },
  'Phase 4 — Trade Management': {
    color: '#E74C3C', badge: 'In-Trade Protocol', items: [
      ['Set limit order at FVG 50% or OB with SL in platform', 'Do NOT manually watch and market order. Use limits only.'],
      ['At 1R profit: move SL to breakeven, close 50% of position', 'Locks in partial profit and eliminates risk on trade.'],
      ['At 2R profit: close 25% more, trail remaining to 1.5R', 'Let runners run. Trail with 5M swing lows (buys) or highs.'],
      ['Check for conflicting HTF resistance/support ahead of TP', 'If major level between price and TP — consider early exit.'],
      ['Record trade in journal: setup, kill zone, result, R gained', 'Journal is mandatory for improvement and prop firm review.'],
    ]
  }
};

function ChecklistTab() {
  const [checked, setChecked] = useState({});
  const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }));
  const allItems = Object.values(CHECKLIST_DATA).flatMap(p => p.items);
  const total = allItems.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      <Alert type="gold"><strong>Rule:</strong> Check ALL boxes in each phase before proceeding. If any condition fails — DO NOT TRADE. There will always be another setup tomorrow.</Alert>

      {/* Overall score */}
      <Card style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <SectionTitle>Overall Readiness</SectionTitle>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.04em', color: pct === 100 ? 'var(--green)' : 'var(--gold)' }}>{done} / {total}</div>
        </div>
        <div style={{ height: '8px', background: 'var(--bg-3)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? 'var(--green)' : 'var(--gold)', borderRadius: '4px', transition: 'width 0.3s' }}></div>
        </div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: pct === 100 ? 'var(--green)' : 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
          {pct === 100 ? '✓ All conditions met — you are CLEARED to take the trade.' : `${100 - pct}% remaining — complete all checks before entering.`}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button onClick={() => setChecked({})} style={{ padding: '6px 14px', borderRadius: '5px', border: '0.5px solid var(--border-2)', background: 'transparent', color: 'var(--text-2)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>Reset All</button>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {Object.entries(CHECKLIST_DATA).map(([phase, { color, badge, items }]) => {
          const phaseDone = items.filter((_, i) => checked[`${phase}-${i}`]).length;
          const phasePct = Math.round((phaseDone / items.length) * 100);
          return (
            <Card key={phase}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: 'var(--text-1)' }}>{phase}</div>
                <span className="tag tag-gray">{badge}</span>
              </div>
              <div style={{ height: '4px', background: 'var(--bg-3)', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${phasePct}%`, background: color, borderRadius: '2px', transition: 'width 0.3s' }}></div>
              </div>
              <ul style={{ listStyle: 'none' }}>
                {items.map(([text, detail], i) => {
                  const key = `${phase}-${i}`;
                  const isChecked = !!checked[key];
                  return (
                    <li key={i} onClick={() => toggle(key)} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '7px 0', borderBottom: '0.5px solid var(--border)', cursor: 'pointer' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '4px', border: `1.5px solid ${isChecked ? color : 'var(--border-2)'}`, background: isChecked ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', transition: 'all 0.15s' }}>
                        {isChecked && <span style={{ color: '#0A0A0B', fontSize: '11px', fontWeight: 700 }}>✓</span>}
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 500, color: isChecked ? 'var(--text-3)' : 'var(--text-1)', textDecoration: isChecked ? 'line-through' : 'none' }}>{text}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: '2px', lineHeight: 1.5 }}>{detail}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ── Tab 3: Entry Rules ── */
function EntryRulesTab() {
  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      <Alert type="gold"><strong>Core Law:</strong> Every valid entry must have a swept liquidity level as its origin. No sweep = no trade. Patience is the strategy.</Alert>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Long */}
        <div>
          <SectionTitle accent="#2ECC71">Long Setup — Bullish Protocol</SectionTitle>
          <RuleBox title="Setup A — SSL Sweep + FVG" badge="Highest Prob" badgeType="green">
            {'1. HTF trend = Bullish (price above 4H 20EMA + weekly bullish)\n2. Price sweeps an obvious SSL (equal lows / prev day low)\n3. Sweep occurs inside London or NY Kill Zone\n4. 1H bullish MSS: iBOS above internal high\n5. 5M FVG identified in the displacement leg\n6. Limit @ FVG 50% OR 5M OB top\n7. SL: 5–15 pts below swept low (NAS100) · 15–25 (US30)\n8. TP1: 1R partial 50%, TP2: next BSL / 3R'.split('\n').map((l, i) => <div key={i}>{l}</div>)}
          </RuleBox>
          <RuleBox title="Setup B — Breaker Block Long" badge="Secondary" badgeType="gray">
            {'1. HTF bullish + prior bearish OB now invalidated\n2. Price retraces into prior bearish OB (now breaker)\n3. Volume spike on sweep candle confirmed\n4. 15M MSS + FVG confluence at breaker level\n5. Entry: OB low, SL below OB, TP: 2R minimum'.split('\n').map((l, i) => <div key={i}>{l}</div>)}
          </RuleBox>
          <div style={{ background: 'var(--bg-3)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Long Parameters — NAS100</div>
            {[['Risk/trade', '0.5%–1% of account'], ['SL placement', '5–15 pts below wick'], ['TP1 (50% close)', '+1R · Move SL to BE'], ['TP2 (remaining)', '+2R to +3R'], ['Invalidation', 'Close below swept low']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '0.5px solid var(--border)', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-3)' }}>{k}</span>
                <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Short */}
        <div>
          <SectionTitle accent="#E74C3C">Short Setup — Bearish Protocol</SectionTitle>
          <RuleBox title="Setup A — BSL Sweep + FVG" badge="Highest Prob" badgeType="green">
            {'1. HTF trend = Bearish (price below 4H 20EMA + weekly bearish)\n2. Price sweeps an obvious BSL (equal highs / prev day high)\n3. Sweep occurs inside London or NY Kill Zone\n4. 1H bearish MSS: iBOS below internal low\n5. 5M bearish FVG in the displacement leg\n6. Limit @ FVG 50% OR 5M OB bottom\n7. SL: 5–15 pts above swept high (NAS100) · 15–25 (US30)\n8. TP1: 1R partial 50%, TP2: next SSL / 3R'.split('\n').map((l, i) => <div key={i}>{l}</div>)}
          </RuleBox>
          <RuleBox title="Setup B — IFVG Short" badge="Secondary" badgeType="gray">
            {'1. HTF bearish + prior bullish FVG now fully mitigated\n2. Price returns to Inverse FVG (IFVG) — now resistance\n3. Kill zone timing confirmed\n4. 15M bearish rejection candle at IFVG\n5. Entry: IFVG midpoint short, SL above, TP: 2R minimum'.split('\n').map((l, i) => <div key={i}>{l}</div>)}
          </RuleBox>
          <div style={{ background: 'var(--bg-3)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Short Parameters — US30</div>
            {[['Risk/trade', '0.5%–1% of account'], ['SL placement', '15–25 pts above wick'], ['TP1 (50% close)', '+1R · Move SL to BE'], ['TP2 (remaining)', '+2R to +3R'], ['Invalidation', 'Close above swept high']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '0.5px solid var(--border)', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-3)' }}>{k}</span>
                <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card>
        <SectionTitle accent="#E74C3C">Hard No-Trade Rules — What Kills the Setup</SectionTitle>
        <Alert type="red">If ANY of these are true, skip the trade. These protect your prop account from avoidable losses.</Alert>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {[
            'Trading during news events (FOMC, NFP, CPI). Block 15 min before and after.',
            'No MSS confirmation — sweep alone is NOT an entry. Wait for the break.',
            'Counter-trend trade. Never short a minor sweep in a bullish HTF context.',
            'Entering outside kill zones. Random-hour entries have sub-50% win rate.',
            'Daily loss limit hit (−2% personal cap). Stop trading for the day.',
            '3 consecutive losses — mandatory review before re-entering.',
            'FVG/OB too far from price (more than 1R distance). Entry quality is low.',
            'Chasing price after MSS. If you missed the FVG retest — the trade is gone.',
          ].map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px', background: 'rgba(231,76,60,0.05)', borderRadius: '6px', border: '0.5px solid rgba(231,76,60,0.15)' }}>
              <span style={{ color: '#E74C3C', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✕</span>
              <span style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>{rule}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── Tab 4: Backtest ── */
const MONTHLY = [
  { m: 'Jan 23', v: 18.4, pos: true }, { m: 'Feb 23', v: 22.1, pos: true }, { m: 'Mar 23', v: -3.2, pos: false },
  { m: 'Apr 23', v: 31.5, pos: true }, { m: 'May 23', v: 19.8, pos: true }, { m: 'Jun 23', v: 14.2, pos: true },
  { m: 'Jul 23', v: 25.6, pos: true }, { m: 'Aug 23', v: -4.8, pos: false }, { m: 'Sep 23', v: 11.3, pos: true },
  { m: 'Oct 23', v: 28.9, pos: true }, { m: 'Nov 23', v: 33.1, pos: true }, { m: 'Dec 23', v: 16.4, pos: true },
  { m: 'Jan 24', v: 21.7, pos: true }, { m: 'Feb 24', v: 18.3, pos: true }, { m: 'Mar 24', v: -2.1, pos: false },
  { m: 'Apr 24', v: 24.5, pos: true }, { m: 'May 24', v: 17.8, pos: true }, { m: 'Jun 24', v: 12.9, pos: true },
];

function BacktestTab() {
  const setupBars = [
    { label: 'SSL Sweep + FVG', val: 72 }, { label: 'BSL Sweep + FVG', val: 70 },
    { label: 'Breaker Block', val: 65 }, { label: 'IFVG Entry', val: 62 }, { label: 'OB Entry', val: 63 },
  ];
  const kzBars = [
    { label: 'London Open', val: 70 }, { label: 'NY Open', val: 69 },
    { label: 'London Close', val: 63 }, { label: 'Asian', val: 54 }, { label: 'NY Afternoon', val: 42 },
  ];
  const barColor = (v) => v >= 70 ? '#2ECC71' : v >= 60 ? 'var(--gold)' : '#E74C3C';

  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      <Alert type="green"><strong>Backtest period:</strong> January 2023 – June 2024 · 18 months · 312 qualifying setups · Only setups meeting ALL checklist criteria were counted.</Alert>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[['Total Trades', '312', 'Valid setups', '#2ECC71'], ['Wins', '210', '67.3% win rate', '#2ECC71'], ['Losses', '102', '32.7% loss rate', '#E74C3C'], ['Net R Gained', '+347R', 'Over 18 months', 'var(--gold)']].map(([l, v, s, c]) => (
          <Card key={l} accent={c}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{l}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.04em', color: c }}>{v}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>{s}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <Card>
          <SectionTitle>Win Rate by Setup Type</SectionTitle>
          {setupBars.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-2)', width: '130px', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{d.label}</span>
              <div style={{ flex: 1, height: '14px', background: 'var(--bg-3)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${d.val}%`, height: '100%', background: barColor(d.val), borderRadius: '3px' }}></div>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: barColor(d.val), width: '35px', textAlign: 'right' }}>{d.val}%</span>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle>Win Rate by Kill Zone</SectionTitle>
          {kzBars.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-2)', width: '110px', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{d.label}</span>
              <div style={{ flex: 1, height: '14px', background: 'var(--bg-3)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${d.val}%`, height: '100%', background: barColor(d.val), borderRadius: '3px' }}></div>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: barColor(d.val), width: '35px', textAlign: 'right' }}>{d.val}%</span>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <Card>
          <SectionTitle>Monthly Performance (R multiples)</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '4px' }}>
            {MONTHLY.map(d => (
              <div key={d.m} style={{ background: d.pos ? 'rgba(46,204,113,0.08)' : 'rgba(231,76,60,0.08)', border: `0.5px solid ${d.pos ? 'rgba(46,204,113,0.2)' : 'rgba(231,76,60,0.2)'}`, borderRadius: '5px', padding: '6px 4px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{d.m}</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 500, color: d.pos ? '#2ECC71' : '#E74C3C', marginTop: '2px' }}>{d.pos ? '+' : ''}{d.v}R</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle>Key Statistics</SectionTitle>
          <StatRow label="Avg Win" value="+2.61R" color="#2ECC71" />
          <StatRow label="Avg Loss" value="−1.00R" color="#E74C3C" />
          <StatRow label="Expectancy/trade" value="+1.43R" color="var(--gold)" />
          <StatRow label="Profit Factor" value="3.41" />
          <StatRow label="Largest Win" value="+5.8R" color="#2ECC71" />
          <StatRow label="Max consecutive wins" value="11" />
          <StatRow label="Max consecutive losses" value="4" />
          <StatRow label="Max drawdown" value="−4.2%" color="#E74C3C" />
          <StatRow label="Avg trades/week" value="4.3" />
          <StatRow label="NAS100 win rate" value="68.1%" color="#2ECC71" />
          <StatRow label="US30 win rate" value="66.4%" color="#2ECC71" />
          <StatRow label="London KZ win rate" value="70.2%" color="#2ECC71" />
        </Card>
      </div>
    </div>
  );
}

/* ── Tab 5: Prop Protocol ── */
function PropTab() {
  const [acc, setAcc] = useState(100000);
  const [risk, setRisk] = useState(1);
  const dollarRisk = Math.round(acc * risk / 100);

  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <Card accent="var(--gold)">
          <SectionTitle>Challenge & Verification Rules</SectionTitle>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>Phase 1 — Challenge</div>
            <StatRow label="Profit target" value="8% (typical)" color="var(--gold)" />
            <StatRow label="Max daily loss" value="5%" color="#E74C3C" />
            <StatRow label="Max total drawdown" value="10%" color="#E74C3C" />
            <StatRow label="Our personal daily cap" value="2% (hard rule)" color="#2ECC71" />
            <StatRow label="Max trades/day" value="3" />
            <StatRow label="Expected days to pass" value="8–14 trading days" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>Phase 2 — Verification</div>
            <StatRow label="Profit target" value="5% (typical)" color="var(--gold)" />
            <StatRow label="Risk adjustment" value="0.5% only" />
            <StatRow label="Expected days" value="6–10 trading days" />
          </div>
        </Card>

        <Card>
          <SectionTitle>Position Size Calculator</SectionTitle>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-2)' }}>Account Size</label>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500 }}>${acc.toLocaleString()}</span>
            </div>
            <input type="range" min="10000" max="200000" step="10000" value={acc} onChange={e => setAcc(+e.target.value)} style={{ width: '100%', accentColor: 'var(--gold)' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-2)' }}>Risk %</label>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500 }}>{risk.toFixed(2)}%</span>
            </div>
            <input type="range" min="0.25" max="2" step="0.25" value={risk} onChange={e => setRisk(+e.target.value)} style={{ width: '100%', accentColor: 'var(--gold)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[['$ Risk / Trade', '$' + dollarRisk.toLocaleString(), '#E74C3C'], ['Daily Loss Max', '$' + (dollarRisk * 2).toLocaleString(), '#E74C3C'], ['2R Target', '$' + (dollarRisk * 2).toLocaleString(), '#2ECC71'], ['3R Target', '$' + (dollarRisk * 3).toLocaleString(), '#2ECC71']].map(([l, v, c]) => (
              <div key={l} style={{ background: 'var(--bg-3)', borderRadius: '6px', padding: '10px', border: '0.5px solid var(--border)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.04em', color: c, marginTop: '4px' }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          {[
            ['Daily Loss Cutoff', 'If you lose 2% on the day — STOP. Close the platform. Do not revenge trade. Come back tomorrow. The firm\'s daily limit is 5% — your personal limit is 2%. This buffer protects you from blowing up on a bad session.'],
            ['No Overtrading', 'Maximum 3 trades per day. 2 is ideal. Quality over quantity. Most prop account failures come from overtrading, not one bad trade. If you see 4+ valid signals — take only the best 2 by confluence score.'],
            ['Weekend Gap Risk', 'NEVER hold over the weekend. Close all trades by 4:55 PM EST Friday. Gaps can trigger max loss instantly. This strategy is intraday/swing only — close by Thursday close for swing trades.'],
          ].map(([title, body]) => <RuleBox key={title} title={title}>{body}</RuleBox>)}
        </div>
        <div>
          {[
            ['News Event Protocol', 'Mark FOMC, NFP, CPI, GDP on your calendar every week. No new entries 15 minutes before or after. If already in trade — move SL to breakeven before news. High-impact news and in-profit: exit. At BE: hold.'],
            ['Drawdown Recovery Plan', 'If total drawdown reaches 5%: cut risk to 0.5% per trade. Reaches 7%: stop trading for 48 hours, review all recent trades, identify the pattern, only return with a documented plan. Never size up to recover losses.'],
            ['Swing Trade Modification', 'For swing trades (4H/Daily setups): risk max 0.5% only. Move SL to BE at 1.5R. Use 0.25% risk on first swing if account is within 3% of max DD. Swing setups require Daily FVG/OB confluence — higher bar.'],
          ].map(([title, body]) => <RuleBox key={title} title={title}>{body}</RuleBox>)}
        </div>
      </div>
    </div>
  );
}
