import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ordenes} from './ordenes.model';

@model()
export class Clientes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_cliente?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  contra: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @hasMany(() => Ordenes)
  ordenes: Ordenes[];

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
