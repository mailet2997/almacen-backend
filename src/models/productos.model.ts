import {Entity, model, property, hasMany} from '@loopback/repository';
import {Categorias} from './categorias.model';

@model()
export class Productos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_producto?: string;

  @property({
    type: 'string',
    required: true,
  })
  precio: string;

  @hasMany(() => Categorias)
  categorias: Categorias[];

  @property({
    type: 'string',
  })
  ordenesId?: string;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
