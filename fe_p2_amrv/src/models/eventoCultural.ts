import type { Recinto } from './recinto'

export type EstadoEvento = 'Programado' | 'Agotado' | 'Cancelado'

export const ESTADOS_EVENTO: EstadoEvento[] = ['Programado', 'Agotado', 'Cancelado']

export interface EventoCultural {
  id: number
  idRecinto: number
  titulo: string
  artistaPrincipal: string
  duracionMinutos: number
  precioEntrada: number
  fechaEvento: string
  estado: EstadoEvento
  recinto: Recinto
}
