'use client'
export default function Home() {
  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh', color: '#2C2C2C', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '56px', borderBottom: '1px solid rgba(0,0,0,0.1)', background: '#ffffff', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#2E7D5E' }}>
          <div style={{ width: '8px', height: '8px', background: '#2E7D5E', borderRadius: '50% 0 50% 0', transform: 'rotate(45deg)' }} />
          classboard
        </div>
<div style={{ display: 'flex', gap: '1.75rem', fontSize: '13px', color: '#888' }}>
  <span style={{ color: '#2E7D5E', fontWeight: 500 }}>home</span>
  <a href="/catalogo" style={{ color: '#888', textDecoration: 'none' }}>catalogo</a>
  <span style={{ color: '#888' }}>community</span>
  <span style={{ color: '#888' }}>studenti</span>
</div>
        <a href="/admin" style={{ fontSize: '13px', fontWeight: 500, padding: '7px 18px', borderRadius: '6px', background: '#2E7D5E', color: 'white', textDecoration: 'none' }}>admin</a>
      </nav>

      {/* HERO */}
      <section style={{ padding: '5rem 2rem 4rem', borderBottom: '1px solid rgba(0,0,0,0.1)', background: '#ffffff', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#2E7D5E', fontWeight: 500, marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2E7D5E' }} />
            per docenti, da docenti
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '48px', fontWeight: 700, lineHeight: 1.1, color: '#2C2C2C', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            La cattedra <em style={{ fontStyle: 'italic', color: '#2E7D5E' }}>digitale</em> che mancava.
          </h1>
          <p style={{ fontSize: '16px', color: '#888', maxWidth: '480px', lineHeight: 1.75, marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
            Progetti didattici, tutorial, ebook e una community di docenti che si confrontano ogni giorno. Tutto open, tutto condivisibile.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href="/catalogo" style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 500, background: '#2E7D5E', color: 'white', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
              Sfoglia i progetti
            </a>
            <a href="#" style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 500, background: 'transparent', color: '#2C2C2C', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
              Iscriviti gratis →
            </a>
          </div>
        </div>
        <div style={{ background: '#F4F2EE', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>// cosa trovi</div>
          {[
            { icon: '▦', label: 'Progetti didattici', sub: 'UDA, STEAM, interdisciplinari', bg: '#E8F5EF' },
            { icon: '▷', label: 'Tutorial', sub: 'Strumenti digitali, app, coding', bg: '#EFF6FF' },
            { icon: '◫', label: 'Ebook', sub: 'Metodologie, didattica digitale', bg: '#FEF3C7' },
            { icon: '◎', label: 'Community', sub: 'Forum, gruppi per materia', bg: '#FDF2F8' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: '13px', color: '#2C2C2C', fontWeight: 500 }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '1px' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEZIONI */}
      <section style={{ padding: '4rem 2rem', background: '#FAFAF8' }}>
        <div style={{ fontSize: '12px', color: '#2E7D5E', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>esplora</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 700, color: '#2C2C2C', marginBottom: '0.5rem' }}>Le sezioni di classboard</h2>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '2.5rem', lineHeight: 1.6 }}>Materiali pronti da usare, adattare e migliorare insieme.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {[
            { icon: '▦', name: 'Progetti', desc: 'Unità didattiche complete, UDA, percorsi STEAM.', bg: '#E8F5EF', href: '/catalogo' },
            { icon: '▷', name: 'Tutorial', desc: 'Guide su strumenti digitali, app, robotica, coding.', bg: '#EFF6FF', href: '/catalogo' },
            { icon: '◫', name: 'Ebook', desc: 'Pubblicazioni su metodologie e didattica digitale.', bg: '#FEF3C7', href: '/catalogo' },
            { icon: '◎', name: 'Community', desc: 'Forum e gruppi per materia. Confrontati.', bg: '#FDF2F8', href: '#' },
            { icon: '◈', name: 'Studenti', desc: 'Area dedicata con risorse dai docenti.', bg: '#EFF6FF', href: '#' },
          ].map(s => (
            <a key={s.name} href={s.href} style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', textDecoration: 'none', color: 'inherit', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#2C2C2C' }}>{s.name}</div>
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{s.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* AREA STUDENTI */}
      <section style={{ padding: '0 2rem 4rem', background: '#FAFAF8' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#2C2C2C', marginBottom: '1rem' }}>Area Studenti</div>
        <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#E8F5EF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>◈</div>
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#2C2C2C', marginBottom: '6px' }}>Un posto tutto tuo, per studiare meglio.</h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>I tuoi prof condividono qui materiali, appunti e risorse selezionate.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {['appunti', 'schede', 'esercizi', 'mappe concettuali', 'video'].map(t => (
                <span key={t} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '20px', background: '#E8F5EF', color: '#2E7D5E', fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section style={{ margin: '0 2rem 4rem', borderRadius: '16px', padding: '3rem', background: '#2E7D5E', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Insegnare è più bello insieme.</h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', maxWidth: '400px', lineHeight: 1.65 }}>Uno spazio per scambiarsi idee, condividere esperienze e trovare ispirazione. Perché i migliori materiali nascono dal confronto tra colleghi.</p>
        </div>
        <a href="#" style={{ padding: '12px 28px', fontSize: '14px', fontWeight: 500, background: 'white', color: '#2E7D5E', borderRadius: '8px', flexShrink: 0, whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-block' }}>
          Entra nella community →
        </a>
      </section>

      {/* FOUNDERS */}
      <section style={{ padding: '0 2rem 4rem' }}>
        <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>chi c'è dietro classboard</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { initial: 'V', name: 'Valeria', role: 'co-fondatrice · docente & dev', tags: ['informatica', 'web dev'], avatarBg: '#F3EEFF', avatarColor: '#7C3AED', tagBg: '#F3EEFF', tagColor: '#7C3AED' },
            { initial: 'M', name: 'Michele', role: 'co-fondatore · docente', tags: ['didattica digitale', 'innovazione'], avatarBg: '#FEF3C7', avatarColor: '#D97706', tagBg: '#FEF3C7', tagColor: '#D97706' },
          ].map(f => (
            <div key={f.name} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: f.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: f.avatarColor, flexShrink: 0 }}>{f.initial}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#2C2C2C' }}>{f.name}</div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{f.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {f.tags.map(t => (
                  <span key={t} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: f.tagBg, color: f.tagColor, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: '#2E7D5E' }}>classboard</span>
        <span style={{ fontSize: '12px', color: '#888' }}>© 2026 — fatto da docenti, per docenti</span>
      </footer>

    </main>
  );
}