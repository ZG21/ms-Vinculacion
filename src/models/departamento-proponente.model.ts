import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_proponente_id_departamento: {
        name: 'fk_proponente_id_departamento',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'departamentoId',
      },
      fk_departamento_id_proponete: {
        name: 'fk_departamento_id_proponete',
        entity: 'ProponenteTrabajo',
        entityKey: 'id',
        foreignKey: 'proponenteTrabajoId',
      }
    },
  },
})
export class DepartamentoProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  proponenteTrabajoId?: number;

  @property({
    type: 'number',
  })
  departamentoId?: number;

  constructor(data?: Partial<DepartamentoProponente>) {
    super(data);
  }
}

export interface DepartamentoProponenteRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteWithRelations = DepartamentoProponente & DepartamentoProponenteRelations;
