import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Clientes, ClientesRelations, Ordenes} from '../models';
import {OrdenesRepository} from './ordenes.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.id_cliente,
  ClientesRelations
> {

  public readonly ordenes: HasManyRepositoryFactory<Ordenes, typeof Clientes.prototype.id_cliente>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrdenesRepository') protected ordenesRepositoryGetter: Getter<OrdenesRepository>,
  ) {
    super(Clientes, dataSource);
    this.ordenes = this.createHasManyRepositoryFactoryFor('ordenes', ordenesRepositoryGetter,);
    this.registerInclusionResolver('ordenes', this.ordenes.inclusionResolver);
  }
}
