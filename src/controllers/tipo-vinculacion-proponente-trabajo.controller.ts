import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoVinculacion,
  ProponenteTrabajo,
} from '../models';
import {TipoVinculacionRepository} from '../repositories';

export class TipoVinculacionProponenteTrabajoController {
  constructor(
    @repository(TipoVinculacionRepository)
    public tipoVinculacionRepository: TipoVinculacionRepository,
  ) { }

  @get('/tipo-vinculacions/{id}/proponente-trabajo', {
    responses: {
      '200': {
        description: 'ProponenteTrabajo belonging to TipoVinculacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProponenteTrabajo)},
          },
        },
      },
    },
  })
  async getProponenteTrabajo(
    @param.path.string('id') id: typeof TipoVinculacion.prototype.id,
  ): Promise<ProponenteTrabajo> {
    return this.tipoVinculacionRepository.proponenteTrabajo(id);
  }
}
