import {Entity, model, property} from '@loopback/repository';

@model()
export class DepartamentoProponente extends Entity {
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
  id_proponente: string;

  @property({
    type: 'string',
    required: true,
  })
  id_departamento: string;

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
