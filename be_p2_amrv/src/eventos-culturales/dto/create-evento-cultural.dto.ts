import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
// cambiamos el import y agregamos lo nuevo que tenemos en entity.ts//
import { EstadoEvento, ModalidadIngreso } from '../entities/evento-cultural.entity';

export class CreateEventoCulturalDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del recinto es obligatorio' })
  @IsInt({ message: 'El id del recinto debe ser tipo numérico' })
  readonly idRecinto: number;

  @ApiProperty({ example: 'Noche de Charangos' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser de tipo cadena' })
  @MaxLength(150, { message: 'El título no puede tener más de 150 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly titulo: string;

  @ApiProperty({ example: 'Los Kjarkas' })
  @IsNotEmpty({ message: 'El artista principal es obligatorio' })
  @IsString({ message: 'El artista principal debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El artista principal no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly artistaPrincipal: string;

  @ApiProperty({ example: 120 })
  @IsDefined({ message: 'La duración es obligatoria' })
  @IsInt({ message: 'La duración debe ser un número entero (minutos)' })
  @Min(1, { message: 'La duración debe ser mayor a 0' })
  readonly duracionMinutos: number;

  @ApiProperty({ example: 80.5 })
  @IsDefined({ message: 'El precio de entrada es obligatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser numérico con hasta 2 decimales' },
  )
  @Min(0, { message: 'El precio no puede ser negativo' })
  readonly precioEntrada: number;

  @ApiProperty({ example: '2026-12-15' })
  @IsDefined({ message: 'La fecha del evento es obligatoria' })
  @IsDateString({}, { message: 'La fecha del evento debe tener formato YYYY-MM-DD' })
  readonly fechaEvento: Date;

  @ApiProperty({ enum: EstadoEvento, example: EstadoEvento.PROGRAMADO })
  @IsDefined({ message: 'El estado es obligatorio' })
  @IsEnum(EstadoEvento, { message: 'El estado debe ser: Programado, Agotado o Cancelado' })
  readonly estado: EstadoEvento;

  // agregamos una nueva validaccion de entrada //
  @ApiProperty({ enum: ModalidadIngreso, example: ModalidadIngreso.ENTRADA_PAGADA })
  @IsDefined({ message: 'La modalidad de ingreso es obligatoria' })
  @IsEnum(ModalidadIngreso, { message: 'La modalidad debe ser: Entrada pagada, Entrada gratuita o Pase invitación',
  })
  readonly modalidadIngreso: ModalidadIngreso;
}
