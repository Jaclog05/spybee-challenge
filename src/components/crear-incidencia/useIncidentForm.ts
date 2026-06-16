import { useState } from 'react'
import { useIncidentStore } from '@/store/useIncidentStore'
import { INITIAL_FORM, ETIQUETAS, ASIGNADOS } from './IncidentForm.constants'

export function useIncidentForm() {
  const addIncident = useIncidentStore(state => state.addIncident)
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
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
      assignees: form.assignees,
    })

    setForm(INITIAL_FORM)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleTagsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, o =>
      ETIQUETAS.find(t => t.id === o.value)!
    ).filter(Boolean)
    setForm(f => ({ ...f, tags: selected }))
  }

  function handleAssigneesChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = Array.from(e.target.selectedOptions, o =>
      ASIGNADOS.find(u => u.id === o.value)!
    ).filter(Boolean)
    setForm(f => ({ ...f, assignees: selected }))
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setForm(f => ({ ...f, media: [...f.media, ...files] }))
  }

  function removeFile(index: number) {
    setForm(f => ({ ...f, media: f.media.filter((_, i) => i !== index) }))
  }

  function setCoordinates(lat: number, lng: number) {
    setForm(f => ({ ...f, lat: String(lat), lng: String(lng) }))
  }

  return {
    form,
    setForm,
    submitted,
    handleChange,
    handleSubmit,
    handleTagsChange,
    handleAssigneesChange,
    handleFiles,
    removeFile,
    setCoordinates,
  }
}