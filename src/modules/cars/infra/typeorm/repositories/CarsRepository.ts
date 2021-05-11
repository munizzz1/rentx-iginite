import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRespository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { IFindCarsDTO } from "@modules/cars/dtos/IFindCarsDTO";
class CarsRepository implements ICarsRespository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, 
            description, 
            daily_rate, 
            license_plate, 
            fine_amount, 
            brand, category_id,
            specifications,
            id
        });

        await this.repository.save(car);

        return car;
    }
    async finByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }

    async findAvailable({ category_id, brand, name }: IFindCarsDTO): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });
        
        if(brand) {
            carsQuery.andWhere('c.brand = :brand', { brand });
        }

        if(name) {
            carsQuery.andWhere('c.name = :name', { name });
        }

        if(category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
}

export { CarsRepository };