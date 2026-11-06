import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recinto } from '../../recintos/entities/recinto.entity';

export enum EstadoEvento {
  PROGRAMADO = 'Programado',
  AGOTADO = 'Agotado',
  CANCELADO = 'Cancelado',
}
//Campo para agregar los nombres, si queremos cambiar aqui el com saldran en el frontend//
export enum ModalidadIngreso {
  ENTRADA_PAGADA = 'Entrada Pagada',
  ENTRADA_GRATUITA = 'Entrada gratuita',
  PASE_INVITACION = 'Pase invitación',
}

@Entity('eventos_culturales')
@Check('chk_eventos_culturales_estado', `estado IN ('Programado', 'Agotado', 'Cancelado')`)
export class EventoCultural {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_recinto' })
  idRecinto: number;

  @Column('varchar', { length: 150 })
  titulo: string;

  @Column('varchar', { name: 'artista_principal', length: 100 })
  artistaPrincipal: string;

  @Column('integer', { name: 'duracion_minutos' })
  duracionMinutos: number;

  @Column('decimal', {
    name: 'precio_entrada',
    precision: 10,
    scale: 2,
    transformer: {
      to: (v: number) => v,
      from: (v: string | null) => (v === null ? null : Number(v)),
    },
  })
  precioEntrada: number;

  @Column('date', { name: 'fecha_evento' })
  fechaEvento: Date;

  @Column('varchar', { length: 20, default: EstadoEvento.PROGRAMADO })
  estado: EstadoEvento;

// modalidad de ingreso por default, nuevo campo en nuestra base de datos //
  @Column('varchar', { name: 'modalidad_ingreso', length: 20, default: ModalidadIngreso.ENTRADA_PAGADA }) 
  modalidadIngreso: ModalidadIngreso;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Recinto, recinto => recinto.eventosCulturales)
  @JoinColumn({ name: 'id_recinto', referencedColumnName: 'id' })
  recinto: Recinto;
}
