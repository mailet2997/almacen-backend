import {Entity, model, property, hasMany} from '@loopback/repository';
import {Productos} from './productos.model';

@model()
export class Ordenes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_orden?: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  clientesId?: string;

  @hasMany(() => Productos)
  productos: Productos[];

  constructor(data?: Partial<Ordenes>) {
    super(data);
  }
}

export interface OrdenesRelations {
  // describe navigational properties here
}

export type OrdenesWithRelations = Ordenes & OrdenesRelations;
