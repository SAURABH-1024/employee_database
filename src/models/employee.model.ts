import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: true }, })
export class Location extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    description: "Name of the office location"
  })
  city: string;

  @property({
    type: 'string',
    required: true,
    description: "Name of the office location"
  })
  address: string;
}

@model({ settings: { strict: true } })
export class Employee extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  workEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  designation: string;

  @property({
    required: true,
  })
  workLocation: Location

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}




export interface EmployeesRelations {
  // describe navigational properties here
}

export type EmployeesWithRelations = Employee & EmployeesRelations;
