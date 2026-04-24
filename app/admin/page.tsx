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
  pubblicata: boolean
  autore: string
  file_url: string
  link_esterno: string
  created_at: string
}

type Materia = {
  id: number
  nome: string
}

export default function AdminPage() {
  const [risorse, setRisorse] = useState<Risorsa[]>([])
  const [materie, setMaterie] = useState<Materia[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [nuovaMateria, setNuovaMateria] = useState('')
  const [sezione, setSezione] = useState<'risorse' | 'materie'>('risorse')
  const [form, setForm] = useState({
    titolo: '',
    descrizione: '',
    tipo: 'progetto',
    materia: '',
    gratuita: true,
    prezzo: 0,
    autore: '',
    pubblicata: false,
    file_url: '',
    link_esterno: '',
  })

  useEffect(() => {
    fetchRisorse()
    fetchMaterie()
  }, [])

  async function fetchRisorse() {
    setLoading(true)
    const { data } = await supabase.from('risorse').select('*').order('created_at', { ascending: false })
    setRisorse(data || [])
    setLoading(false)
  }

  async function fetchMaterie() {
    const { data } = await supabase.from('materie').select('*').order('nome')
    setMaterie(data || [])
  }

  async function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage.from('risorse-files').upload(fileName, file)
    if (error) {
      alert('Errore upload: ' + error.message)
    } else {
      const { data: urlData } = supabase.storage.from('risorse-files').getPublicUrl(data.path)
      setForm({ ...form, file_url: urlData.publicUrl })
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from('risorse').insert([form])
    if (!error) {
      setForm({ titolo: '', descrizione: '', tipo: 'progetto', materia: '', gratuita: true, prezzo: 0, autore: '', pubblicata: false, file_url: '', link_esterno: '' })
      fetchRisorse()
    } else {
      alert('Errore: ' + error.message)
    }
  }

  async function handleAggiungiMateria(e: React.FormEvent) {
    e.preventDefault()
    if (!nuovaMateria.trim()) return
    const { error } = await supabase.from('materie').insert([{ nome: nuovaMateria.trim() }])
    if (!error) {
      setNuovaMateria('')
      fetchMaterie()
    } else {
      alert('Errore: ' + error.message)
    }
  }

  async function handleEliminaMateria(id: number) {
    if (confirm('Eliminare questa materia?')) {
      await supabase.from('materie').delete().eq('id', id)
      fetchMaterie()
    }
  }

  async function togglePubblicata(id: number, attuale: boolean) {
    await supabase.from('risorse').update({ pubblicata: !attuale }).eq('id', id)
    fetchRisorse()
  }

  async function eliminaRisorsa(id: number) {
    if (confirm('Sei sicura di voler eliminare questa risorsa?')) {
      await supabase.from('risorse').delete().eq('id', id)
      fetchRisorse()
    }
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', background: '#1a1d26',
    border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    color: '#e2e8f0', fontSize: '13px', outline: 'none',
  }

  const labelStyle = {
    fontSize: '11px', fontFamily: 'monospace',
    color: 'rgba(167,139,250,0.7)', marginBottom: '4px', display: 'block'
  }

  const tabStyle = (active: boolean) => ({
    fontSize: '12px', fontFamily: 'monospace', padding: '6px 16px',
    borderRadius: '6px', cursor: 'pointer', border: 'none',
    background: active ? '#a78bfa' : 'transparent',
    color: active ? '#0d0f14' : 'rgba(226,232,240,0.4)',
  })

  return (
    <div style={{ background: '#0d0f14', minHeight: '100vh', color: '#e2e8f0', fontFamily: "'Segoe UI', system-ui, sans-serif", padding: '2rem' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a78bfa' }} />
          <a href="/" style={{ fontFamily: 'monospace', fontSize: '15px', color: '#a78bfa', fontWeight: 500, textDecoration: 'none' }}>classboard</a>
<span style={{ fontFamily: 'monospace', fontSize: '15px', color: 'rgba(167,139,250,0.4)', fontWeight: 500 }}> / admin</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={tabStyle(sezione === 'risorse')} onClick={() => setSezione('risorse')}>risorse</button>
          <button style={tabStyle(sezione === 'materie')} onClick={() => setSezione('materie')}>materie</button>
        </div>
      </div>

      {/* SEZIONE RISORSE */}
      {sezione === 'risorse' && (
        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* FORM */}
          <div style={{ background: '#111318', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(167,139,250,0.6)', marginBottom: '1.25rem' }}>// nuova risorsa</div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              <div>
                <label style={labelStyle}>titolo</label>
                <input style={inputStyle} value={form.titolo} onChange={e => setForm({ ...form, titolo: e.target.value })} required />
              </div>

              <div>
                <label style={labelStyle}>descrizione</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.descrizione} onChange={e => setForm({ ...form, descrizione: e.target.value })} required />
              </div>

              <div>
                <label style={labelStyle}>tipo</label>
                <select style={inputStyle} value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                  <option value="progetto">Progetto</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="ebook">Ebook</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>materia</label>
                <select style={inputStyle} value={form.materia} onChange={e => setForm({ ...form, materia: e.target.value })} required>
                  <option value="">— seleziona materia —</option>
                  {materie.map(m => (
                    <option key={m.id} value={m.nome}>{m.nome}</option>
                  ))}
                </select>
                {materie.length === 0 && (
                  <div style={{ fontSize: '11px', color: 'rgba(251,191,36,0.7)', marginTop: '4px', fontFamily: 'monospace' }}>
                    ⚠ nessuna materia — aggiungile dalla tab materie
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>autore</label>
                <input style={inputStyle} value={form.autore} onChange={e => setForm({ ...form, autore: e.target.value })} required />
              </div>

              <div>
                <label style={labelStyle}>file (pdf, doc, docx, zip)</label>
                <input type="file" accept=".pdf,.doc,.docx,.zip" onChange={handleUploadFile} style={{ ...inputStyle, padding: '6px 12px' }} />
                {uploading && <div style={{ fontSize: '11px', color: 'rgba(167,139,250,0.7)', marginTop: '4px', fontFamily: 'monospace' }}>upload in corso...</div>}
                {form.file_url && <div style={{ fontSize: '11px', color: 'rgba(45,212,191,0.7)', marginTop: '4px', fontFamily: 'monospace' }}>✓ file caricato</div>}
              </div>

              <div>
                <label style={labelStyle}>link esterno (youtube, vimeo, sito...)</label>
                <input style={inputStyle} placeholder="https://" value={form.link_esterno} onChange={e => setForm({ ...form, link_esterno: e.target.value })} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.gratuita} onChange={e => setForm({ ...form, gratuita: e.target.checked })} />
                  Gratuita
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.pubblicata} onChange={e => setForm({ ...form, pubblicata: e.target.checked })} />
                  Pubblica subito
                </label>
              </div>

              {!form.gratuita && (
                <div>
                  <label style={labelStyle}>prezzo (€)</label>
                  <input style={inputStyle} type="number" min="0" step="0.01" value={form.prezzo} onChange={e => setForm({ ...form, prezzo: parseFloat(e.target.value) })} />
                </div>
              )}

              <button type="submit" style={{ padding: '10px', background: '#a78bfa', color: '#0d0f14', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginTop: '0.5rem' }}>
                Aggiungi risorsa
              </button>

            </form>
          </div>

          {/* LISTA RISORSE */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(167,139,250,0.6)', marginBottom: '1.25rem' }}>// risorse ({risorse.length})</div>

            {loading ? (
              <div style={{ color: 'rgba(226,232,240,0.4)', fontSize: '13px' }}>Caricamento...</div>
            ) : risorse.length === 0 ? (
              <div style={{ color: 'rgba(226,232,240,0.4)', fontSize: '13px' }}>Nessuna risorsa ancora.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {risorse.map(r => (
                  <div key={r.id} style={{ background: '#111318', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#e2e8f0' }}>{r.titolo}</span>
                        <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: 'rgba(167,139,250,0.08)', color: 'rgba(167,139,250,0.7)' }}>{r.tipo}</span>
                        {r.gratuita
                          ? <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: 'rgba(45,212,191,0.08)', color: 'rgba(45,212,191,0.7)' }}>gratuita</span>
                          : <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: 'rgba(251,191,36,0.08)', color: 'rgba(251,191,36,0.7)' }}>€{r.prezzo}</span>
                        }
                        {r.file_url && <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: 'rgba(96,165,250,0.08)', color: 'rgba(96,165,250,0.7)' }}>📄 file</span>}
                        {r.link_esterno && <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '2px 8px', borderRadius: '4px', background: 'rgba(96,165,250,0.08)', color: 'rgba(96,165,250,0.7)' }}>🔗 link</span>}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(226,232,240,0.4)' }}>{r.materia} · {r.autore}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                      <button onClick={() => togglePubblicata(r.id, r.pubblicata)} style={{ fontSize: '11px', fontFamily: 'monospace', padding: '4px 10px', borderRadius: '4px', border: '0.5px solid', cursor: 'pointer', background: 'transparent', borderColor: r.pubblicata ? 'rgba(45,212,191,0.3)' : 'rgba(255,255,255,0.1)', color: r.pubblicata ? '#2dd4bf' : 'rgba(226,232,240,0.4)' }}>
                        {r.pubblicata ? 'pubblicata' : 'bozza'}
                      </button>
                      <button onClick={() => eliminaRisorsa(r.id)} style={{ fontSize: '11px', fontFamily: 'monospace', padding: '4px 10px', borderRadius: '4px', border: '0.5px solid rgba(244,114,182,0.3)', cursor: 'pointer', background: 'transparent', color: '#f472b6' }}>
                        elimina
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEZIONE MATERIE */}
      {sezione === 'materie' && (
        <div style={{ maxWidth: '500px' }}>
          <div style={{ background: '#111318', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(167,139,250,0.6)', marginBottom: '1.25rem' }}>// aggiungi materia</div>
            <form onSubmit={handleAggiungiMateria} style={{ display: 'flex', gap: '8px' }}>
              <input style={{ ...inputStyle, flex: 1 }} placeholder="es. Informatica" value={nuovaMateria} onChange={e => setNuovaMateria(e.target.value)} required />
              <button type="submit" style={{ padding: '8px 16px', background: '#a78bfa', color: '#0d0f14', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Aggiungi
              </button>
            </form>
          </div>

          <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(167,139,250,0.6)', marginBottom: '1rem' }}>// materie ({materie.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {materie.map(m => (
              <div key={m.id} style={{ background: '#111318', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{m.nome}</span>
                <button onClick={() => handleEliminaMateria(m.id)} style={{ fontSize: '11px', fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px', border: '0.5px solid rgba(244,114,182,0.3)', cursor: 'pointer', background: 'transparent', color: '#f472b6' }}>
                  elimina
                </button>
              </div>
            ))}
            {materie.length === 0 && <div style={{ fontSize: '13px', color: 'rgba(226,232,240,0.4)' }}>Nessuna materia ancora.</div>}
          </div>
        </div>
      )}
    </div>
  )
}