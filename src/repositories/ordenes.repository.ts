import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ordenes, OrdenesRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class OrdenesRepository extends DefaultCrudRepository<
  Ordenes,
  typeof Ordenes.prototype.id_orden,
  OrdenesRelations
> {

  public readonly productos: HasManyRepositoryFactory<Productos, typeof Ordenes.prototype.id_orden>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Ordenes, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
