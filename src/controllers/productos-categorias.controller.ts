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
  Productos,
  Categorias,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosCategoriasController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Array of Productos has many Categorias',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categorias)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Categorias>,
  ): Promise<Categorias[]> {
    return this.productosRepository.categorias(id).find(filter);
  }

  @post('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categorias)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Productos.prototype.id_producto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {
            title: 'NewCategoriasInProductos',
            exclude: ['id_cate'],
            optional: ['productosId']
          }),
        },
      },
    }) categorias: Omit<Categorias, 'id_cate'>,
  ): Promise<Categorias> {
    return this.productosRepository.categorias(id).create(categorias);
  }

  @patch('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Productos.Categorias PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {partial: true}),
        },
      },
    })
    categorias: Partial<Categorias>,
    @param.query.object('where', getWhereSchemaFor(Categorias)) where?: Where<Categorias>,
  ): Promise<Count> {
    return this.productosRepository.categorias(id).patch(categorias, where);
  }

  @del('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Productos.Categorias DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Categorias)) where?: Where<Categorias>,
  ): Promise<Count> {
    return this.productosRepository.categorias(id).delete(where);
  }
}
