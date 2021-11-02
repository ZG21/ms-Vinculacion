import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {DepartamentoProponente} from './departamento-proponente.model';
import {Departamento} from './departamento.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model({
  settings: {
    foreignKeys: {
      fk_proponente_id_vinculacion: {
        name: 'fk_proponente_id_vinculacion',
        entity: 'TipoVinculacion',
        entityKey: 'id',
        foreignKey: 'tipoVinculacionId',
      }
    },
  },
})
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
    required: false,
  })
  celular: number;

  @property({
    type: "string",
    required: false,
  })
  foto: string;



  @hasMany(() => Departamento, {through: {model: () => DepartamentoProponente}})
  departamentos: Departamento[];

  @belongsTo(() => TipoVinculacion)
  tipoVinculacionId: number;

  constructor(data?: Partial<ProponenteTrabajo>) {
    super(data);
  }
}

export interface ProponenteTrabajoRelations {
  // describe navigational properties here
}

export type ProponenteTrabajoWithRelations = ProponenteTrabajo & ProponenteTrabajoRelations;
