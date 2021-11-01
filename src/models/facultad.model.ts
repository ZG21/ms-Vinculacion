import {Entity, hasMany, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';

@model()
export class Facultad extends Entity {
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
    type: 'string',
    required: true,
  })
  codigoFacultad: string;

  @hasMany(() => Departamento)
  departamentos: Departamento[];

  constructor(data?: Partial<Facultad>) {
    super(data);
  }
}

export interface FacultadRelations {
  // describe navigational properties here
}

export type FacultadWithRelations = Facultad & FacultadRelations;
