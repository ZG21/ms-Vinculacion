import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ProponenteTrabajo} from './proponente-trabajo.model';

@model()
export class TipoVinculacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  id_proponente?: number;

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
