import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
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

        const specifications_id = ['5154'];

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        });
    });

    it('should no be able to add a new specification to a now-existent car', () => {
        expect( async () => {
            const car_id = '1234';
            const specifications_id = ['54321'];
    
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });
});