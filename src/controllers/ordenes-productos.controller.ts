import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ordenes,
  Productos,
} from '../models';
import {OrdenesRepository} from '../repositories';

export class OrdenesProductosController {
  constructor(
    @repository(OrdenesRepository) protected ordenesRepository: OrdenesRepository,
  ) { }

  @get('/ordenes/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Ordenes has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.ordenesRepository.productos(id).find(filter);
  }

  @post('/ordenes/{id}/productos', {
    responses: {
      '200': {
        description: 'Ordenes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ordenes.prototype.id_orden,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInOrdenes',
            exclude: ['id_producto'],
            optional: ['ordenesId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id_producto'>,
  ): Promise<Productos> {
    return this.ordenesRepository.productos(id).create(productos);
  }

  @patch('/ordenes/{id}/productos', {
    responses: {
      '200': {
        description: 'Ordenes.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.ordenesRepository.productos(id).patch(productos, where);
  }

  @del('/ordenes/{id}/productos', {
    responses: {
      '200': {
        description: 'Ordenes.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.ordenesRepository.productos(id).delete(where);
  }
}
