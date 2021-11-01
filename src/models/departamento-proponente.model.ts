import {Entity, model, property} from '@loopback/repository';

@model()
export class DepartamentoProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_proponente: number;

  @property({
    type: 'number',
    required: true,
  })
  id_departamento: number;

  @property({
    type: 'string',
  })
  proponenteTrabajoId?: string;

  @property({
    type: 'string',
  })
  departamentoId?: string;

  constructor(data?: Partial<DepartamentoProponente>) {
    super(data);
  }
}

export interface DepartamentoProponenteRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteWithRelations = DepartamentoProponente & DepartamentoProponenteRelations;
