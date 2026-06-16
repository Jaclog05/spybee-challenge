import type { IncidentPriority, IncidentType, Tag, User } from '@/types/incident'

export const CATEGORIAS: IncidentType[] = [
  { id: '1', key: 'plumbing', name: 'Hidrosanitario', name_en: 'Plumbing' },
  { id: '2', key: 'electrical', name: 'Eléctrico', name_en: 'Electrical' },
  { id: '3', key: 'structural', name: 'Estructural', name_en: 'Structural' },
  { id: '4', key: 'safety', name: 'Prevención de riesgos', name_en: 'Safety' },
  { id: '5', key: 'materials', name: 'Materiales', name_en: 'Materials' },
  { id: '6', key: 'architecture', name: 'Arquitectónico', name_en: 'Architecture' },
  { id: '7', key: 'infrastructure', name: 'Infraestructura', name_en: 'Infrastructure' },
  { id: '8', key: 'general', name: 'Observación General', name_en: 'General' },
]

export const ETIQUETAS: Tag[] = [
  { id: 't1', name: 'Reproceso', color: '#EF4444' },
  { id: 't2', name: 'Urgente', color: '#F97316' },
  { id: 't3', name: 'Revisión', color: '#3B82F6' },
]

export const ASIGNADOS: User[] = [
  { id: 'u1', name: 'Mateo Soto', email: 'mateo.soto@constructora.com', avatarUrl: '' },
  { id: 'u2', name: 'Felipe Herrera', email: 'felipe.herrera@constructora.com', avatarUrl: '' },
  { id: 'u3', name: 'Sebastián Castro', email: 'sebastian.castro@constructora.com', avatarUrl: '' },
]

export const INITIAL_FORM = {
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