"use client"

import { useIncidentForm } from './useIncidentForm'
import { CATEGORIAS, ETIQUETAS, ASIGNADOS } from './IncidentForm.constants'
import styles from './IncidentForm.module.scss'

type Props = {
  initialCoordinates?: { lat: number, lng: number }
  onSubmitSuccess?: () => void
}

export default function IncidentForm({ initialCoordinates, onSubmitSuccess }: Props) {
  const {
    form, setForm, submitted, handleChange, handleSubmit,
    handleTagsChange, handleAssigneesChange,
    handleFiles, removeFile
  } = useIncidentForm(onSubmitSuccess, initialCoordinates)

  return (
    <>
    {submitted && <p className={styles.successMsg}>✓ Incidencia creada correctamente</p>}

    <form onSubmit={handleSubmit}>
      <div className={styles.body}>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">
            <span className={styles.required}>*</span> Título
          </label>
          <input className={styles.input} id="title" name="title"
            type="text" value={form.title} onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            <span className={styles.required}>*</span> Descripción
          </label>
          <textarea className={styles.textarea} id="description" name="description"
            value={form.description} rows={4} onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="dueDate">Fecha de vencimiento</label>
          <input className={styles.input} id="dueDate" name="dueDate"
            type="date" value={form.dueDate} onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">
            <span className={styles.required}>*</span> Categoría
          </label>
          <select className={styles.select} id="type" value={form.type.id}
            onChange={e => setForm(f => ({ ...f, type: CATEGORIAS.find(c => c.id === e.target.value)! }))}>
            {CATEGORIAS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="priority">
            <span className={styles.required}>*</span> Prioridad
          </label>
          <select className={styles.select} id="priority" name="priority"
            value={form.priority} onChange={handleChange}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="critical">Crítica</option>
          </select>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="tags">Etiquetas</label>
            <select className={styles.select} id="tags" multiple
              value={form.tags.map(t => t.id)} onChange={handleTagsChange}>
              {ETIQUETAS.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="assignees">Asignados</label>
            <select className={styles.select} id="assignees" multiple
              value={form.assignees.map(u => u.id)} onChange={handleAssigneesChange}>
              {ASIGNADOS.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="locationDescription">Detalles de localización</label>
          <input className={styles.input} id="locationDescription" name="locationDescription"
            type="text" value={form.locationDescription} onChange={handleChange}
            placeholder="Ej: Nivel 11 - eje E3" />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="lat">Latitud</label>
            <input className={styles.input} id="lat" name="lat" type="number"
              step="any" value={form.lat} readOnly />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="lng">Longitud</label>
            <input className={styles.input} id="lng" name="lng" type="number"
              step="any" value={form.lng} readOnly />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="media">Archivos adjuntos</label>
          <input className={styles.input} id="media" type="file"
            multiple accept="image/*,video/*" onChange={handleFiles} />
          {form.media.length > 0 && (
            <ul className={styles.fileList}>
              {form.media.map((file, i) => (
                <li key={i} className={styles.fileItem}>
                  {file.name}
                  <button type="button" className={styles.removeFileBtn}
                    onClick={() => removeFile(i)}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      <div className={styles.footer}>
        <button type="submit" className={styles.submitBtn}>Crear Incidencia</button>
      </div>
    </form>
  </>
  )
}