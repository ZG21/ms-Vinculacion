import {Entity, model, property} from '@loopback/repository';

@model()
export class FotoProponente extends Entity {
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
    required: true,
  })
  id_producto: string;


  constructor(data?: Partial<FotoProponente>) {
    super(data);
  }
}

export interface FotoProponenteRelations {
  // describe navigational properties here
}

export type FotoProponenteWithRelations = FotoProponente & FotoProponenteRelations;
