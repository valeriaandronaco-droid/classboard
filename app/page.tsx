export default function Home() {
  return (
    <main style={{ background: '#0d0f14', minHeight: '100vh', color: '#e2e8f0', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      
      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '56px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', background: '#0d0f14', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'monospace', fontSize: '15px', fontWeight: 500, color: '#a78bfa' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a78bfa' }} />
          classboard
        </div>
<div style={{ display: 'flex', gap: '1.5rem', fontSize: '13px', color: 'rgba(226,232,240,0.55)' }}>
  <span style={{ color: '#a78bfa' }}>home</span>
  <a href="/catalogo" style={{ color: 'rgba(226,232,240,0.55)', textDecoration: 'none' }}>progetti</a>
  <a href="/catalogo" style={{ color: 'rgba(226,232,240,0.55)', textDecoration: 'none' }}>tutorial</a>
  <a href="/catalogo" style={{ color: 'rgba(226,232,240,0.55)', textDecoration: 'none' }}>ebook</a>
  <span style={{ color: 'rgba(226,232,240,0.55)' }}>community</span>
  <span style={{ color: 'rgba(226,232,240,0.55)' }}>studenti</span>
</div>
<a href="/admin" style={{ fontSize: '12px', fontWeight: 500, padding: '6px 14px', border: '0.5px solid rgba(167,139,250,0.5)', borderRadius: '6px', color: '#a78bfa', background: 'rgba(167,139,250,0.06)', cursor: 'pointer', textDecoration: 'none' }}>
  admin
</a>
      </nav>

      {/* HERO */}
      <section style={{ padding: '5rem 2rem 4rem', borderBottom: '0.5px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(167,139,250,0.8)', border: '0.5px solid rgba(167,139,250,0.25)', borderRadius: '20px', padding: '4px 12px', marginBottom: '1.5rem', background: 'rgba(167,139,250,0.05)', position: 'relative' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#a78bfa' }} />
          per docenti, da docenti
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: 500, lineHeight: 1.1, color: '#f1f5f9', maxWidth: '640px', marginBottom: '1.25rem', position: 'relative' }}>
          La cattedra <span style={{ color: '#a78bfa' }}>digitale</span> che mancava.
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(226,232,240,0.55)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2rem', position: 'relative' }}>
          Progetti didattici, tutorial, ebook e una community di docenti che si confrontano ogni giorno. Tutto open, tutto condivisibile.
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', position: 'relative' }}>
          <button style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 500, background: '#a78bfa', color: '#0d0f14', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Sfoglia i progetti
          </button>
          <button style={{ padding: '10px 22px', fontSize: '13px', fontWeight: 500, background: 'transparent', color: 'rgba(226,232,240,0.6)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '8px', cursor: 'pointer' }}>
            Iscriviti gratis →
          </button>
        </div>
      </section>

      {/* SEZIONI */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(167,139,250,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>// cosa trovi qui</div>
        <h2 style={{ fontSize: '22px', fontWeight: 500, color: '#f1f5f9', marginBottom: '0.5rem' }}>Esplora le sezioni</h2>
        <p style={{ fontSize: '14px', color: 'rgba(226,232,240,0.4)', marginBottom: '2.5rem' }}>Materiali pronti da usare, adattare e — perché no — migliorare insieme.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
          {[
            { icon: '▦', name: 'Progetti', desc: 'Unità didattiche complete, percorsi STEAM, UDA, attività interdisciplinari.', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
            { icon: '▷', name: 'Tutorial', desc: 'Guide passo-passo su strumenti digitali, app, robotica, coding e molto altro.', color: '#2dd4bf', bg: 'rgba(45,212,191,0.1)' },
            { icon: '◫', name: 'Ebook', desc: 'Pubblicazioni scaricabili su metodologie, didattica digitale e innovazione.', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
            { icon: '◎', name: 'Community', desc: 'Forum, discussioni, gruppi per materia e area geografica. Condividi e confrontati.', color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
            { icon: '◈', name: 'Studenti', desc: 'Area dedicata: materiali di studio, appunti e risorse condivise dai docenti.', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
          ].map((s) => (
            <div key={s.name} style={{ background: '#111318', padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: s.color }}>{s.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#e2e8f0' }}>{s.name}</div>
              <div style={{ fontSize: '12px', color: 'rgba(226,232,240,0.4)', lineHeight: 1.5 }}>{s.desc}</div>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(226,232,240,0.25)', marginTop: 'auto' }}>— risorse</div>
            </div>
          ))}
        </div>
      </section>

      {/* AREA STUDENTI */}
      <section style={{ padding: '0 2rem 4rem' }}>
        <div style={{ fontSize: '15px', fontWeight: 500, color: '#f1f5f9', marginBottom: '1.25rem' }}>Area Studenti</div>
        <div style={{ background: '#111318', border: '0.5px solid rgba(96,165,250,0.15)', borderRadius: '12px', padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(96,165,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#60a5fa', flexShrink: 0 }}>◈</div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#f1f5f9', marginBottom: '6px' }}>Un posto tutto tuo, per studiare meglio.</h3>
            <p style={{ fontSize: '13px', color: 'rgba(226,232,240,0.4)', lineHeight: 1.6 }}>I tuoi prof condividono qui materiali, appunti e risorse selezionate.</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {['appunti', 'schede', 'esercizi', 'mappe concettuali', 'video'].map(t => (
                <span key={t} style={{ fontSize: '11px', fontFamily: 'monospace', padding: '4px 10px', borderRadius: '4px', border: '0.5px solid rgba(96,165,250,0.2)', color: 'rgba(96,165,250,0.7)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section style={{ margin: '0 2rem 4rem', border: '0.5px solid rgba(167,139,250,0.15)', borderRadius: '12px', padding: '2.5rem', background: 'rgba(167,139,250,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#f1f5f9', marginBottom: '0.5rem' }}>Insegnare è più bello insieme.</h2>
          <p style={{ fontSize: '13px', color: 'rgba(226,232,240,0.45)', lineHeight: 1.6, maxWidth: '360px' }}>Uno spazio per scambiarsi idee, condividere esperienze e trovare ispirazione. Perché i migliori materiali nascono dal confronto tra colleghi.</p>
        </div>
        <button style={{ flexShrink: 0, padding: '12px 28px', fontSize: '14px', fontWeight: 500, background: '#a78bfa', color: '#0d0f14', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Entra nella community
        </button>
      </section>

      {/* FOUNDERS */}
      <section style={{ padding: '0 2rem 4rem' }}>
        <div style={{ border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(167,139,250,0.4)' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(226,232,240,0.25)' }}>// chi c'è dietro classboard</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              { initial: 'V', name: 'Valeria', role: 'co-fondatrice · docente & dev', tags: ['informatica', 'web dev'], color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', tagBg: 'rgba(167,139,250,0.08)', tagColor: 'rgba(167,139,250,0.7)' },
              { initial: 'M', name: 'Michele', role: 'co-fondatore · docente', tags: ['didattica digitale', 'innovazione'], color: '#2dd4bf', bg: 'rgba(45,212,191,0.1)', tagBg: 'rgba(45,212,191,0.08)', tagColor: 'rgba(45,212,191,0.7)' },
            ].map((f, i) => (
              <div key={f.name} style={{ padding: '1.5rem', background: '#0f1117', display: 'flex', flexDirection: 'column', gap: '12px', borderRight: i === 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '13px', fontWeight: 500, color: f.color, flexShrink: 0 }}>{f.initial}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#e2e8f0' }}>{f.name}</div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(226,232,240,0.3)', marginTop: '2px' }}>{f.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {f.tags.map(t => (
                    <span key={t} style={{ fontSize: '10px', fontFamily: 'monospace', padding: '3px 8px', borderRadius: '4px', background: f.tagBg, color: f.tagColor }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '13px', color: 'rgba(167,139,250,0.5)' }}>classboard</span>
        <span style={{ fontSize: '11px', color: 'rgba(226,232,240,0.2)' }}>© 2025 — fatto da docenti, per docenti</span>
      </footer>

    </main>
  );
}