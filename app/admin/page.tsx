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
    titolo: '', descrizione: '', tipo: 'progetto', materia: '',
    gratuita: true, prezzo: 0, autore: '', pubblicata: false, file_url: '', link_esterno: '',
  })

  useEffect(() => { fetchRisorse(); fetchMaterie() }, [])

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
    if (error) { alert('Errore upload: ' + error.message) }
    else {
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
    } else { alert('Errore: ' + error.message) }
  }

  async function handleAggiungiMateria(e: React.FormEvent) {
    e.preventDefault()
    if (!nuovaMateria.trim()) return
    const { error } = await supabase.from('materie').insert([{ nome: nuovaMateria.trim() }])
    if (!error) { setNuovaMateria(''); fetchMaterie() }
    else { alert('Errore: ' + error.message) }
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
    width: '100%', padding: '8px 12px',
    background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '8px', color: '#2C2C2C', fontSize: '13px', outline: 'none',
  }

  const labelStyle = {
    fontSize: '12px', color: '#888', marginBottom: '4px', display: 'block'
  }

  const tabStyle = (active: boolean) => ({
    fontSize: '13px', padding: '6px 18px', borderRadius: '20px',
    cursor: 'pointer', border: active ? 'none' : '1px solid rgba(0,0,0,0.1)',
    background: active ? '#2E7D5E' : 'white',
    color: active ? 'white' : '#888', fontWeight: active ? 500 : 400,
  })

  const tipoColori: Record<string, { bg: string; color: string }> = {
    progetto: { bg: '#E8F5EF', color: '#2E7D5E' },
    tutorial:  { bg: '#EFF6FF', color: '#1D4ED8' },
    ebook:     { bg: '#FEF3C7', color: '#D97706' },
  }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#2C2C2C', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '56px', borderBottom: '1px solid rgba(0,0,0,0.1)', background: '#ffffff', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700 }}>
          <div style={{ width: '8px', height: '8px', background: '#2E7D5E', borderRadius: '50% 0 50% 0', transform: 'rotate(45deg)' }} />
          <a href="/" style={{ color: '#2E7D5E', textDecoration: 'none' }}>classboard</a>
          <span style={{ color: '#888', fontWeight: 400 }}> / admin</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={tabStyle(sezione === 'risorse')} onClick={() => setSezione('risorse')}>risorse</button>
          <button style={tabStyle(sezione === 'materie')} onClick={() => setSezione('materie')}>materie</button>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>

        {/* SEZIONE RISORSE */}
        {sezione === 'risorse' && (
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2rem', alignItems: 'start' }}>

            {/* FORM */}
            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ fontSize: '12px', color: '#2E7D5E', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>nuova risorsa</div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Titolo</label>
                  <input style={inputStyle} value={form.titolo} onChange={e => setForm({ ...form, titolo: e.target.value })} required />
                </div>
                <div>
                  <label style={labelStyle}>Descrizione</label>
                  <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.descrizione} onChange={e => setForm({ ...form, descrizione: e.target.value })} required />
                </div>
                <div>
                  <label style={labelStyle}>Tipo</label>
                  <select style={inputStyle} value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                    <option value="progetto">Progetto</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="ebook">Ebook</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Materia</label>
                  <select style={inputStyle} value={form.materia} onChange={e => setForm({ ...form, materia: e.target.value })} required>
                    <option value="">— seleziona materia —</option>
                    {materie.map(m => <option key={m.id} value={m.nome}>{m.nome}</option>)}
                  </select>
                  {materie.length === 0 && (
                    <div style={{ fontSize: '11px', color: '#D97706', marginTop: '4px' }}>⚠ nessuna materia — aggiungile dalla tab materie</div>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Autore</label>
                  <input style={inputStyle} value={form.autore} onChange={e => setForm({ ...form, autore: e.target.value })} required />
                </div>
                <div>
                  <label style={labelStyle}>File (pdf, doc, docx, zip)</label>
                  <input type="file" accept=".pdf,.doc,.docx,.zip" onChange={handleUploadFile} style={{ ...inputStyle, padding: '6px 12px' }} />
                  {uploading && <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Upload in corso...</div>}
                  {form.file_url && <div style={{ fontSize: '11px', color: '#2E7D5E', marginTop: '4px' }}>✓ File caricato</div>}
                </div>
                <div>
                  <label style={labelStyle}>Link esterno (YouTube, Vimeo, sito...)</label>
                  <input style={inputStyle} placeholder="https://" value={form.link_esterno} onChange={e => setForm({ ...form, link_esterno: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: '#2C2C2C' }}>
                    <input type="checkbox" checked={form.gratuita} onChange={e => setForm({ ...form, gratuita: e.target.checked })} />
                    Gratuita
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', color: '#2C2C2C' }}>
                    <input type="checkbox" checked={form.pubblicata} onChange={e => setForm({ ...form, pubblicata: e.target.checked })} />
                    Pubblica subito
                  </label>
                </div>
                {!form.gratuita && (
                  <div>
                    <label style={labelStyle}>Prezzo (€)</label>
                    <input style={inputStyle} type="number" min="0" step="0.01" value={form.prezzo} onChange={e => setForm({ ...form, prezzo: parseFloat(e.target.value) })} />
                  </div>
                )}
                <button type="submit" style={{ padding: '10px', background: '#2E7D5E', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginTop: '0.5rem' }}>
                  Aggiungi risorsa
                </button>
              </form>
            </div>

            {/* LISTA RISORSE */}
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '1.25rem' }}>Risorse totali: {risorse.length}</div>
              {loading ? (
                <div style={{ color: '#888', fontSize: '13px' }}>Caricamento...</div>
              ) : risorse.length === 0 ? (
                <div style={{ color: '#888', fontSize: '13px' }}>Nessuna risorsa ancora.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {risorse.map(r => {
                    const colori = tipoColori[r.tipo] || { bg: '#E8F5EF', color: '#2E7D5E' }
                    return (
                      <div key={r.id} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700, color: '#2C2C2C' }}>{r.titolo}</span>
                            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: colori.bg, color: colori.color, fontWeight: 500 }}>{r.tipo}</span>
                            {r.gratuita
                              ? <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#E8F5EF', color: '#2E7D5E', fontWeight: 500 }}>gratuita</span>
                              : <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#FEF3C7', color: '#D97706', fontWeight: 500 }}>€{r.prezzo}</span>
                            }
                            {r.file_url && <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#EFF6FF', color: '#1D4ED8' }}>📄 file</span>}
                            {r.link_esterno && <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#EFF6FF', color: '#1D4ED8' }}>🔗 link</span>}
                          </div>
                          <div style={{ fontSize: '12px', color: '#888' }}>{r.materia} · {r.autore}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                          <button onClick={() => togglePubblicata(r.id, r.pubblicata)} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '20px', border: '1px solid', cursor: 'pointer', background: 'transparent', borderColor: r.pubblicata ? '#2E7D5E' : 'rgba(0,0,0,0.1)', color: r.pubblicata ? '#2E7D5E' : '#888', fontWeight: r.pubblicata ? 500 : 400 }}>
                            {r.pubblicata ? '✓ pubblicata' : 'bozza'}
                          </button>
                          <button onClick={() => eliminaRisorsa(r.id)} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(220,38,38,0.3)', cursor: 'pointer', background: 'transparent', color: '#DC2626' }}>
                            elimina
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEZIONE MATERIE */}
        {sezione === 'materie' && (
          <div style={{ maxWidth: '500px' }}>
            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '12px', color: '#2E7D5E', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>aggiungi materia</div>
              <form onSubmit={handleAggiungiMateria} style={{ display: 'flex', gap: '8px' }}>
                <input style={{ ...inputStyle, flex: 1 }} placeholder="es. Informatica" value={nuovaMateria} onChange={e => setNuovaMateria(e.target.value)} required />
                <button type="submit" style={{ padding: '8px 16px', background: '#2E7D5E', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Aggiungi
                </button>
              </form>
            </div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '1rem' }}>Materie ({materie.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {materie.map(m => (
                <div key={m.id} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#2C2C2C' }}>{m.nome}</span>
                  <button onClick={() => handleEliminaMateria(m.id)} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(220,38,38,0.3)', cursor: 'pointer', background: 'transparent', color: '#DC2626' }}>
                    elimina
                  </button>
                </div>
              ))}
              {materie.length === 0 && <div style={{ fontSize: '13px', color: '#888' }}>Nessuna materia ancora.</div>}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', marginTop: '2rem' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: '#2E7D5E' }}>classboard</span>
        <span style={{ fontSize: '12px', color: '#888' }}>© 2025 — fatto da docenti, per docenti</span>
      </footer>

    </div>
  )
}