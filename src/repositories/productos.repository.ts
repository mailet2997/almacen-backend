import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Productos, ProductosRelations, Categorias} from '../models';
import {CategoriasRepository} from './categorias.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id_producto,
  ProductosRelations
> {

  public readonly categorias: HasManyRepositoryFactory<Categorias, typeof Productos.prototype.id_producto>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CategoriasRepository') protected categoriasRepositoryGetter: Getter<CategoriasRepository>,
  ) {
    super(Productos, dataSource);
    this.categorias = this.createHasManyRepositoryFactoryFor('categorias', categoriasRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
  }
}
