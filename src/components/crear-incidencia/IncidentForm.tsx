"use client"
import { useEffect } from 'react'
import { useIncidentForm } from './useIncidentForm'
import { CATEGORIAS, ETIQUETAS, ASIGNADOS } from './IncidentForm.constants'

type Props = {
  onReady?: (setCoordinates: (lat: number, lng: number) => void) => void
}

export default function IncidentForm({ onReady }: Props) {
  const {
    form, setForm, submitted, handleChange, handleSubmit,
    handleTagsChange, handleAssigneesChange,
    handleFiles, removeFile, setCoordinates
  } = useIncidentForm()

  useEffect(() => {
    onReady?.(setCoordinates)
  }, [onReady, setCoordinates])

  return (
    <>
      {submitted && <p role="alert">✓ Incidencia creada correctamente</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título *</label>
          <input id="title" name="title" type="text" value={form.title}
            onChange={handleChange} required
          />
        </div>

        <div>
          <label htmlFor="description">Descripción *</label>
          <textarea id="description" name="description" value={form.description} rows={4}
            onChange={handleChange} required
          />
        </div>

        <div>
          <label htmlFor="dueDate">Fecha de vencimiento</label>
          <input id="dueDate" name="dueDate" type="date" value={form.dueDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="type">Categoría *</label>
          <select id="type" value={form.type.id}
            onChange={e => {
              const selected = CATEGORIAS.find(c => c.id === e.target.value)!
              setForm(f => ({ ...f, type: selected }))
            }}
          >
            {CATEGORIAS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="priority">Prioridad *</label>
          <select id="priority" name="priority" value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="critical">Crítica</option>
          </select>
        </div>

        <div>
          <label htmlFor="tags">Etiquetas </label>
          <select id="tags" multiple value={form.tags.map(t => t.id)}
            onChange={handleTagsChange}
          >
            {ETIQUETAS.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="assignees">Asignados </label>
          <select id="assignees" multiple value={form.assignees.map(u => u.id)}
            onChange={handleAssigneesChange}
          >
            {ASIGNADOS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="locationDescription">Detalles de localización</label>
          <input id="locationDescription" type="text" value={form.locationDescription}
            onChange={handleChange}
            placeholder="Ej: Nivel 11 - eje E3"
          />
        </div>

        <div>
          <div>
            <label htmlFor="lat">Latitud</label>
            <input id="lat" type="number" name="lat" step="any" value={form.lat}
              onChange={e => setForm(f => ({ ...f, lat: e.target.value }))} readOnly
            />
          </div>
          <div>
            <label htmlFor="lng">Longitud</label>
            <input id="lng" type="number" name="lng" step="any" value={form.lng}
              onChange={e => setForm(f => ({ ...f, lng: e.target.value }))} readOnly
            />
          </div>
        </div>

        <div>
          <label htmlFor="media">Archivos adjuntos</label>
          <input id="media" type="file" multiple accept="image/*,video/*"
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
    </>
  )
}