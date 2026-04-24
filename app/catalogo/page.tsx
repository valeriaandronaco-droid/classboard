'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Risorsa = {
  id: number
  titolo: string
  descrizione: string
  tipo: string
  materia: string
  gratuita: boolean
  prezzo: number
  file_url: string
  link_esterno: string
  autore: string
  created_at: string
}

export default function CatalogoPage() {
  const [risorse, setRisorse] = useState<Risorsa[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroTipo, setFiltroTipo] = useState('tutti')
  const [filtroMateria, setFiltroMateria] = useState('tutte')
  const [materie, setMaterie] = useState<string[]>([])

  useEffect(() => {
    fetchRisorse()
  }, [])

  async function fetchRisorse() {
    setLoading(true)
    const { data } = await supabase
      .from('risorse')
      .select('*')
      .eq('pubblicata', true)
      .order('created_at', { ascending: false })
    const rs = data || []
    setRisorse(rs)
    const ms = [...new Set(rs.map((r: Risorsa) => r.materia).filter(Boolean))]
    setMaterie(ms)
    setLoading(false)
  }

  const risorseFiltrate = risorse.filter(r => {
    const okTipo = filtroTipo === 'tutti' || r.tipo === filtroTipo
    const okMateria = filtroMateria === 'tutte' || r.materia === filtroMateria
    return okTipo && okMateria
  })

  const tipoColori: Record<string, { bg: string; color: string }> = {
    progetto: { bg: 'rgba(167,139,250,0.1)', color: '#a78bfa' },
    tutorial:  { bg: 'rgba(45,212,191,0.1)',  color: '#2dd4bf' },
    ebook:     { bg: 'rgba(251,191,36,0.1)',  color: '#fbbf24' },
  }

  const tipoIcone: Record<string, string> = {
    progetto: '▦',
    tutorial: '▷',
    ebook: '◫',
  }

  const filterBtn = (active: boolean) => ({
    fontSize: '12px', fontFamily: 'monospace', padding: '5px 14px',
    borderRadius: '6px', cursor: 'pointer', border: 'none',
    background: active ? '#a78bfa' : 'rgba(255,255,255,0.04)',
    color: active ? '#0d0f14' : 'rgba(226,232,240,0.5)',
    transition: 'all 0.15s',
  })

  return (
    <div style={{ background: '#0d0f14', minHeight: '100vh', color: '#e2e8f0', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '56px', borderBottom: '0.5px solid rgba(255,255,255,0.07)', background: '#0d0f14', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'monospace', fontSize: '15px', fontWeight: 500, color: '#a78bfa' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a78bfa' }} />
          <a href="/" style={{ color: '#a78bfa', textDecoration: 'none' }}>classboard</a>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '13px', color: 'rgba(226,232,240,0.55)' }}>
          <a href="/" style={{ color: 'rgba(226,232,240,0.55)', textDecoration: 'none' }}>home</a>
          <span style={{ color: '#a78bfa' }}>catalogo</span>
        </div>
        <a href="/admin" style={{ fontSize: '12px', fontWeight: 500, padding: '6px 14px', border: '0.5px solid rgba(167,139,250,0.5)', borderRadius: '6px', color: '#a78bfa', background: 'rgba(167,139,250,0.06)', textDecoration: 'none' }}>admin</a>
      </nav>

      {/* HEADER */}
      <section style={{ padding: '3rem 2rem 2rem', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(167,139,250,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// catalogo</div>
        <h1 style={{ fontSize: '28px', fontWeight: 500, color: '#f1f5f9', marginBottom: '0.5rem' }}>Tutte le risorse</h1>
        <p style={{ fontSize: '14px', color: 'rgba(226,232,240,0.45)' }}>Progetti, tutorial ed ebook condivisi dai docenti.</p>
      </section>

      {/* FILTRI */}
      <section style={{ padding: '1.5rem 2rem', borderBottom: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(226,232,240,0.3)', marginRight: '4px' }}>tipo</span>
          {['tutti', 'progetto', 'tutorial', 'ebook'].map(t => (
            <button key={t} style={filterBtn(filtroTipo === t)} onClick={() => setFiltroTipo(t)}>{t}</button>
          ))}
        </div>
        {materie.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(226,232,240,0.3)', marginRight: '4px' }}>materia</span>
            <button style={filterBtn(filtroMateria === 'tutte')} onClick={() => setFiltroMateria('tutte')}>tutte</button>
            {materie.map(m => (
              <button key={m} style={filterBtn(filtroMateria === m)} onClick={() => setFiltroMateria(m)}>{m}</button>
            ))}
          </div>
        )}
      </section>

      {/* GRIGLIA RISORSE */}
      <section style={{ padding: '2rem' }}>
        {loading ? (
          <div style={{ color: 'rgba(226,232,240,0.4)', fontSize: '13px', fontFamily: 'monospace' }}>caricamento...</div>
        ) : risorseFiltrate.length === 0 ? (
          <div style={{ color: 'rgba(226,232,240,0.4)', fontSize: '13px', fontFamily: 'monospace' }}>nessuna risorsa trovata.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {risorseFiltrate.map(r => {
              const colori = tipoColori[r.tipo] || { bg: 'rgba(167,139,250,0.1)', color: '#a78bfa' }
              const icona = tipoIcone[r.tipo] || '▦'
              return (
                <div key={r.id} style={{ background: '#111318', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: colori.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: colori.color }}>{icona}</div>
                      <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: colori.bg, color: colori.color }}>{r.tipo}</span>
                    </div>
                    {r.gratuita
                      ? <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: 'rgba(45,212,191,0.08)', color: '#2dd4bf' }}>gratuita</span>
                      : <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: 'rgba(251,191,36,0.08)', color: '#fbbf24' }}>€{r.prezzo}</span>
                    }
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#e2e8f0', marginBottom: '6px' }}>{r.titolo}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(226,232,240,0.45)', lineHeight: 1.5 }}>{r.descrizione}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(226,232,240,0.3)', fontFamily: 'monospace' }}>{r.materia} · {r.autore}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
                    {r.file_url && (
                      <a href={r.file_url} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '8px', fontSize: '12px', fontFamily: 'monospace', textAlign: 'center', background: '#a78bfa', color: '#0d0f14', borderRadius: '6px', textDecoration: 'none', fontWeight: 500 }}>
                        scarica
                      </a>
                    )}
                    {r.link_esterno && r.link_esterno !== 'https://' && (
                      <a href={r.link_esterno} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '8px', fontSize: '12px', fontFamily: 'monospace', textAlign: 'center', border: '0.5px solid rgba(255,255,255,0.12)', color: 'rgba(226,232,240,0.6)', borderRadius: '6px', textDecoration: 'none' }}>
                        apri link →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

    </div>
  )
}