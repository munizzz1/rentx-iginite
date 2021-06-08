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
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '123456',
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is another open to the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '123456',
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '65423',
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)

    });

    it('should not be able to create a new rental if there is another open to the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '64546',
                car_id: '123456',
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '123456',
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)

    });

    it('should not be able to create a new rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '64546',
                car_id: '123456',
                expected_return_date: dayjs().toDate()
            });
    
        }).rejects.toBeInstanceOf(AppError)

    });
});