import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Employee} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeeController {
  constructor(
    @repository(EmployeesRepository)
    public employeesRepository : EmployeesRepository,
  ) {}

  @post('/employees')
  @response(200, {
    description: 'Employees model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployees',
            exclude: ['id'],
          }),
        },
      },
    })
    employees: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.employeesRepository.create(employees);
  }

  @get('/employees/count')
  @response(200, {
    description: 'Employees model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeesRepository.count(where);
  }

  @get('/employees')
  @response(200, {
    description: 'Array of Employees model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeesRepository.find(filter);
  }

  @patch('/employees')
  @response(200, {
    description: 'Employees PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employees: Employee,
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeesRepository.updateAll(employees, where);
  }

  @get('/employees/{id}')
  @response(200, {
    description: 'Employees model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Employee, { exclude: 'where' }) filter?: FilterExcludingWhere<Employee>
  ): Promise<Employee> {
    return this.employeesRepository.findById(id, filter);
  }

  @patch('/employees/{id}')
  @response(204, {
    description: 'Employees PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employees: Employee,
  ): Promise<void> {
    await this.employeesRepository.updateById(id, employees);
  }

  @put('/employees/{id}')
  @response(204, {
    description: 'Employees PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() employees: Employee,
  ): Promise<void> {
    await this.employeesRepository.replaceById(id, employees);
  }

  @del('/employees/{id}')
  @response(204, {
    description: 'Employees DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.employeesRepository.deleteById(id);
  }
}
