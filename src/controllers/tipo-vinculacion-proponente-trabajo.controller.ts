import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  ProponenteTrabajo, TipoVinculacion
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
    @param.path.number('id') id: typeof TipoVinculacion.prototype.id,
  ): Promise<ProponenteTrabajo> {
    return this.tipoVinculacionRepository.proponenteTrabajo(id);
  }
}
