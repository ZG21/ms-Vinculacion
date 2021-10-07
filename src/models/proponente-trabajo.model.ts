import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {DepartamentoProponente} from './departamento-proponente.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model()
export class ProponenteTrabajo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
    type: 'string',
    required: true,
  })
  id_vinculacion: string;

  @property({
    type: "string",
    required: false,
  })
  foto: string;

  @hasMany(() => Departamento, {through: {model: () => DepartamentoProponente, keyFrom: 'id_proponente', keyTo: 'id_departamento'}})
  departamentos: Departamento[];

  @hasOne(() => TipoVinculacion, {keyTo: 'id_proponente'})
  tipoVinculacion: TipoVinculacion;

  constructor(data?: Partial<ProponenteTrabajo>) {
    super(data);
  }
}

export interface ProponenteTrabajoRelations {
  // describe navigational properties here
}

export type ProponenteTrabajoWithRelations = ProponenteTrabajo & ProponenteTrabajoRelations;
