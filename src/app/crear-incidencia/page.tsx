"use client"

import { useState } from 'react'
import { useIncidentStore } from '@/store/useIncidentStore'
import type { IncidentPriority, IncidentType, Tag, User } from '@/types/incident'

const CATEGORIAS: IncidentType[] = [
  { id: '1', key: 'plumbing', name: 'Hidrosanitario', name_en: 'Plumbing' },
  { id: '2', key: 'electrical', name: 'Eléctrico', name_en: 'Electrical' },
  { id: '3', key: 'structural', name: 'Estructural', name_en: 'Structural' },
  { id: '4', key: 'safety', name: 'Prevención de riesgos', name_en: 'Safety' },
  { id: '5', key: 'materials', name: 'Materiales', name_en: 'Materials' },
  { id: '6', key: 'architecture', name: 'Arquitectónico', name_en: 'Architecture' },
  { id: '7', key: 'infrastructure', name: 'Infraestructura', name_en: 'Infrastructure' },
  { id: '8', key: 'general', name: 'Observación General', name_en: 'General' },
]

const ETIQUETAS: Tag[] = [
  { id: 't1', name: 'Reproceso', color: '#EF4444' },
  { id: 't2', name: 'Urgente', color: '#F97316' },
  { id: 't3', name: 'Revisión', color: '#3B82F6' },
]

const ASIGNADOS: User[] = [
  { id: 'u1', name: 'Mateo Soto', email: 'mateo.soto@constructora.com', avatarUrl: '' },
  { id: 'u2', name: 'Felipe Herrera', email: 'felipe.herrera@constructora.com', avatarUrl: '' },
  { id: 'u3', name: 'Sebastián Castro', email: 'sebastian.castro@constructora.com', avatarUrl: '' },
]

const INITIAL_FORM = {
  title: '',
  description: '',
  priority: 'medium' as IncidentPriority,
  locationDescription: '',
  dueDate: '',
  lat: '',
  lng: '',
  type: CATEGORIAS[0],
  tags: [] as Tag[],
  assignees: [] as User[],
  media: [] as File[],
}

export default function CrearIncidencia() {
  const addIncident = useIncidentStore(state => state.addIncident)
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.description) return

    addIncident({
      title: form.title,
      description: form.description,
      priority: form.priority,
      locationDescription: form.locationDescription,
      dueDate: form.dueDate || null,
      coordinates: {
        lat: parseFloat(form.lat) || 0,
        lng: parseFloat(form.lng) || 0,
      },
      type: form.type,
      tags: form.tags,
      assignees: form.assignees
    })

    setForm(INITIAL_FORM)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  function handleTagsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, o => ETIQUETAS.find(t => t.id === o.value)!).filter(Boolean)
    setForm(f => ({ ...f, tags: selected }))
  }

  function handleAssigneesChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, o => ASIGNADOS.find(u => u.id === o.value)!).filter(Boolean)
    setForm(f => ({ ...f, assignees: selected }))
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setForm(f => ({ ...f, media: [...f.media, ...files] }))
  }

  function removeFile(index: number) {
    setForm(f => ({ ...f, media: f.media.filter((_, i) => i !== index) }))
  }

  return (
    <main>
      <h1>Crear Incidencia</h1>

      {submitted && <p role="alert">✓ Incidencia creada correctamente</p>}

      <form onSubmit={handleSubmit}>
        {/* Título */}
        <div>
          <label htmlFor="title">Título *</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={4}
            required
          />
        </div>

        {/* Fecha de vencimiento */}
        <div>
          <label htmlFor="dueDate">Fecha de vencimiento</label>
          <input
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="type">Categoría *</label>
          <select
            id="type"
            value={form.type.id}
            onChange={e => {
              const selected = CATEGORIAS.find(c => c.id === e.target.value)!
              setForm(f => ({ ...f, type: selected }))
            }}
          >
            {CATEGORIAS.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Prioridad */}
        <div>
          <label htmlFor="priority">Prioridad *</label>
          <select
            id="priority"
            value={form.priority}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value as IncidentPriority }))}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="critical">Crítica</option>
          </select>
        </div>

        {/* Etiquetas */}
        <div>
          <label htmlFor="tags">Etiquetas (opcional)</label>
          <select
            id="tags"
            multiple
            value={form.tags.map(t => t.id)}
            onChange={handleTagsChange}
          >
            {ETIQUETAS.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>

        {/* Asignados */}
        <div>
          <label htmlFor="assignees">Asignados (opcional)</label>
          <select
            id="assignees"
            multiple
            value={form.assignees.map(u => u.id)}
            onChange={handleAssigneesChange}
          >
            {ASIGNADOS.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {/* Detalles de localización */}
        <div>
          <label htmlFor="locationDescription">Detalles de localización (opcional)</label>
          <input
            id="locationDescription"
            type="text"
            value={form.locationDescription}
            onChange={e => setForm(f => ({ ...f, locationDescription: e.target.value }))}
            placeholder="Ej: Nivel 11 - eje E3"
          />
        </div>

        {/* Coordenadas */}
        <div>
          <div>
            <label htmlFor="lat">Latitud</label>
            <input
              id="lat"
              type="number"
              step="any"
              value={form.lat}
              onChange={e => setForm(f => ({ ...f, lat: e.target.value }))}
              placeholder="Se llenará desde el mapa"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="lng">Longitud</label>
            <input
              id="lng"
              type="number"
              step="any"
              value={form.lng}
              onChange={e => setForm(f => ({ ...f, lng: e.target.value }))}
              placeholder="Se llenará desde el mapa"
              readOnly
            />
          </div>
        </div>

        {/* Archivos adjuntos */}
        <div>
          <label htmlFor="media">Archivos adjuntos</label>
          <input
            id="media"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFiles}
          />
          {form.media.length > 0 && (
            <ul>
              {form.media.map((file, i) => (
                <li key={i}>
                  {file.name}
                  <button type="button" onClick={() => removeFile(i)}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit">Crear Incidencia</button>

      </form>
    </main>
  )
}