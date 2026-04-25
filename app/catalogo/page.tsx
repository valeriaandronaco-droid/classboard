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
    setMaterie(Array.from(new Set(rs.map((r: Risorsa) => r.materia).filter(Boolean))) as string[])
    setLoading(false)
  }

  const risorseFiltrate = risorse.filter(r => {
    const okTipo = filtroTipo === 'tutti' || r.tipo === filtroTipo
    const okMateria = filtroMateria === 'tutte' || r.materia === filtroMateria
    return okTipo && okMateria
  })

  const tipoColori: Record<string, { bg: string; color: string }> = {
    progetto: { bg: '#E8F5EF', color: '#2E7D5E' },
    tutorial:  { bg: '#EFF6FF', color: '#1D4ED8' },
    ebook:     { bg: '#FEF3C7', color: '#D97706' },
  }

  const tipoIcone: Record<string, string> = {
    progetto: '▦',
    tutorial: '▷',
    ebook: '◫',
  }

  const filterBtn = (active: boolean) => ({
    fontSize: '12px', padding: '5px 14px', borderRadius: '20px',
    cursor: 'pointer', border: active ? 'none' : '1px solid rgba(0,0,0,0.1)',
    background: active ? '#2E7D5E' : 'white',
    color: active ? 'white' : '#888',
    fontWeight: active ? 500 : 400,
  })

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#2C2C2C', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '56px', borderBottom: '1px solid rgba(0,0,0,0.1)', background: '#ffffff', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#2E7D5E' }}>
          <div style={{ width: '8px', height: '8px', background: '#2E7D5E', borderRadius: '50% 0 50% 0', transform: 'rotate(45deg)' }} />
          <a href="/" style={{ color: '#2E7D5E', textDecoration: 'none' }}>classboard</a>
        </div>
        <div style={{ display: 'flex', gap: '1.75rem', fontSize: '13px', color: '#888' }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none' }}>home</a>
          <span style={{ color: '#2E7D5E', fontWeight: 500 }}>catalogo</span>
        </div>
        <a href="/admin" style={{ fontSize: '13px', fontWeight: 500, padding: '7px 18px', borderRadius: '6px', background: '#2E7D5E', color: 'white', textDecoration: 'none' }}>admin</a>
      </nav>

      {/* HEADER */}
      <section style={{ padding: '3rem 2rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#ffffff' }}>
        <div style={{ fontSize: '12px', color: '#2E7D5E', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>catalogo</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 700, color: '#2C2C2C', marginBottom: '0.5rem' }}>Tutte le risorse</h1>
        <p style={{ fontSize: '14px', color: '#888' }}>Progetti, tutorial ed ebook condivisi dai docenti.</p>
      </section>

      {/* FILTRI */}
      <section style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#ffffff', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#888', marginRight: '4px' }}>Tipo:</span>
          {['tutti', 'progetto', 'tutorial', 'ebook'].map(t => (
            <button key={t} style={filterBtn(filtroTipo === t)} onClick={() => setFiltroTipo(t)}>{t}</button>
          ))}
        </div>
        {materie.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#888', marginRight: '4px' }}>Materia:</span>
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
          <div style={{ color: '#888', fontSize: '13px' }}>Caricamento...</div>
        ) : risorseFiltrate.length === 0 ? (
          <div style={{ color: '#888', fontSize: '13px' }}>Nessuna risorsa trovata.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {risorseFiltrate.map(r => {
              const colori = tipoColori[r.tipo] || { bg: '#E8F5EF', color: '#2E7D5E' }
              const icona = tipoIcone[r.tipo] || '▦'
              return (
                <div key={r.id} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: colori.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: colori.color }}>{icona}</div>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: colori.bg, color: colori.color, fontWeight: 500 }}>{r.tipo}</span>
                    </div>
                    {r.gratuita
                      ? <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#E8F5EF', color: '#2E7D5E', fontWeight: 500 }}>gratuita</span>
                      : <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#FEF3C7', color: '#D97706', fontWeight: 500 }}>€{r.prezzo}</span>
                    }
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: '#2C2C2C', marginBottom: '6px' }}>{r.titolo}</div>
                    <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{r.descrizione}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#888' }}>{r.materia} · {r.autore}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    {r.file_url && (
                      <a href={r.file_url} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '8px', fontSize: '13px', textAlign: 'center', background: '#2E7D5E', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: 500 }}>
                        Scarica
                      </a>
                    )}
                    {r.link_esterno && r.link_esterno !== 'https://' && (
                      <a href={r.link_esterno} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '8px', fontSize: '13px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.1)', color: '#2C2C2C', borderRadius: '6px', textDecoration: 'none' }}>
                        Apri link →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', marginTop: '2rem' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: '#2E7D5E' }}>classboard</span>
        <span style={{ fontSize: '12px', color: '#888' }}>© 2026 — fatto da docenti, per docenti</span>
      </footer>

    </div>
  )
}