import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Clientes} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository : ClientesRepository,
  ) {}

  @post('/cliente')
  @response(200, {
    description: 'Clientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientes',
            exclude: ['id_cliente'],
          }),
        },
      },
    })
    clientes: Omit<Clientes, 'id_cliente'>,
  ): Promise<Clientes> {
    return this.clientesRepository.create(clientes);
  }

  @get('/cliente/count')
  @response(200, {
    description: 'Clientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.count(where);
  }

  @get('/cliente')
  @response(200, {
    description: 'Array of Clientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clientes) filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.clientesRepository.find(filter);
  }

  @patch('/cliente')
  @response(200, {
    description: 'Clientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.updateAll(clientes, where);
  }

  @get('/cliente/{id}')
  @response(200, {
    description: 'Clientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Clientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Clientes>
  ): Promise<Clientes> {
    return this.clientesRepository.findById(id, filter);
  }

  @patch('/cliente/{id}')
  @response(204, {
    description: 'Clientes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.updateById(id, clientes);
  }

  @put('/cliente/{id}')
  @response(204, {
    description: 'Clientes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.replaceById(id, clientes);
  }

  @del('/cliente/{id}')
  @response(204, {
    description: 'Clientes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientesRepository.deleteById(id);
  }
}
