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
import {Ordenes} from '../models';
import {OrdenesRepository} from '../repositories';

export class OrdenesController {
  constructor(
    @repository(OrdenesRepository)
    public ordenesRepository : OrdenesRepository,
  ) {}

  @post('/orden')
  @response(200, {
    description: 'Ordenes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ordenes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {
            title: 'NewOrdenes',
            exclude: ['id_orden'],
          }),
        },
      },
    })
    ordenes: Omit<Ordenes, 'id_orden'>,
  ): Promise<Ordenes> {
    return this.ordenesRepository.create(ordenes);
  }

  @get('/orden/count')
  @response(200, {
    description: 'Ordenes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ordenes) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.ordenesRepository.count(where);
  }

  @get('/orden')
  @response(200, {
    description: 'Array of Ordenes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ordenes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ordenes) filter?: Filter<Ordenes>,
  ): Promise<Ordenes[]> {
    return this.ordenesRepository.find(filter);
  }

  @patch('/orden')
  @response(200, {
    description: 'Ordenes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {partial: true}),
        },
      },
    })
    ordenes: Ordenes,
    @param.where(Ordenes) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.ordenesRepository.updateAll(ordenes, where);
  }

  @get('/orden/{id}')
  @response(200, {
    description: 'Ordenes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ordenes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ordenes, {exclude: 'where'}) filter?: FilterExcludingWhere<Ordenes>
  ): Promise<Ordenes> {
    return this.ordenesRepository.findById(id, filter);
  }

  @patch('/orden/{id}')
  @response(204, {
    description: 'Ordenes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {partial: true}),
        },
      },
    })
    ordenes: Ordenes,
  ): Promise<void> {
    await this.ordenesRepository.updateById(id, ordenes);
  }

  @put('/orden/{id}')
  @response(204, {
    description: 'Ordenes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ordenes: Ordenes,
  ): Promise<void> {
    await this.ordenesRepository.replaceById(id, ordenes);
  }

  @del('/orden/{id}')
  @response(204, {
    description: 'Ordenes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordenesRepository.deleteById(id);
  }
}
