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
import {TipoVinculacion} from '../models';
import {TipoVinculacionRepository} from '../repositories';

export class TipoVinculacionController {
  constructor(
    @repository(TipoVinculacionRepository)
    public tipoVinculacionRepository : TipoVinculacionRepository,
  ) {}

  @post('/tipoVinculacion')
  @response(200, {
    description: 'TipoVinculacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoVinculacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {
            title: 'NewTipoVinculacion',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoVinculacion: Omit<TipoVinculacion, 'id'>,
  ): Promise<TipoVinculacion> {
    return this.tipoVinculacionRepository.create(tipoVinculacion);
  }

  @get('/tipoVinculacion/count')
  @response(200, {
    description: 'TipoVinculacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoVinculacion) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.tipoVinculacionRepository.count(where);
  }

  @get('/tipoVinculacion')
  @response(200, {
    description: 'Array of TipoVinculacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoVinculacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoVinculacion) filter?: Filter<TipoVinculacion>,
  ): Promise<TipoVinculacion[]> {
    return this.tipoVinculacionRepository.find(filter);
  }

  @patch('/tipoVinculacion')
  @response(200, {
    description: 'TipoVinculacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {partial: true}),
        },
      },
    })
    tipoVinculacion: TipoVinculacion,
    @param.where(TipoVinculacion) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.tipoVinculacionRepository.updateAll(tipoVinculacion, where);
  }

  @get('/tipoVinculacion/{id}')
  @response(200, {
    description: 'TipoVinculacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoVinculacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoVinculacion, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoVinculacion>
  ): Promise<TipoVinculacion> {
    return this.tipoVinculacionRepository.findById(id, filter);
  }

  @patch('/tipoVinculacion/{id}')
  @response(204, {
    description: 'TipoVinculacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {partial: true}),
        },
      },
    })
    tipoVinculacion: TipoVinculacion,
  ): Promise<void> {
    await this.tipoVinculacionRepository.updateById(id, tipoVinculacion);
  }

  @put('/tipoVinculacion/{id}')
  @response(204, {
    description: 'TipoVinculacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoVinculacion: TipoVinculacion,
  ): Promise<void> {
    await this.tipoVinculacionRepository.replaceById(id, tipoVinculacion);
  }

  @del('/tipoVinculacion/{id}')
  @response(204, {
    description: 'TipoVinculacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoVinculacionRepository.deleteById(id);
  }
}
