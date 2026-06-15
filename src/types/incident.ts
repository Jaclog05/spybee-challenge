export type IncidentPriority = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'on_pause' | 'closed';

// --- Sub-tipos ---

export interface IncidentType {
  id: string;
  key: string;
  name: string;
  name_en: string;
}

export interface Project {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Media {
  id: string;
  name: string;
  type: 'image' | 'video';
  format: string;
  size: number;
  status: 'uploaded' | 'pending' | 'failed';
  url: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// --- Tipo principal ---

export interface Incident {
  id: string;
  sequenceId: string;
  order: number;
  title: string;
  description: string;
  type: IncidentType;
  priority: IncidentPriority;
  status: IncidentStatus;
  approval: boolean;
  project: Project;
  owner: User;
  whatsappOwner: string | null;
  assignees: User[];
  observers: User[];
  coordinates: Coordinates;
  locationDescription: string;
  dueDate: string | null;
  closingDate: string | null;
  media: Media[];
  tags: Tag[];
  deleted: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateIncidentPayload = Pick<
  Incident,
  | 'title'
  | 'description'
  | 'priority'
  | 'locationDescription'
  | 'dueDate'
  | 'tags'
  | 'assignees'
> & {
  type: IncidentType;
  coordinates: Coordinates;
};