"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationsInMemory = require("@modules/cars/repositories/in-memory/SpecificationsInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
let createCarSpecificationUseCase;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsInMemory.SpecificationsInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.00,
      license_plate: 'TESTE-1',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: 'cartegory_id'
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test'
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
  it('should no be able to add a new specification to a now-existent car', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];
    expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError('Car does not exist'));
  });
});