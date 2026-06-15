import { create } from 'zustand'
import type { Incident, CreateIncidentPayload } from '@/types/incident'
import mockData from '@/data/incidents.mock.json'

interface IncidentStore {
  incidents: Incident[]
  selectedIncident: Incident | null
  addIncident: (payload: CreateIncidentPayload) => void
  selectIncident: (incident: Incident | null) => void
}

export const useIncidentStore = create<IncidentStore>()((set) => ({
  incidents: mockData as Incident[],
  selectedIncident: null,

  addIncident: (payload) => {
    const newIncident: Incident = {
      ...payload,
      id: crypto.randomUUID(),
      sequenceId: String(Date.now()),
      order: 0,
      status: 'open',
      approval: false,
      project: { id: '1', name: 'Projecto Exemplo' },
      owner: { id: '1', name: 'João Silva', email: 'joao.silva@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
      assignees: [],
      whatsappOwner: null,
      observers: [],
      media: [],
      tags: [],
      deleted: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      closingDate: null,
    }
    set((state) => ({ incidents: [newIncident, ...state.incidents] }))
  },

  selectIncident: (incident) => set({ selectedIncident: incident }),
}))