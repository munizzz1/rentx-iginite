import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepository);
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

        await expect(
            createRentalUseCase.execute({
                user_id: '12345',
                car_id: '52456',
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("There's a rental is progress for user"))
    });

    it('should not be able to create a new rental if there is another open to the same car', async () => {
        await rentalsRepositoryInMemory.create({
            car_id: 'test',
            expected_return_date: dayAdd24Hours,
            user_id: '12345'
        });

        await expect(
            createRentalUseCase.execute({
                user_id: '1234589',
                car_id: 'test',
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError('Car is unavailable'))
    });

    it('should not be able to create a new rental with invalid return time', async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: '64546',
                car_id: '415263',
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError('Invalid return time'))
    });
});