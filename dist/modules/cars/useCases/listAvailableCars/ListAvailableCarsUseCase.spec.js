"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let carsRepositoryInMemory;
let listAvailableCarsUseCase;
describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.00,
      license_plate: 'TESTE-1',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: 'cartegory_id'
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by name', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.00,
      license_plate: 'TESTE-1',
      fine_amount: 40,
      brand: 'Car_brand-1',
      category_id: 'cartegory_id-1'
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car1'
    });
    expect(cars).toEqual([car1]);
  });
  it('should be able to list all available cars by brand', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.00,
      license_plate: 'TESTE-1',
      fine_amount: 40,
      brand: 'Car_brand-1',
      category_id: 'cartegory_id-1'
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand-1'
    });
    expect(cars).toEqual([car1]);
  });
  it('should be able to list all available cars by category id', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.00,
      license_plate: 'TESTE-1',
      fine_amount: 40,
      brand: 'Car_brand-1',
      category_id: 'cartegory_id-1'
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'cartegory_id-1'
    });
    expect(cars).toEqual([car1]);
  });
});