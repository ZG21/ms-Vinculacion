import {Entity, model, property, hasMany} from '@loopback/repository';
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

  @hasMany(() => ProponenteTrabajo)
  proponenteTrabajos: ProponenteTrabajo[];

  constructor(data?: Partial<TipoVinculacion>) {
    super(data);
  }
}

export interface TipoVinculacionRelations {
  // describe navigational properties here
}

export type TipoVinculacionWithRelations = TipoVinculacion & TipoVinculacionRelations;
