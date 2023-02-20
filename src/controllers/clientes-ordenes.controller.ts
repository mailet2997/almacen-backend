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
  Clientes,
  Ordenes,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesOrdenesController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Array of Clientes has many Ordenes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ordenes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ordenes>,
  ): Promise<Ordenes[]> {
    return this.clientesRepository.ordenes(id).find(filter);
  }

  @post('/clientes/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ordenes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clientes.prototype.id_cliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {
            title: 'NewOrdenesInClientes',
            exclude: ['id_orden'],
            optional: ['clientesId']
          }),
        },
      },
    }) ordenes: Omit<Ordenes, 'id_orden'>,
  ): Promise<Ordenes> {
    return this.clientesRepository.ordenes(id).create(ordenes);
  }

  @patch('/clientes/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Clientes.Ordenes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {partial: true}),
        },
      },
    })
    ordenes: Partial<Ordenes>,
    @param.query.object('where', getWhereSchemaFor(Ordenes)) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.clientesRepository.ordenes(id).patch(ordenes, where);
  }

  @del('/clientes/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Clientes.Ordenes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ordenes)) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.clientesRepository.ordenes(id).delete(where);
  }
}
