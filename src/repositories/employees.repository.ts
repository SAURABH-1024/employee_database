import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Employee, EmployeesRelations } from '../models';


export class EmployeesRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Employee, dataSource);
  }
}
