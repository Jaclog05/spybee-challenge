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
    set((state) => {
      const newIncident: Incident = {
        ...payload,
        id: crypto.randomUUID(),
        sequenceId: String(state.incidents.length + 1).padStart(4, '0'),
        order: 0,
        status: 'open',
        approval: false,
        project: { id: '1', name: 'Projecto Exemplo' },
        owner: { id: '1', name: 'João Silva', email: 'joao.silva@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
        whatsappOwner: null,
        observers: [],
        media: [],
        deleted: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        closingDate: null,
      }
      return {incidents: [...state.incidents, newIncident] }
    })
  },

  selectIncident: (incident) => set({ selectedIncident: incident }),
}))