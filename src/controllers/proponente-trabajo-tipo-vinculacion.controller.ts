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
  ProponenteTrabajo,
  TipoVinculacion,
} from '../models';
import {ProponenteTrabajoRepository} from '../repositories';

export class ProponenteTrabajoTipoVinculacionController {
  constructor(
    @repository(ProponenteTrabajoRepository) protected proponenteTrabajoRepository: ProponenteTrabajoRepository,
  ) { }

  @get('/proponente-trabajos/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'ProponenteTrabajo has one TipoVinculacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoVinculacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoVinculacion>,
  ): Promise<TipoVinculacion> {
    return this.proponenteTrabajoRepository.tipoVinculacion(id).get(filter);
  }

  @post('/proponente-trabajos/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'ProponenteTrabajo model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoVinculacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProponenteTrabajo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {
            title: 'NewTipoVinculacionInProponenteTrabajo',
            exclude: ['id'],
            optional: ['id_proponente']
          }),
        },
      },
    }) tipoVinculacion: Omit<TipoVinculacion, 'id'>,
  ): Promise<TipoVinculacion> {
    return this.proponenteTrabajoRepository.tipoVinculacion(id).create(tipoVinculacion);
  }

  @patch('/proponente-trabajos/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'ProponenteTrabajo.TipoVinculacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {partial: true}),
        },
      },
    })
    tipoVinculacion: Partial<TipoVinculacion>,
    @param.query.object('where', getWhereSchemaFor(TipoVinculacion)) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.proponenteTrabajoRepository.tipoVinculacion(id).patch(tipoVinculacion, where);
  }

  @del('/proponente-trabajos/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'ProponenteTrabajo.TipoVinculacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoVinculacion)) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.proponenteTrabajoRepository.tipoVinculacion(id).delete(where);
  }
}
