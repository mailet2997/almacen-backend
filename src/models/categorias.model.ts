import {Entity, model, property} from '@loopback/repository';

@model()
export class Categorias extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  productos: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_cate?: string;

  @property({
    type: 'string',
    required: true,
  })
  bueno: string;

  @property({
    type: 'string',
    required: true,
  })
  bonito: string;

  @property({
    type: 'string',
    required: true,
  })
  barato: string;

  @property({
    type: 'string',
  })
  productosId?: string;

  constructor(data?: Partial<Categorias>) {
    super(data);
  }
}

export interface CategoriasRelations {
  // describe navigational properties here
}

export type CategoriasWithRelations = Categorias & CategoriasRelations;
