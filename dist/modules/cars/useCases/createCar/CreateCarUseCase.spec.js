"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category'
    });
    expect(car).toHaveProperty('id');
  });
  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category'
    });
    await expect(createCarUseCase.execute({
      name: 'Car2',
      description: 'Description Car',
      daily_rate: 150,
      license_plate: 'ABC-123',
      fine_amount: 70,
      brand: 'Brand 2',
      category_id: 'category_2'
    })).rejects.toEqual(new _AppError.AppError('Car already exists'));
  });
  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABCD-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category'
    });
    expect(car.available).toBe(true);
  });
});