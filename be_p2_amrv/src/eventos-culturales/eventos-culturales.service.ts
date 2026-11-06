import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recinto } from '../recintos/entities/recinto.entity';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';
import { EventoCultural } from './entities/evento-cultural.entity';

@Injectable()
export class EventosCulturalesService {
  constructor(
    @InjectRepository(EventoCultural)
    private eventosRepository: Repository<EventoCultural>,
    @InjectRepository(Recinto)
    private recintosRepository: Repository<Recinto>,
  ) {}

  private async validarRecinto(idRecinto: number): Promise<void> {
    const existe = await this.recintosRepository.existsBy({ id: idRecinto });
    if (!existe) throw new NotFoundException(`El recinto con id ${idRecinto} no existe`);
  }

  async create(createEventoCulturalDto: CreateEventoCulturalDto): Promise<EventoCultural> {
    await this.validarRecinto(createEventoCulturalDto.idRecinto);
    let evento = await this.eventosRepository.findOneBy({
      idRecinto: createEventoCulturalDto.idRecinto,
      titulo: createEventoCulturalDto.titulo,
      fechaEvento: createEventoCulturalDto.fechaEvento,
    });
    if (evento) throw new ConflictException('El evento ya existe en ese recinto y fecha');

    evento = new EventoCultural();
    Object.assign(evento, createEventoCulturalDto);
    return this.eventosRepository.save(evento);
  }

  async findAll(): Promise<EventoCultural[]> {
    return this.eventosRepository
      .createQueryBuilder('eventos')
      .innerJoin('eventos.recinto', 'recinto')
      .select([
        'eventos.id',
        'eventos.idRecinto',
        'eventos.titulo',
        'eventos.artistaPrincipal',
        'eventos.duracionMinutos',
        'eventos.precioEntrada',
        'eventos.fechaEvento',
        'eventos.estado',
        'eventos.modalidadIngreso', // se carga el nuevo campo 
        'recinto.id',
        'recinto.nombre',
        'recinto.ciudad',
        'recinto.aforoMaximo',
      ])
      .orderBy('eventos.fechaEvento', 'ASC')
      .addOrderBy('eventos.titulo', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<EventoCultural> {
    const evento = await this.eventosRepository.findOne({
      where: { id },
      relations: { recinto: true },
    });
    if (!evento) throw new NotFoundException(`El evento cultural con id ${id} no existe`);
    return evento;
  }

  async update(
    id: number,
    updateEventoCulturalDto: UpdateEventoCulturalDto,
  ): Promise<EventoCultural> {
    const evento = await this.findOne(id);
    if (updateEventoCulturalDto.idRecinto)
      await this.validarRecinto(updateEventoCulturalDto.idRecinto);
    Object.assign(evento, updateEventoCulturalDto);
    // Si cambia el recinto, se quita la relación cargada para que TypeORM use idRecinto
    if (updateEventoCulturalDto.idRecinto) delete (evento as Partial<EventoCultural>).recinto;
    return this.eventosRepository.save(evento);
  }

  async remove(id: number): Promise<EventoCultural> {
    const evento = await this.findOne(id);
    return this.eventosRepository.softRemove(evento);
  }
}
