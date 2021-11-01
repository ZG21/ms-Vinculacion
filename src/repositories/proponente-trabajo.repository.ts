import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoProponente, ProponenteTrabajo, ProponenteTrabajoRelations, TipoVinculacion} from '../models';
import {DepartamentoProponenteRepository} from './departamento-proponente.repository';
import {DepartamentoRepository} from './departamento.repository';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';

export class ProponenteTrabajoRepository extends DefaultCrudRepository<
  ProponenteTrabajo,
  typeof ProponenteTrabajo.prototype.id,
  ProponenteTrabajoRelations
> {

  public readonly departamentos: HasManyThroughRepositoryFactory<Departamento, typeof Departamento.prototype.id,
          DepartamentoProponente,
          typeof ProponenteTrabajo.prototype.id
        >;

  public readonly tipoVinculacion: HasOneRepositoryFactory<TipoVinculacion, typeof ProponenteTrabajo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoProponenteRepository') protected departamentoProponenteRepositoryGetter: Getter<DepartamentoProponenteRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>,
  ) {
    super(ProponenteTrabajo, dataSource);
    this.tipoVinculacion = this.createHasOneRepositoryFactoryFor('tipoVinculacion', tipoVinculacionRepositoryGetter);
    this.registerInclusionResolver('tipoVinculacion', this.tipoVinculacion.inclusionResolver);
    this.departamentos = this.createHasManyThroughRepositoryFactoryFor('departamentos', departamentoRepositoryGetter, departamentoProponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
  }
}
