import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {DepartamentoProponente} from './departamento-proponente.model';
import {Departamento} from './departamento.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model()
export class ProponenteTrabajo extends Entity {
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
  documento: number;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  otroNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  otroApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'number',
    required: true,
  })
  celular: number;

  @property({
    type: 'number',
    required: true,
  })
  id_vinculacion: number;

  @property({
    type: "string",
    required: false,
  })
  foto: string;

  @hasMany(() => Departamento, {through: {model: () => DepartamentoProponente}})
  departamentos: Departamento[];

  @hasOne(() => TipoVinculacion)
  tipoVinculacion: TipoVinculacion;

  constructor(data?: Partial<ProponenteTrabajo>) {
    super(data);
  }
}

export interface ProponenteTrabajoRelations {
  // describe navigational properties here
}

export type ProponenteTrabajoWithRelations = ProponenteTrabajo & ProponenteTrabajoRelations;
