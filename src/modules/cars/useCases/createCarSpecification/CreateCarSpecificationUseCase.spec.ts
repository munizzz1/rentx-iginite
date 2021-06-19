import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsInMemory } from "@modules/cars/repositories/in-memory/SpecificationsInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
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

        expect(
            createCarSpecificationUseCase.execute({ car_id, specifications_id })
        ).rejects.toEqual(new AppError('Car does not exist'));
    });
});