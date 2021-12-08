"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let rentalsRepositoryInMemory;
let carsRepository;
let createRentalUseCase;
let dayjsDateProvider;
describe('Create Rental', () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepository);
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'Test',
      description: "Car test",
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '12345',
      brand: 'brand'
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '2222',
      expected_return_date: dayAdd24Hours,
      user_id: '12345'
    });
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '52456',
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental is progress for user"));
  });
  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: dayAdd24Hours,
      user_id: '12345'
    });
    await expect(createRentalUseCase.execute({
      user_id: '1234589',
      car_id: 'test',
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '64546',
      car_id: '415263',
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError('Invalid return time'));
  });
});