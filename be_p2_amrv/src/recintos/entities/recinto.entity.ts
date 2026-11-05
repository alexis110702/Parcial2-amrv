import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventoCultural } from '../../eventos-culturales/entities/evento-cultural.entity';

@Entity('recintos')
export class Recinto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('varchar', { length: 50 })
  ciudad: string;

  @Column('integer', { name: 'aforo_maximo', nullable: true })
  aforoMaximo: number | null;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => EventoCultural, eventoCultural => eventoCultural.recinto)
  eventosCulturales: EventoCultural[];
}
