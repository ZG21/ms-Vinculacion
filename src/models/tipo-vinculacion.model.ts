import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ProponenteTrabajo} from './proponente-trabajo.model';

@model()
export class TipoVinculacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  id_proponente?: string;

  @belongsTo(() => ProponenteTrabajo)
  proponenteTrabajoId: string;

  constructor(data?: Partial<TipoVinculacion>) {
    super(data);
  }
}

export interface TipoVinculacionRelations {
  // describe navigational properties here
}

export type TipoVinculacionWithRelations = TipoVinculacion & TipoVinculacionRelations;
