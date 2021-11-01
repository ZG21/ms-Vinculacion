import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoVinculacion, TipoVinculacionRelations, ProponenteTrabajo} from '../models';
import {ProponenteTrabajoRepository} from './proponente-trabajo.repository';

export class TipoVinculacionRepository extends DefaultCrudRepository<
  TipoVinculacion,
  typeof TipoVinculacion.prototype.id,
  TipoVinculacionRelations
> {

  public readonly proponenteTrabajo: BelongsToAccessor<ProponenteTrabajo, typeof TipoVinculacion.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteTrabajoRepository') protected proponenteTrabajoRepositoryGetter: Getter<ProponenteTrabajoRepository>,
  ) {
    super(TipoVinculacion, dataSource);
    this.proponenteTrabajo = this.createBelongsToAccessorFor('proponenteTrabajo', proponenteTrabajoRepositoryGetter,);
    this.registerInclusionResolver('proponenteTrabajo', this.proponenteTrabajo.inclusionResolver);
  }
}
